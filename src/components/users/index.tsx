import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../loading";
import { useEffect, useState } from "react";
import { deleteUser, fetchUsers } from "../../store/userStore";
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import './index.css';
 
Modal.setAppElement('#root');

const nameConverter=(name:String)=>{
    let namesArray=name.split("_");
    namesArray=namesArray.map((name:any)=>name.charAt(0).toUpperCase() + name.slice(1));
    return namesArray.join(" ");
}
 
export const Users = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState("");
    const {users,status} = useSelector((state: any) => state.userStore);
    const dispatch = useDispatch();
 
    useEffect(() => {
        dispatch<any>(fetchUsers());
    }, [dispatch]);
 
    const handleDeleteUser = async () => {
        closeModal();
        await dispatch<any>(deleteUser(selectedUser));
        dispatch<any>(fetchUsers());
 
 
        toast.success(`Member deleted successfully: ${selectedUser}`,{
            position: "top-right",
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme:"dark"
        });
    };
 
    const openModal = (email: any) => {
        setSelectedUser(email);
        setIsModalOpen(true);
    };
 
    const closeModal = () => {
        setIsModalOpen(false);
    };
 
    return (
        <div>
            
            <div className="user-table-container mt-4">
                <h4 className="text-center">Users List</h4>
                <table className="table table-hover table-striped table-responsive">
                    <thead className="thead">
                        <tr className="tr">
                            <th>Email</th>
                            <th>Role</th>
                            <th>Categories</th>
                            <th>Delete Member</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: any, index: any) => (
                            <tr
                                key={user._id}
                                // onMouseEnter={() => setHoveredRow(index)}
                                // onMouseLeave={() => setHoveredRow(null)}
                                // className={hoveredRow === index ? 'expanded-row' : ''}
                            >
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    {/* <div className="categories-cell">
                                        {hoveredRow === index ? (
                                            <div className="expanded-categories">
                                                {user.categories.map((category: any, idx: any) => (
                                                    <span key={idx} className="badge badge-info">
                                                        {categoryList[category] || category},
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="assigned-categories">Assigned Categories</span>
                                        )}
                                    </div> */}
                                    <p className="dropdown-toggle cursor-pointer" data-bs-toggle="dropdown" aria-expanded="false">View Assigned Categories</p>
                                    <ul className="dropdown-menu">
                                        {
                                            user.categories.map((category:any)=>(
                                                <li key={category} className="dropdown-item">{nameConverter(category)}</li>
                                            ))
                                        }
                                    </ul>
                                </td>
                                <td>
                                    <button onClick={() => openModal(user.email)} className="btn btn-danger">Delete</button>
                                </td>
                                <Modal
                                    isOpen={isModalOpen}
                                    onRequestClose={closeModal}
                                    contentLabel="Example Modal"
                                    className="modal-content d-flex flex-column align-center"
                                    overlayClassName="modal-overlay"
                                >
                                    <h6 className="mb-4">Are you sure?</h6>
                                    <div className="d-flex justify-content-center">
                                        <button onClick={handleDeleteUser} className="btn btn-outline-danger px-5 me-2">Delete</button>
                                        <button onClick={closeModal} className='btn btn-danger px-5 ms-2'>Close</button>
                                    </div>
                                </Modal>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
 
 