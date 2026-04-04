import {
  ILoginPayload,
  IRegisterPayload,
  IUser,
} from "@/modules/auth/auth.interface";
import { baseApi } from "@/redux/api/baseApi";

interface ILoginRequest {
  email: string;
  password: string;
}

interface IAuthResponse {
  success: boolean;
  message: string;
  data: {
    user: IUser;
    accessToken: string;
  };
}

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<IAuthResponse, ILoginRequest>({
      query: (credentials: IRegisterPayload) => ({
        url: "auth/register",
        method: "POST",
        body: credentials,
      }),
    }),

    login: builder.mutation<IAuthResponse, ILoginRequest>({
      query: (credentials: ILoginPayload) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    getMe: builder.query({
      query: () => ({
        url: "auth/me",
        method: "GET",
      }),
      providesTags: ["auth"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetMeQuery,
  useLogoutMutation,
} = authApi;

export default authApi;
