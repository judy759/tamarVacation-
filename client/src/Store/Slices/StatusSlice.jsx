import { createSlice } from "@reduxjs/toolkit";
const initStatus={
    StatusArr:["1,2"]
}
const StatusSlice=createSlice({
    name:"StatusArr",
    initialState:initStatus,
    reducers:{
        updateStatus:(state,actions)=>{
            state.StatusArr=actions.payload.GetAllStatus
        },
        

    }
})
export const {updateStatus}=StatusSlice.actions
export default StatusSlice.reducer