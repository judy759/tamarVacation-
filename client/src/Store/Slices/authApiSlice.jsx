import apiSlice from '../Slices/apiSlice';
import { setToken } from './authSlice';

// Logout
const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query: (e) => ({
                url: "/api/auth/login",
                method: "POST",
                body: e
            }),
        }),
    
        refresh: build.mutation({
            query: () => ({
                url: "/api/auth/login",
                method: "GET"
            })
        }),

        register: build.mutation({
            query: (registerUser)=>({
            url: "/api/auth/register",
            method: "POST",
            body: registerUser
            })
            }),
        getUser: build.query({
            query: () => ({
                url: "/api/user",
                method: "GET",
            }),
            providesTags:["Vacation1"]

        }),
        keepMeUpdate: build.mutation({
            query: (e) => ({
                url: "/api/user/keepMeUpdate",
                method: "PUT",
                body:e
            }),
        }),
        getAllRegisters: build.query({
            query: () => ({
                url: "/api/user/allRegisters",
                method: "PUT"
            }),
        }),
        sendEmailTamar: build.mutation({
            query: (e) => ({
                url: "/api/user/sendEmailTamar",
                method: "POST",
                body:e
            }),
        }),
    }),
});

// Destructure the generated hooks from authApiSlice
export const {useRegisterMutation,useLoginMutation, useRefreshMutation ,useGetUserQuery,useKeepMeUpdateMutation,useGetAllRegistersQuery,useSendEmailTamarMutation} = authApiSlice

// const authApiSlice = apiSlice.injectEndpoints({
//     endpoints: (build) => ({
//         register: build.mutation(
//             {
//             query: (registerUser) => ({
//                 url: "/api/auth/register",
//                 method: "POST",
//                 body: registerUser
//             })
//         }),
//         login: build.mutation({
//             query: (loginData) => ({
//                 url: "/api/auth/login",
//                 method: "POST",
//                 body: loginData
//             })
//         })
//     })
// })
// import apiSlice from '../Slices/apiSlice';
// const authApiSlice = apiSlice.injectEndpoints({
//     endpoints: (build) => ({
//         register: build.mutation({
//             query: (registerUser) => ({
//                 url: "/api/auth/register",
//                 method: "POST",
//                 body: registerUser
//             })
//         }),
//         login: build.mutation({
//             query: (loginData) => ({
//                 url: "/api/auth/login",
//                 method: "POST",
//                 body: loginData
//             })
//         }),
//         getUser: build.query({
//             query: () => ({
//                 url: "/api/user",
//                 method: "GET",
//             }),
//             providesTags: ["Vacation1"]

//         }),
//     })
// })
// export const { useRegisterMutation, useLoginMutation, useGetUserQuery } = authApiSlice