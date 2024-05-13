import React from "react";
import Image from "./RevolveImage";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";

const Home = () => {
  const navigate = useNavigate();
  const goto = () => {
    let profileId = localStorage.getItem("profileId");
    profileId = profileId.substring(1, profileId.length - 1);
    console.log(profileId);
    navigate(`/profile/${profileId}`);
};

const logoutUser = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("profileId");
  window.location.reload();
}

  
  const handleSubmit = (param) => {
    console.log(param);

    if (param === "Login") {
      navigate("/sign-in");
    } else {
      navigate("/sign-up");
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-black">
      {/* Section with text */}
      <section className="flex flex-col justify-center items-center py-10 sm:w-1/2">
        <img className="h-12 w-18" src="/assets/logo.png" alt="logo" />
        <h1 className="text-5xl font-bold text-blue-500 text-center animate-glow py-6 px-6 font-mono">
          Welcome to Quiv.io
        </h1>
        <h2 className="text-4xl font-bold text-white text-center font-serif my-4 mx-1">
          Your vibrant virtual hub where connections thrive!
        </h2>
        <h3 className="text-2xl font-bold text-purple-500 text-center mt-6 font-mono">
          Dive into a world where friendships flourish, ideas spark, and
          communities unite.
        </h3>
        <p className="text-white text-center font-semibold mt-6 px-5">
          Quiv.io offers a dynamic social space tailored to your interests,
          where sharing moments, forging bonds, and exploring passions are at
          the heart of our platform. Join us and embark on an exhilarating
          journey of discovery, expression, and camaraderie. Let's make every
          interaction count, together on Quiv.io!
        </p>
        {
          localStorage.getItem("authToken") && (
            <div className="flex gap-10 mt-10">
              <CgProfile  className="text-white mt-4 text-3xl cursor-pointer" onClick={() => {
              goto();
            }}/>
            
            <IoIosLogOut className="text-white mt-4 text-3xl cursor-pointer" onClick={() => {
              logoutUser();
            }}/>
            </div>
          )
        }
        {!localStorage.getItem("authToken") && (
          <div className="flex gap-5">
            <button
              class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
              onClick={() => {
                handleSubmit("Register");
              }}
            >
              Register
            </button>
            <button
              class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
              onClick={() => {
                handleSubmit("Login");
              }}
            >
              Login
            </button>
          </div>
        )}
      </section>

      {/* Image container */}
      <div className="flex-1 sm:h-screen sm:overflow-y-auto">
        <Image />
      </div>
    </div>
  );
};

export default Home;
