import { createSlice } from "@reduxjs/toolkit";
import { FileCategories } from "../services/fileCategories.service";

const fileCategories=new FileCategories();

const fileCategorySlice=createSlice({
    name:"fileCategoryStore",
    initialState:{
        fileCategories:fileCategories.getAllFileCategories(),
        actions:fileCategories.getActions()
    },
    reducers:{}    
})

export default fileCategorySlice.reducer