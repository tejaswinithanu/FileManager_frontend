import { configureStore } from "@reduxjs/toolkit";
import fileStore from './fileStore'
import fileCategoryStore from './fileCategoryStore'

const store=configureStore({
    reducer:{
        'fileStore':fileStore,
        'fileCategoryStore':fileCategoryStore
    }
})

export default store