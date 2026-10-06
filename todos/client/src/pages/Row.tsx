import React from 'react'
import withAuth from '../components/withAuth'

const Row = () => {
  return (
    <div className="h-[calc(100vh-var(--header-height))]  w-full flex items-center justify-center  bg-linear-to-r from-purple-700 to-indigo-600 ">
      <div className="  px-6 py-2 md:px-10 md:py-4 bg-gray-100 shadow-md rounded-xl ">
        <h1 className="font-poppins font-medium text-center text-2xl">
          To-Do List
        </h1>
        <form className="mt-4">
          <div className="relative flex gap-4 border p-1 border-gray-200 rounded-lg shadow-md focus-within:border-pink-400 focus:focus-within:right-2 focus:focus-within:bg-pink-100 ">
            <input
              type="text"
              placeholder="please enter todos"
              className=" px-5 py-2 text-sm text-gray-700 placeholder:text-gray-400 outline-none"
            />
            <button
              type="submit"
              className="rounded-xl bg-linear-to-r tailwindcss(suggestCanonicalClasses) from-pink-500 to-rose-500  border-2 border-pink-600 px-5 py-1 text-sm font-medium text-white transition-all duration-200 hover:bg-[#ff6eae] hover:shadow-md cursor-pointer"
            >
              Add
            </button>
          </div>
        </form>

      
      </div>
    </div>
  );
}

export default withAuth(Row)