import { AddUser } from "../../components/inviteMember"
import { Users } from "../../components/users"
import './index.css'

export const UserManagement=()=>{
    return(
        <div className="users-container">
           <AddUser/>
           <Users/>    
        </div>
    )
}