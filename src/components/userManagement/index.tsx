import { AddUser } from "../inviteMember"
import { Users } from "../users"
import './index.css'

export const UserManagement=()=>{
    return(
        <div className="users-container">
           <AddUser/>
           <Users/>    
        </div>
    )
}