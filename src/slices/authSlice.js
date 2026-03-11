import { createSlice } from "@reduxjs/toolkit";

const initialState={
    signupData:null,
    token:localStorage.getItem("token"),
    loading:false,
}
const authSclie=createSlice({
    name:'auth',     
    initialState,
    reducers:{
        setSignupData(state,action){
            state.signupData=action.payload;
        },
        setToken(state,action){
            state.token=action.payload;
            localStorage.setItem('token',action.payload);
        },
        setLoading(state,action){
            state.loading=action.payload;
        },
        
    }
})

export const{setToken,removeToken,setLoading,setSignupData}=authSclie.actions;
export default authSclie.reducer;
