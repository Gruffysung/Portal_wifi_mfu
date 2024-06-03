"use client";
import React from "react";
import axios from "axios";
import { useState } from "react";
import Swal from 'sweetalert2';


function Register() {
  const [CitizenID, setCitizenID] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [BEBirthDate, setBEBirthDate] = useState("");
  const [LaserCode, setLaserCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/validate/thaid",
        {
          CitizenID: parseInt(CitizenID),
          FirstName,
          LastName,
          BEBirthDate: parseInt(BEBirthDate),
          LaserCode,
        }
      );
      console.log(response.data);
      Swal.fire({
        title: 'Success!',
        text: response.data.message,
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: 'Error!',
        text: error.response.data.message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <main className="flex items-center  " id="main">
      <div className="mx-auto">
        <h1 className="text-center text-4xl mb-8">New User</h1>
        <div className="h-auto w-full ">
          <form
            className="bg-white border-solid border shadow-lg rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Thai National ID Card"
              >
                Thai National ID Card
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Thai National ID Card"
                type="number"
                placeholder="Thai National ID Card"
                value={CitizenID}
                onChange={(e) => setCitizenID(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="First Name"
              >
                First Name
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="First Name"
                type="text"
                placeholder="First Name"
                value={FirstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Last Name"
              >
                Last Name
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Last Name"
                type="text"
                placeholder="Last Name"
                value={LastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Birth Date"
              >
                Birth Date
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Birth Date"
                type="number"
                placeholder="Birth Date(รูปแบบเป็น YYYYMMDD ใช้ปี พ.ศ. )"
                value={BEBirthDate}
                onChange={(e) => setBEBirthDate(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Laser Code"
              >
                Laser Code
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Laser Code"
                type="text"
                placeholder="Laser Code"
                value={LaserCode}
                onChange={(e) => setLaserCode(e.target.value)}
              />
            </div>
            <div class="flex items-center justify-between">
              <button
                id="register"
                class=" text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Register;
