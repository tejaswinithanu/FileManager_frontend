import './index.css'

export const UserItem=({userDetails}:any)=>{
    const {name,role}=userDetails
    return(
        <tr>
            <td>{name}</td>
            <td>
                {role? <p>{role}</p>:
                <select className="drop-down-ele">
                    <option>user</option>
                    <option>admin</option>
                </select>
                }
            </td>
            <td>
                
            </td>
        </tr>
    )
}