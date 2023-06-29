import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        loginState:(state,action)=>{
            return state=action.payload
        },
        logoutState:(state,action)=>{
            return state=action.payload
        }
    }
})

export const {loginState,logoutState} = authSlice.actions;
export default  authSlice.reducer;