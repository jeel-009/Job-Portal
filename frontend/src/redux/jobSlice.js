import { createSlice } from "@reduxjs/toolkit";

const jobSlice=createSlice({
    name:'job',
    initialState:{
        alljob:[],
        singlejob:null,
        allAdminJob:[],
        searchJobtext:null,
        AllappliedJobs:[],
        searchInhome:null
    },
    reducers:{
        setalljob:(state,action)=>{
            state.alljob=action.payload
        },
        setsinglejob:(state,action)=>{
            state.singlejob=action.payload
        },
        setAllAdminJob:(state,action)=>{
            state.allAdminJob=action.payload
        },
        setsearchJobtext:(state,action)=>{
            state.searchJobtext=action.payload
        },
         setAllappliedJobs:(state,action)=>{
            state.AllappliedJobs=action.payload
        },
        setsearchInhome:(state,action)=>{
            state.searchInhome=action.payload
        }
    }
});

export const {setalljob,setsinglejob,setAllAdminJob,setsearchJobtext,setAllappliedJobs,setsearchInhome}=jobSlice.actions;
export default jobSlice.reducer