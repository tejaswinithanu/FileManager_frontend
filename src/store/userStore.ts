import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FileCategories } from "../services/fileCategories.service";
import axios from "axios";

const fileCategories=new FileCategories()

export const inviteUser:any=createAsyncThunk('users/fetchUser', async (userDetails) => {
    console.log('userDetails inside thunk',userDetails)
    // const response = await fetch('https://testsamplefnexp.azurewebsites.net/api/userfunctions', {
    //     method: 'POST', // Specify the request method
    //     headers: {
    //         'Content-Type': 'application/json', // Specify the content type
    //     },
    //     body: JSON.stringify(userDetails)// Stringify the request body
    // });
    // console.log('api called')
    // if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    // }
    
    // const data = await response.json();
    // console.log('data',data);
    // return data


    const response=await axios.post('https://testsamplefnexp.azurewebsites.net/api/userfunctions',userDetails)

    console.log('api called')
    console.log('response',response.data)
    return response.data
    
  });

export const fetchUsers=createAsyncThunk('users/fetchUsers',async ()=>{
    try{
      const response=await axios.get('https://testsamplefnexp.azurewebsites.net/api/userfunctions');
      //console.log('users',response.data)
      const data=response.data
      return data
    }catch(err:any){
      throw new Error(err.message)
    }
})

const userStore=createSlice({
    name:'userStore',
    initialState:{
        users:[],
        selectedCategories:fileCategories.getAllFileCategories().map((eachCategory:any)=>eachCategory.value),
        loading:"",
        error:""
    },
    reducers:{
        addCategories:(state:any,action)=>{
            console.log(action.payload)
            state.selectedCategories=action.payload
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchUsers.pending,(state:any)=>{
            state.loading=true;
          })
          .addCase(fetchUsers.fulfilled,(state:any,action)=>{
            console.log(action.payload)
            state.loading=false;
            state.users=action.payload
          })
          .addCase(fetchUsers.rejected,(state:any,action)=>{
            state.loading=false;
            state.error=action.payload
          })
      },
})

export const {addCategories}=userStore.actions

export default userStore.reducer