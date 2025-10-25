import { createSlice } from "@reduxjs/toolkit";

const initialState={
    user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null,
    loading:false 
};

const profileSlice=createSlice({
    name:"profile",
    initialState,
    reducers:{
        setUser(state,action){
            state.user=action.payload;
            localStorage.setItem('user',JSON.stringify(action.payload));
        },
        setLoading(state,action){
            state.loading=action.payload;
        },
        setDP(state,action){
            state.user.image=action.payload;
        }
    }
})

export const {setUser,setLoading,setDP}=profileSlice.actions;  
export default profileSlice.reducer;