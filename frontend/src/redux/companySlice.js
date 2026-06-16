import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name:'company',
    initialState:{
        singleCompany:null,
        companies:[],
        searchText:""
    },
    reducers:{
        setSingleCompany:(state,action)=>{
            state.singleCompany=action.payload
        },
        setCompanies:(state,action)=>{
            state.companies=action.payload
        },
         setSearchText:(state,action)=>{
            state.searchText=action.payload
        }
    }
})

export const {setSingleCompany , setSearchText} = companySlice.actions;
export const {setCompanies} = companySlice.actions;
export default companySlice.reducer;