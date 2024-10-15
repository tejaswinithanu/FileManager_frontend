import { createSlice } from "@reduxjs/toolkit";

const fileSlice=createSlice({
    name:'fileStore',
    initialState:{
        files:[]
    },
    reducers:{
        addFile:(state:any,action)=>{
            state.files.push(action.payload);
        }
    }
})

export const {addFile}=fileSlice.actions

export default fileSlice.reducer