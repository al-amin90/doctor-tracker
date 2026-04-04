// import { RootState } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    let token = state?.auth?.accessToken;

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
