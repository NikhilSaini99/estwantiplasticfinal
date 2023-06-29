import { createSlice } from "@reduxjs/toolkit";

const initialState  = {adminLogin:false,userLogin:false,loginuserData:null}

const loginformSlice = createSlice({
    name: 'form',
    initialState ,
    reducers: {
        updateLoginState: (state, action) => {
           return state=action.payload
        },
        logoutUserState:(state,action)=>{
            return state= action.payload
        }
    }
})

export const { updateLoginState,logoutUserState } = loginformSlice.actions

export default loginformSlice.reducer
