import apiSlice from "../Slices/apiSlice"
const vacationApiSlice = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getVacations: build.query({
      query: () => ({
        url: '/api/vacation',
        method: "GET"
      }),
      providesTags: ["Vacation"],
      invalidatesTags: ["Vacation1"]
    }),
    addVacationToMyshoppingCart: build.mutation({
      query: ({ userId, vacationId }) => ({
        url: 'api/user/addToShoppingCart',
        method: 'PUT',
        body: { userId, vacationId }
      }),
      invalidatesTags: ["Vacation"],
      invalidatesTags: ["Vacation1"]

    }),
    deleteVacationToMyshoppingCart: build.mutation({
      query: ({ userId, vacationId }) => ({
        url: `/api/user/deleteFromShoppingCart`,
        method: "PUT",
        body: { userId, vacationId }
      }),
      invalidatesTags: ["Vacation"],
      invalidatesTags: ["Vacation1"]
    }),

    addTovacationPackage: build.mutation({
      query: ({ userId }) => ({
        url: 'api/user/addTovacationPackage',
        method: 'PUT',
        body: { userId }
      }),
      invalidatesTags: ["Vacation"],
      invalidatesTags: ["Vacation1"]

    }),






  })
})
export const { useGetVacationsQuery, useAddVacationToMyshoppingCartMutation, useDeleteVacationToMyshoppingCartMutation, useAddTovacationPackageMutation } = vacationApiSlice