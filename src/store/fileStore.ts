import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../services/axiosInstance";



export const fetchFilesByCategory:any=createAsyncThunk('files/fileByCategory',async(category,{rejectWithValue})=>{
    try{
        const response=await axios.get(`/filefunctions?category=${category}`)
        if(response.status===200){
            return response.data
        }
    }catch(err:any){
        return rejectWithValue(err.response?.data || 'Something went wrong')
    }
})

export const deleteFile=createAsyncThunk('files/deleteFile',async(params:any,{rejectWithValue})=>{
    const {selectedFile,category}=params;
    console.log(selectedFile)
    try{
        const response=await axios.delete(`/filefunctions?blobName=${selectedFile}&category=${category}`)
        if(response.status===200){
            return response.data
        }
    }catch(err:any){
        return rejectWithValue(err.response?.data || 'Something went wrong')
    }
})

export const uploadFile=createAsyncThunk('files/uploadFile',async (params:any,{rejectWithValue})=>{
    const {category,formData}=params 
    const token=sessionStorage.getItem('token') 
    try{
            const response=await fetch(`https://testsamplefnexp.azurewebsites.net/api/filefunctions?category=${category}`,
                {
                    method:'POST',
                    body:formData,
                    headers:{
                        'Authorization':`Bearer ${token}`
                    }
                }
            )

            if(response.ok){

                const result =await response.text();
                return result
            }
        }catch(err:any){
            return rejectWithValue(err.message || 'Could not upload the file')
        }
})

const fileSlice=createSlice({
    name:'fileStore',
    initialState:{
        files:[],
        filterValue:"",
        status:"idle",   //  loading/succeeded/failed 
        error:"",
        deleteStatus:"idle",
        uploadStatus:"idle",
        sortBy:"default"
    },
    reducers:{
        addFile:(state:any,action)=>{
            state.files.push(action.payload);
        },
        updateFilterValue:(state:any,action)=>{
            state.filterValue=action.payload
        },
        setStatus:(state:any,action)=>{
            state.status=action.payload
        },
        setSortValue:(state:any,action)=>{
            console.log(action.payload)
            state.sortBy=action.payload
        },
        setFileDeleteStatus:(state:any,action)=>{
            state.deleteStatus=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchFilesByCategory.pending,(state:any)=>{
            state.status='loading'
        })
        .addCase(fetchFilesByCategory.fulfilled,(state:any,action)=>{
            state.status='succeeded'
            state.files=action.payload
        })
        .addCase(fetchFilesByCategory.rejected,(state:any,action)=>{
            state.status='failed'
            state.error=action.payload || action.error.message
        })
        .addCase(deleteFile.pending,(state:any)=>{
            state.deleteStatus='loading'
        })
        .addCase(deleteFile.fulfilled,(state:any,action)=>{
            // state.status='succeeded'
            state.deleteStatus='succeeded' 
        })
        .addCase(deleteFile.rejected,(state:any,action)=>{
            // state.status='failed'
            state.deleteStatus='failed'
            state.error=action.payload || action.error.message
        })
        .addCase(uploadFile.pending,(state:any)=>{
            state.uploadStatus='loading'
        })
        .addCase(uploadFile.fulfilled,(state:any,action)=>{
            state.uploadStatus='succeeded' 
        })
        .addCase(uploadFile.rejected,(state:any,action)=>{
            state.uploadStatus='failed'
            state.error=action.payload || action.error.message
        })
    }
})

export const {addFile,updateFilterValue,setStatus,setSortValue,setFileDeleteStatus}=fileSlice.actions

export default fileSlice.reducer