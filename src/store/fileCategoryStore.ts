import { createSlice } from "@reduxjs/toolkit";
import { FileCategories } from "../services/fileCategories.service";

const fileCategories=new FileCategories();

const fileCategorySlice=createSlice({
    name:"fileCategoryStore",
    initialState:{
        fileCategories:fileCategories.getAllFileCategories(),
        actions:fileCategories.getActions(),
        activeCategory:""
    },
    reducers:{
        setActiveCategory:(state:any,action)=>{
            state.activeCategory=action.payload
        }
    }    
})

export const {setActiveCategory}=fileCategorySlice.actions

export default fileCategorySlice.reducer