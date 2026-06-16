import { setsearchInhome } from '@/redux/jobSlice';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function HeroSec() {
  const [input, setinput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(setsearchInhome(input));
    navigate('/browse');
  }

  return (
    <div>
      <section className="mt-6 sm:mt-10 flex items-center justify-center px-4 pt-0">
        <div className="text-center w-full max-w-5xl">

          {/* Badge */}
          <span className="inline-block px-4 py-2 rounded-full bg-gray-100 text-red-500 font-medium text-sm sm:text-base">
            No.1 Job Hunting Platform
          </span>

          {/* Heading */}
          <h2 className="mt-4 sm:mt-6 text-2xl sm:text-3xl md:text-5xl font-bold">
            Search, Apply &
          </h2>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold mt-2">
            Get Your <span className='text-purple-700'>Dream Job</span>
          </h1>

          <p className="mt-4 sm:mt-6 text-gray-600 text-base sm:text-lg px-2">
            Find thousands of job opportunities and apply with ease.
          </p>

          {/* Search Box */}
          <div className="mt-6 sm:mt-8 flex items-center bg-white shadow-lg rounded-full overflow-hidden max-w-2xl mx-auto">
            <input
              onChange={(e) => setinput(e.target.value)}
              type="text"
              placeholder="Find your dream jobs..."
              className="flex-1 px-4 sm:px-6 py-3 sm:py-4 outline-none text-sm sm:text-base min-w-0"
            />
            <button
              className="bg-purple-600 text-white px-5 sm:px-8 py-3 sm:py-4 hover:bg-purple-700 transition text-sm sm:text-base whitespace-nowrap"
              onClick={searchHandler}
            >
              Search
            </button>
          </div>

        </div>
      </section>
    </div>
  )
}