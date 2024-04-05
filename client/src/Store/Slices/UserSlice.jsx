import { createSlice } from "@reduxjs/toolkit";
const initUser={
    UserArr:[]
}
const UserSlice=createSlice({
    name:"UserArr",
    initialState:initUser,
    reducers:{
        updateUser:(state,actions)=>{
            state.UserArr=actions.payload.GetAllUser
        },
        

    }
})
export const {updateUser}=UserSlice.actions
export default UserSlice.reducer