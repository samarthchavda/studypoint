import { createSlice } from "@reduxjs/toolkit";

const initialState={
    entireCourseData:localStorage.getItem('entireCourseData') && localStorage.getItem('entireCourseData') !== "undefined" ?JSON.parse(localStorage.getItem('entireCourseData')):null,
    sectionData:localStorage.getItem('sectionData') && localStorage.getItem('sectionData') !== "undefined" ?JSON.parse(localStorage.getItem('sectionData')):[],
    completedLectures:localStorage.getItem('completedLectures') && localStorage.getItem('completedLectures') !== "undefined" ?JSON.parse(localStorage.getItem('completedLectures')):[],
    totalLectures:localStorage.getItem('totalLectures') && localStorage.getItem('totalLectures') !== "undefined" ?JSON.parse(localStorage.getItem('totalLectures')):[],
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