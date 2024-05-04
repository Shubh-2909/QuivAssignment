import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:3000/user/`,
  }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: "register",
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: "login",
        method: "POST",
        body: user,
      }),
    }),
    userDetails: builder.query({
      query: (id) => id,
    }),
    updateUser: builder.mutation({
      query: ({ formData, userId }) => ({
        url: `${userId}`,
        method: "PUT",
        body: formData,
      }),
    }),
  }),
});

export const { useRegisterMutation , useLoginMutation ,useUserDetailsQuery , useUpdateUserMutation } = userAPI;
