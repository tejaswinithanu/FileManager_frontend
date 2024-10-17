import { configureStore } from "@reduxjs/toolkit";
import fileStore from './fileStore'
import fileCategoryStore from './fileCategoryStore'
import userStore from './userStore'

const store=configureStore({
    reducer:{
        fileStore,
        fileCategoryStore,
        userStore
    }
})

export default store