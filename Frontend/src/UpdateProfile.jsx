import React, { useState } from "react";
import { Provider } from "react-redux";
import { useUpdateUserMutation } from "./redux/api/userAPI"; // Import the mutation hook
import toast from "react-hot-toast";
import store from "./redux/store";
import { useParams } from "react-router-dom";
import axios from "axios";

console.log(import.meta.env.VITE_APP_SERVER_BASEURL);

const UpdateProfile = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const { profileId } = useParams();
  const profileId = "6634d4f75534ca360eeae8a3";

  const [updateUser, { isLoading }] = useUpdateUserMutation(); // Destructure the mutation hook

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
    const formData = {
      name,
      username,
      email,
    };
    try {
      console.log(import.meta.env.VITE_APP_SERVER_BASEURL);
      const url = `${
        import.meta.env.VITE_APP_SERVER_BASEURL
      }/user/${profileId}`;
      const response = await axios.put(url, formData);

      console.log(response.data);

      toast.success("Profile updated successfully.");
    } catch (error) {
      // handle error
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
    setEmail("");
    setName("");
    setUsername("");
  };

  return (
    <div className="h-screen w-full bg-black">
      <div className="sm:w-420 flex justify-center items-center flex-col">
        <img className="h-12 w-18 mt-10" src="/assets/logo.png" alt="logo" />

        <h2 className="h3-bold mb-5 md:h2-bold pt-5 sm:pt-12 text-white">
          Update your credentials
        </h2>

        <div className="max-w-sm mx-auto">
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Name
            </label>
            <input
              type="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Shubh"
              required
              onChange={handleName}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Shubh@123"
              required
              onChange={handleUsername}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              required
              onChange={handleEmail}
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
            onClick={handleSubmit}
          >
            {isLoading ? (
              <div className="flex-center gap-2">
                <Loader /> Loading..
              </div>
            ) : (
              "Update"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const UpdateProfilee = () => (
  <Provider store={store}>
    <UpdateProfile />
  </Provider>
);

export default UpdateProfilee;
