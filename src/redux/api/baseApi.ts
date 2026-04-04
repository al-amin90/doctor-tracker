import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    // Safely get the token from Redux state
    const state = getState();
    let token = state?.auth?.token;

    if (typeof window === "undefined") {
      return headers;
    }

    if (!token) {
      const raw = localStorage.getItem("persist:auth");
      if (raw) {
        const parsed = JSON.parse(raw);
        token = parsed.token ? JSON.parse(parsed.token) : null;
      }
    }

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    // toast.error("Your Token is Expired");
    // removeToken("access_token");
    // api.dispatch(logout());

    localStorage.removeItem("token");
    localStorage.removeItem("persist:auth");

    window.location.href = "/login";
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["auth"],
  endpoints: () => ({}),
});
