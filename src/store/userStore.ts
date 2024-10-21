import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FileCategories } from "../services/fileCategories.service";
import axios from "../services/axiosInstance";
const fileCategories=new FileCategories()

export const inviteUser:any=createAsyncThunk('users/inviteUser', async (userDetails) => {
    console.log('userDetails inside thunk',userDetails)
    const response=await axios.post('/userfunctions',userDetails)

    console.log('api called')
    console.log('response',response.data)
    return JSON.parse(response.data)
    
  });

export const deleteUser:any=createAsyncThunk('users/deleteUser',async (userMail,{rejectWithValue})=>{
  try{
    const response=await axios.delete(`/userfunctions?userMail=${userMail}`)
    if(response.status===200){
      return response.data
    }
  }catch(err:any){
    return rejectWithValue(err.response?.data)
  }
})

export const fetchUsers=createAsyncThunk('users/fetchUsers',async (_,{rejectWithValue})=>{
    try{
      const response=await axios.get('https://testsamplefnexp.azurewebsites.net/api/userfunctions');
      
      if(response.status===200){
        return response.data
      }
      
    }catch(err:any){
        return rejectWithValue(err.response.data || 'Something went wrong')
    }
})

const userStore=createSlice({
    name:'userStore',
    initialState:{
        users:[],
        selectedCategories:fileCategories.getAllFileCategories().map((eachCategory:any)=>eachCategory.value),
        status:'idle',
        error:""
        //userDetails:{}
    },
    reducers:{
        addCategories:(state:any,action)=>{
            //console.log(action.payload)
            state.selectedCategories=action.payload
        },
        // addUserDetails:(state:any,action)=>{
        //     console.log('action.payload',action.payload)
        //     state.userDetails=action.payload
        //     console.log('state.userDetails',state.userDetails)
        // }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchUsers.pending,(state:any)=>{
            state.status='loading';
          })
          .addCase(fetchUsers.fulfilled,(state:any,action:any)=>{
              state.status='succeeded'
              state.users=action.payload
          })
          .addCase(fetchUsers.rejected,(state:any,action)=>{
            state.status='failed'
            state.error=action.payload
          })
      },
})

export const {addCategories}=userStore.actions

export default userStore.reducer