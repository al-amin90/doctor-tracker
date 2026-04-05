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

    console.log("!token", token);
    // If no token in state, try to get from localStorage (client-side only)
    if (!token) {
      try {
        const raw = localStorage.getItem("persist:authInfo");
        if (raw) {
          const parsed = JSON.parse(raw);
          token = parsed.token ? JSON.parse(parsed.token) : null;
        }
        console.log("rawf", raw);
      } catch (e) {
        console.error("Error parsing auth data:", e);
      }
    }

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("x-tenantid", `school`);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("persist:authInfo");

    window.location.href = "/login";
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["auth", "doctor"],
  endpoints: () => ({}),
});
