import { createSlice } from "@reduxjs/toolkit";

const fileSlice=createSlice({
    name:'fileStore',
    initialState:{
        files:[],
        filterValue:""
    },
    reducers:{
        addFile:(state:any,action)=>{
            state.files.push(action.payload);
        },
        updateFilterValue:(state:any,action)=>{
            state.filterValue=action.payload
        },
        filterFiles:(state:any,action)=>{
            const filteredFiles=state.files.filter((eachFile:any)=>{
                const lowercaseName=eachFile.name.tolowercase();
                return lowercaseName.includes(action.payload)
            })
            state.files=filteredFiles
        }
    }
})

export const {addFile,updateFilterValue}=fileSlice.actions

export default fileSlice.reducer