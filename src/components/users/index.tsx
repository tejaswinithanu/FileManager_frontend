import { useDispatch, useSelector } from "react-redux"
import { Loading } from "../loading"
import { useEffect, useState } from "react"
import { fetchUsers } from "../../store/userStore";
import { UserItem } from "../userItem";

export const Users=()=>{
    const users=useSelector((state:any)=>state.userStore.users)

    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch<any>(fetchUsers())   
    },[])

    console.log(typeof users)

    
    const isLoading=useSelector((state:any)=>state.userStore.loading)
    return(
        <>
        {isLoading && <Loading/>}
        <div>
            {(users.length!==0) && (
                <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>role</th>
                        <th>categories</th>
                    </tr>
                </thead>
                <tbody>
                
                    {users.map((eachUser:any)=>(
                        <UserItem key={eachUser.email} userDetails={eachUser}/>
                    ))}
                </tbody>
                
                </table>
            )}
        </div>
        </>
    )
}