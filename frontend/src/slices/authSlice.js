import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	cid:localStorage.getItem('cid') ? JSON.parse(localStorage.getItem('cid')) : null,
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			state.userInfo = action.payload.userInfo
			state.cid = action.payload.cid
			localStorage.setItem('userInfo', JSON.stringify(action.payload.userInfo))
			localStorage.setItem('cid', JSON.stringify(action.payload.cid))
		},
		logout: (state) => {
			state.userInfo = null
			localStorage.removeItem('userInfo')
			localStorage.removeItem('cid')
			localStorage.removeItem('todos')
		},
		updateCid: (state,action)=>{
           state.cid = action.payload
		   localStorage.setItem('cid', JSON.stringify(action.payload))
		}
	}
})

export const { setCredentials, logout,updateCid} = authSlice.actions

export default authSlice.reducer