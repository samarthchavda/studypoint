import { createSlice } from "@reduxjs/toolkit"

const initialState={
    editCourse:localStorage.getItem('editCourse') || false,
    step:parseInt(localStorage.getItem('step')) || 1,
    loading:false,
    courseInfo:localStorage.getItem('courseInfo')?JSON.parse(localStorage.getItem('courseInfo')) :null
}

const courseSlice=createSlice({
    name:"course",
    initialState,
    reducers:{
        setStep(state,action){
            state.step=action.payload;
            localStorage.setItem('step',JSON.stringify(action.payload));
        },
        setCourseInfo(state,action){
            state.courseInfo=action.payload;
            localStorage.setItem('courseInfo',JSON.stringify(action.payload));
        },
        deleteCourseInfo(state,action){
            state.courseInfo=null;
            localStorage.removeItem('courseInfo');
        },
        setLoading(state,action){
            state.loading=action.payload;
        },
        setEditCourse(state,action){
            state.editCourse=action.payload;
            localStorage.setItem('editCourse',action.payload);
        }
    }
})
export const {setStep,setLoading,setCourseInfo,setEditCourse,deleteCourseInfo}=courseSlice.actions;
export default courseSlice.reducer;