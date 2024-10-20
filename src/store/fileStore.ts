import { createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";



export const fetchFilesByCategory:any=createAsyncThunk('files/fileByCategory',async(category,{rejectWithValue})=>{
    //console.log(category)
    try{
        const response=await axios.get(`https://testsamplefnexp.azurewebsites.net/api/filefunctions?category=${category}`)
        if(response.status===200){
            console.log(response.data)
            return response.data
        }
    }catch(err:any){
        return rejectWithValue(err.response?.data || 'Something went wrong')
    }
})

export const deleteFile=createAsyncThunk('files/deleteFile',async(params:any,{rejectWithValue})=>{
    const {selectedFile,userMail}=params;
    console.log(selectedFile,userMail)
    try{
        const response=await axios.delete(`https://testsamplefnexp.azurewebsites.net/api/filefunctions?blobName=${selectedFile}&userMail=${userMail}`)
        if(response.status===200){
            return response.data
        }
    }catch(err:any){
        return rejectWithValue(err.response?.data || 'Something went wrong')
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
        sortBy:"default"
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
        },
        setStatus:(state:any,action)=>{
            state.status=action.payload
        },
        setSortValue:(state:any,action)=>{
            console.log(action.payload)
            state.sortBy=action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
        // .addCase(fetchFiles.pending,(state:any)=>{
        //     state.loading=true;
        //   })
        // .addCase(fetchFiles.fulfilled,(state:any,action)=>{
        //     //console.log(action.payload)
        //     state.loading=false;
        //     state.files=action.payload
        // })
        // .addCase(fetchFiles.rejected,(state:any,action)=>{
        //     state.loading=false;
        //     state.error=action.payload
        // })
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
            state.status='loading'
            state.deleteStatus='succeeded'
        })
        .addCase(deleteFile.rejected,(state:any,action)=>{
            state.status='succeeded'
            state.deleteStatus='failed'
            state.error=action.payload || action.error.message
        })
    }
})

export const {addFile,updateFilterValue,setStatus,setSortValue}=fileSlice.actions

export default fileSlice.reducer