// import { RootState } from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

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

const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  console.log("���� API Response:", result?.error?.status);

  if (result?.error?.status === 401) {
    console.warn("Token expired Unauthorized");

    localStorage.removeItem("accessToken");
    localStorage.removeItem("persist:auth");

    api.dispatch({ type: "auth/logoutUser" });

    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["auth", "doctor"],
  endpoints: () => ({}),
});
