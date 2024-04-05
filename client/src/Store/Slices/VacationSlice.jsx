import { createSlice } from "@reduxjs/toolkit";
const initVacation={
    VacationArr:[]
}
const VacationSlice=createSlice({
    name:"VacationArr",
    initialState:initVacation,
    reducers:{
        updateVacation:(state,actions)=>{
            state.VacationArr=actions.payload.GetAllVacation
        },
        

    }
})
export const {updateVacation}=VacationSlice.actions
export default VacationSlice.reducer