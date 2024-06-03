"use client";
import Link from "next/link";
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


function Home() {

  const [CitizenID, setCitizenID] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { CitizenID: parseInt(CitizenID) });
      console.log(response.data);
      Swal.fire({
        title: response.data.title,
        text: response.data.message,
        icon: "success",
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: error.response.data.message,
        text: error.response.data.message,
        icon: error.response.data.icon,
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <main className="flex items-center " id="main">
      <div className="mx-auto">
        <h1 className="text-center text-4xl mb-8">MFU Free WIFI</h1>
        <div className="h-auto w-full ">
          <form className="bg-white border-solid border shadow-lg rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="Thai National ID Card"
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
            <div class="flex items-center justify-between">
              <button
                id="signin"
                class=" text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"

              >
                Sign In
              </button>
              <Link
                href="/Validate_register"
                className="font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                id="signup"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
export default Home;
