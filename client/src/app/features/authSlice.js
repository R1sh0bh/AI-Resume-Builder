import { createSlice } from "@reduxjs/toolkit";

const authSclice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        user: null,
        loading: true
    },
    reducers: {
        login: (state, action)=>{
            state.token = action.payload.token
            state.user = action.payload.user
        },
        logout: (state)=>{
            state.token = '',
            state.user=null,
            localStorage.removeItem('token')
        },
        setloading: (state, action)=>{
            state.loading = action.payload
        }
    }
})


export const {login,logout,setloading} = authSclice.actions

export default authSclice.reducer