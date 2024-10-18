import { useDispatch, useSelector } from "react-redux"
import { Loading } from "../loading"
import { useEffect} from "react"
import { fetchUsers } from "../../store/userStore";
import './index.css'
 
export const Users = () => {
    const users = useSelector((state: any) => state.userStore.users)
 
    const dispatch = useDispatch();
 
    useEffect(() => {
        dispatch<any>(fetchUsers())
    }, [])
 
    console.log(typeof users)
 
 
    const isLoading = useSelector((state: any) => state.userStore.loading)
    return (
        <>
            {isLoading && <Loading />}
            <div className="user-table-container mt-4">
                <h4 className="text-center">Users List</h4>
                <table className="table table-hover table-striped table-responsive">
                    <thead className="thead-dark">
                        <tr>
                            <th>Email</th>
                            <th>Role (Hover to see categories)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user:any, index:any) => (
                            <tr key={user._id}>
                                <td>{user.email}</td>
                                <td className="role-cell">
                                    {user.role}
                                    <div className="categories-tooltip">
                                        <ul>
                                            {user.categories.map((category:any, idx:any) => {
                                                return (<li key={idx}>{category}</li>)
                                            })}
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}
 