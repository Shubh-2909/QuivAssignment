import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;
  
  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
        <div className="flex bg-black">
          <section className="flex flex-1 justify-center items-center py-10">
            <Outlet />
          </section>
          <img src="/assets/authlayoutimg.jpg" alt="" className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"/>
          </div>
        </>
      )}
    </>
  );
};

export default AuthLayout;