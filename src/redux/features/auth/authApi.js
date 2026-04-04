const { baseApi } = require("@/redux/api/baseApi");

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "auth/register",
        method: "POST",
        body: credentials,
      }),
      providesTags: ["auth"],
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
      providesTags: ["auth"],
    }),

    getMe: builder.query({
      query: () => ({
        url: "auth/me",
        method: "GET",
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginAdminMutation, useRegisterSassAdminMutation } = authApi;
