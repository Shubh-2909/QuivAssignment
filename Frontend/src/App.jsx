import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import Signinform from "./_auth/forms/SignIn";
import Signupform from "./_auth/forms/SignUp";

import { GoogleOAuthProvider } from "@react-oauth/google";

import Home from "./Home";
import Firebase from "./_auth/forms/Firebase";
import ProfileCard from "./Profile";
import UpdateProfilee from "./UpdateProfile";

const clientId =
  "1059746987667-qotnoa5namol8i1ba4641rdrd9ge6qgl.apps.googleusercontent.com";

const App = () => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/profile/:profileId" element={<ProfileCard />}></Route>
            <Route path="/profile/update/:profileId" element={<UpdateProfilee />}></Route>

            <Route element={<AuthLayout />}>
              <Route path="/sign-in" element={<Signinform />} />
              <Route path="/sign-up" element={<Signupform />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
