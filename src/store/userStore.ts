import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FileCategories } from "../services/fileCategories.service";
import axios from "axios";

const fileCategories=new FileCategories()

export const inviteUser:any=createAsyncThunk('users/inviteUser', async (userDetails) => {
    console.log('userDetails inside thunk',userDetails)
    const response=await axios.post('https://testsamplefnexp.azurewebsites.net/api/userfunctions',userDetails)

    console.log('api called')
    console.log('response',response.data)
    return JSON.parse(response.data)
    
  });

export const fetchUsers=createAsyncThunk('users/fetchUsers',async ()=>{
    try{
      const response=await axios.get('https://testsamplefnexp.azurewebsites.net/api/userfunctions');
      
      if(response.status===200){
        const userRole=localStorage.getItem('role');
        const usersList=response.data
        //console.log('userList',usersList)
        if(!userRole){
          const userMail=localStorage.getItem('mail');
          const loggedInUser=usersList.find((user:any)=>user.email===userMail)
          console.log('categories',loggedInUser.categories)
          localStorage.setItem('role',loggedInUser.role)
          return {usersList,userRole:loggedInUser.role,categories:loggedInUser.categories}
        }
        
        return {usersList,userRole}
      }
      
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
        error:"",
        userRole:"",
        assignedCategories:[]
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
          .addCase(fetchUsers.fulfilled,(state:any,action:any)=>{
            const {usersList,userRole,categories}=action.payload
            console.log(usersList)
            console.log('user-role',userRole)
            state.loading=false;
            state.users=usersList
            state.userRole=userRole
            if(categories){
              state.assignedCategories=categories
            }
          })
          .addCase(fetchUsers.rejected,(state:any,action)=>{
            state.loading=false;
            state.error=action.payload
          })
      },
})

export const {addCategories}=userStore.actions

export default userStore.reducer