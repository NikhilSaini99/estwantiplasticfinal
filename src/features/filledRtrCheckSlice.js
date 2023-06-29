import { createSlice } from "@reduxjs/toolkit"

const initialState = { validateNewRTR: true }

const validateRtrSlice =createSlice({
    name:'ValidateNewRTR',
    initialState,
    reducers: {
        validateRTR :(state,action)=>{
            return state= action.payload
        }
    }
})

export const {validateRTR} = validateRtrSlice.actions;
export default validateRtrSlice.reducer