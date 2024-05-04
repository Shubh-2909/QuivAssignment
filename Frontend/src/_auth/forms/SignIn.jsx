import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Provider } from "react-redux";
import toast from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { useLoginMutation } from "../../redux/api/userAPI";
import store from "../../redux/store";

const SigninForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signin] = useLoginMutation();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async () => {
    const data = {
      email,
      password,
    };
    console.log(data);
    setEmail("");
    setPassword("");
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
    let email = "";
    let password = "";
    if (type === "googlePopup") {
      email = data.email;
      password = data.email;
    } else {
      email = data.email;
      password = data.password;
      console.log(data);
    }

    try {
      const res = await signin({
        email,
        password,
      });

      if (res.data.success) {
        toast.success("Login successful!");
        localStorage.setItem("authToken", JSON.stringify(res.data.token));
      }
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

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12 text-white">Login</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2 mb-5 text-white">
          To use Quiv.io, Please enter your details
        </p>

        <div class="max-w-sm mx-auto">
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
            {/* {isLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading..
              </div>
            ) : (
              "Sign up"
            )} */}
            Sign in
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
    <SigninForm />
  </Provider>
);

export default FirebaseWrapper;
