import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Provider } from "react-redux";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import { useLoginMutation } from "../../redux/api/userAPI";
import store from "../../redux/store";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://localhost:3000/api/v1/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
        }),
      });
      console.log(response);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const accessUser = (tokenResponse) => {
    const accessToken = tokenResponse.access_token;
    fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        loginHandler({ data, type: "googlePopup" });
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  const loginHandler = async ({ data, type }) => {
    let name = "";
    let email = "";
    if (type === "googlePopup") {
      name = data?.name;
      email = data.email;
      console.log(data);
    } else {
      // user clicked submit from the form
    }

    const [login] = useLoginMutation();
    
    try {
      const res = await login({
        name,
        email,
        username: name + "ADKO",
        password: "newitem"
      });
      if ("data" in res) {
        toast.success(res.data.message);
      } else {
        const error = res.error;
        const message = error.data;
        toast.error(message.message);
      }
      console.log(user);
    } catch (error) {
      toast.error("Sign In Failed");
    }
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => accessUser(tokenResponse),
  });

    return (
      <div>
        <div className="sm:w-420 flex justify-center items-center flex-col">
          <img src="/assets/images/logo.svg" alt="logo" />
  
          <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12 text-white">
            Create a new account
          </h2>
          <p className="text-light-3 small-medium md:base-regular mt-2 mb-5 text-white">
            To use snapgram, Please enter your details
          </p>
  
          <div class="max-w-sm mx-auto">
            <div class="mb-5">
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-white dark:text-white"
              >
                Name
              </label>
              <input
                type="name"
                id="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Shubh"
                required
                onChange={handleName}
              />
            </div>
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
                for="email"
                class="block mb-2 text-sm font-medium text-white dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@flowbite.com"
                required
                onChange={handleEmail}
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
              class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
              onClick={handleSubmit}
            >
              {isLoading ? (
                <div className="flex-center gap-2">
                  <Loader /> Loading..
                </div>
              ) : (
                "Sign up"
              )}
            </button>
  
            <div className="mt-5">
              <p className="text-white font-serif">Or Signed In With Google</p>
              <button
                onClick={() => {
                  login();
                }}
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
              >
                <FcGoogle className="mr-2" />
                <span>Sign in with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
};

const FirebaseWrapper = () => (
  <Provider store={store}>
    <SignupForm />
  </Provider>
);

export default FirebaseWrapper;
