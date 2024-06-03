from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# กำหนด URI ของ MongoDB Atlas

app.config["MONGO_URI1"] = (
    "mongodb+srv://Peeranut:as4554sa@apithaid.yesnu5a.mongodb.net/mydb"
)
app.config["MONGO_URI2"] = (
    "mongodb+srv://Peeranut:as4554sa@apithaid.yesnu5a.mongodb.net/API_Thaid"
)
mongo = PyMongo(app, uri=app.config["MONGO_URI1"]).db
api_thaid = PyMongo(app, uri=app.config["MONGO_URI2"]).db


# _API_Thaid
# register_api คือการที่เรากรอกข้อมูลแล้วส่งไป Validate กับ database ของ Thaid
@app.route("/api/validate/thaid", methods=["POST"])
def api_register():

    CitizenID = request.json.get("CitizenID")
    FirstName = request.json.get("FirstName")
    LastName = request.json.get("LastName")
    BEBirthDate = request.json.get("BEBirthDate")
    LaserCode = request.json.get("LaserCode")
    # ตรวจสอบในฐานข้อมูล MongoDB ว่ามีชื่อผู้ใช้งานที่ซ้ำกันหรือไม่
    users = mongo.Users.find_one({"CitizenID": CitizenID})
    validate = api_thaid.Thaid.find_one(
        {
            "CitizenID": CitizenID,
            "FirstName": FirstName,
            "LastName": LastName,
            "BEBirthDate": BEBirthDate,
            "LaserCode": LaserCode,
        }
    )

    if users:
        return (
            jsonify({"message": "CitizenID already exists"}),
            400,
        )
    if not users and validate:
        # หากข้อมูลตรงกับ Validate ให้ทำการเพิ่มข้อมูลเข้าฐานข้อมูล mongo.Users

        mongo.Users.insert_one(
            {
                "CitizenID": CitizenID,
                "FirstName": FirstName,
                "LastName": LastName,
                "BEBirthDate": BEBirthDate,
                "LaserCode": LaserCode,
            }
        ).inserted_id
        return jsonify({"message": "Validate and Insert to Database successful"})
    else:
        return (jsonify({"message": "Invalide information"}), 401)


@app.route("/login", methods=["POST"])
def login():
    CitizenID = request.json.get("CitizenID")

    # ตรวจสอบในฐานข้อมูล MongoDB ว่ามีข้อมูลผู้ใช้งานที่ตรงกับ thainationID และ password หรือไม่
    user = mongo.Users.find_one({"CitizenID": CitizenID})

    if user:
        return jsonify({"message": "Login successful"})
    else:
        return jsonify({"message": "Un Found CitizenID"}), 401


if __name__ == "__main__":
    app.run(debug=True)
