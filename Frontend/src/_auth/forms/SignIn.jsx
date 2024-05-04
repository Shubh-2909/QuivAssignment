import { useEffect, useState } from "react";
import { FcGoogle } from 'react-icons/fc';


const SigninForm = () => {
  let obj = {
    username: "",
    password: "",
  };
  const [isLoading, setIsLoading] = useState(false);
  const [username, setusername] = useState("");
  const [password, setpasssword] = useState("");

  const handleUsername = (event) => {
    setusername(event.target.value);
  };
  const handlePassword = (event) => {
    setpasssword(event.target.value);
  };
  const handleSubmit = async () => {
    try {
      obj = {
        email: email,
        password: password,
      };
      setusername("");
      setpasssword("");
      console.log(obj);
      const response = await fetch("https://localhost:3000/api/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      console.log(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold text-white md:h2-bold pt-5 sm:pt-12">
          Login
        </h2>
        <p className="text-light-3 text-white small-medium md:base-regular mt-2 mb-5">
          To use snapgram, Please enter your details
        </p>

        <div class="max-w-sm mx-auto">
          <div class="mb-5">
            <label
              for="username"
              class="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Username
            </label>
            <input
              type="text"
              id="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Shubh@123"
              required
              onChange={handleUsername}
            />
          </div>
          <div class="mb-5">
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              onChange={handlePassword}
            />
          </div>
          <button
            type="submit"
            class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5 "
            onClick={handleSubmit}
          >

            
            {isLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading..
              </div>
            ) : (
              "Sign in"
            )}
          </button>

          <div className="mt-5">
          <p className="text-white mt-5 font-serif">Or Signed In With Google</p>
          <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md mt-2">
            <FcGoogle className="mr-2" />
            <span>Sign in with Google</span>
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;