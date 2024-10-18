import './index.css'

export const UserItem=({userDetails}:any)=>{
    const {email,role,categories}=userDetails
    return(
        <tr>
            <td>{email}</td>
            <td>
                {role}
            </td>
            <td>
                {categories}
            </td>
        </tr>
    )
}