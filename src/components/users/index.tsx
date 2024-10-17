import { useDispatch, useSelector } from "react-redux"
import { Loading } from "../loading"
import { useEffect } from "react"
import { fetchUsers } from "../../store/userStore";

export const Users=()=>{
    const users=useSelector((state:any)=>state.userStore.users)

    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch<any>(fetchUsers())
    },[users,dispatch])

    console.log(typeof users)

    
    const isLoading=useSelector((state:any)=>state.userStore.loading)
    return(
        <>
        {isLoading && <Loading/>}
        <div>
            {(users.length!==0) && (
                <ul>
                    {users.email}
                </ul>
            )}
        </div>
        </>
    )
}