import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Provider } from "react-redux";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { useRegisterMutation } from "../../redux/api/userAPI";
import store from "../../redux/store";
import { useNavigate} from "react-router-dom";

const SignupForm = () => {
  const navigate=useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signin] = useRegisterMutation();

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
    const data = {
      name,
      username,
      email,
      password,
    };
    console.log(data);
    setEmail("");
    setName("");
    setPassword("");
    setUsername("");
    await loginHandler({ data, type: "form" });
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
    let password = "";
    let username = "";
    if (type === "googlePopup") {
      name = data?.name;
      email = data.email;
      password = data.email;
      username = data.username;
    } else {
      name = data.name;
      email = data.email;
      password = data.password;
      username = data.username;
      console.log(data);
    }

    try {
      const res = await signin({
        name,
        email,
        username,
        password,
      });
      if ("data" in res) {
        toast.success("Successful");
        navigate("/");
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
        <img className="h-12 w-18" src="/assets/logo.png" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12 text-white">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2 mb-5 text-white">
          To use Quiv.io, Please enter your details
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
              value={name}
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
              value={username}
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
              value={email}
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
              value={password}
              onChange={handlePassword}
            />
          </div>
          <button
            type="submit"
            class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
            onClick={handleSubmit}
          >
            Sign up
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
            <div>
          <h3 className="text-white mt-4">*Please Login after registration for dual verification</h3>
          <h3 className="text-white">*If Registration using GoggleAuth , password will be your email only. You can change it later.</h3>
          </div>
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
