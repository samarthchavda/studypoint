import { createSlice } from "@reduxjs/toolkit";

const initialState={
    entireCourseData:localStorage.getItem('entireCourseData')?JSON.parse(localStorage.getItem('entireCourseData')):null,
    sectionData:localStorage.getItem('sectionData')?JSON.parse(localStorage.getItem('sectionData')):[],
    completedLectures:localStorage.getItem('completedLectures')?JSON.parse(localStorage.getItem('completedLectures')):[],
    totalLectures:localStorage.getItem('totalLectures')?JSON.parse(localStorage.getItem('totalLectures')):[],
}

const viewCourseSlice=createSlice({
    name:'viewCourse',
    initialState,
    reducers:{
        setEntireCourseData:(state,action)=>{
            state.entireCourseData=action.payload;
            localStorage.setItem('entireCourseData',JSON.stringify(action.payload));
        },
        setSectionData:(state,action)=>{
            state.sectionData=action.payload;
            localStorage.setItem('sectionData',JSON.stringify(action.payload));
        },
        setCompletedLectures:(state,action)=>{
            state.completedLectures=action.payload;
            localStorage.setItem('completedLectures',JSON.stringify(action.payload));
        },
        setTotalLectures:(state,action)=>{
            state.totalLectures=action.payload;
            localStorage.setItem('totalLectures',JSON.stringify(action.payload));
        },
        updateCompletedLectures:(state,action)=>{
            state.completedLectures=[
                ...state.completedLectures,
                action.payload
            ]
            localStorage.setItem('completedLectures',JSON.stringify([
                ...state.completedLectures,
                action.payload
            ]));
        }
    }
})

export const {setEntireCourseData,setSectionData,setCompletedLectures,setTotalLectures,updateCompletedLectures}=viewCourseSlice.actions;
export default viewCourseSlice.reducer;