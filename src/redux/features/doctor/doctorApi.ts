import { TApiResponse, TMeta } from "@/lib/types";
import { IDoctor } from "@/modules/doctor/doctor.interface";
import { baseApi } from "@/redux/api/baseApi";

type TDoctorListResponse = TApiResponse<IDoctor[]> & { meta: TMeta };

type TDoctorQuery = {
  page?: number;
  limit?: number;
  searchTerm?: string;
  sort?: string;
  specialization?: string;
  hospital?: string;
  startDate?: string;
  endDate?: string;
};

const doctorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDoctors: builder.query<TDoctorListResponse, TDoctorQuery>({
      query: (params) => ({
        url: "/doctors",
        params,
      }),
      providesTags: ["doctor"],
    }),
    getDoctorById: builder.query<TApiResponse<IDoctor>, string>({
      query: (id) => `/doctors/${id}`,
      providesTags: (result, error, id) => [{ type: "doctor", id }],
    }),
    createDoctor: builder.mutation<TApiResponse<IDoctor>, Partial<IDoctor>>({
      query: (body) => ({ url: "/doctors", method: "POST", body }),
      invalidatesTags: ["doctor"],
    }),
    updateDoctor: builder.mutation<
      TApiResponse<IDoctor>,
      { id: string; data: Partial<IDoctor> }
    >({
      query: ({ id, data }) => ({
        url: `/doctors/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["doctor"],
    }),
    deleteDoctor: builder.mutation<TApiResponse<null>, string>({
      query: (id) => ({ url: `/doctors/${id}`, method: "DELETE" }),
      invalidatesTags: ["doctor"],
    }),
  }),
});

export const {
  useGetDoctorsQuery,
  useGetDoctorByIdQuery,
  useCreateDoctorMutation,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
} = doctorApi;

export default doctorApi;
