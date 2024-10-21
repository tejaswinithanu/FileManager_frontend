import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../loading";
import { useEffect, useState } from "react";
import { deleteUser, fetchUsers } from "../../store/userStore";
import Modal from 'react-modal'
import './index.css';

Modal.setAppElement('#root')

export const Users = () => {

    const [isModalOpen,setIsModalOpen]=useState(false)

    const [selectedUser,setSelectedUser]=useState("")

    const users = useSelector((state: any) => state.userStore.users);
    const dispatch = useDispatch();

    const [hoveredRow, setHoveredRow] = useState<number | null>(null); // Track hovered row

    const categoryList:any={
        software_development:"Software Development",
        human_resources:"Human Resources",
        financial_files:"Financial Files",
        legal_and_compliance:"Legal and Compaliance",
        project_files:"Project Files"
    }

    useEffect(() => {
        dispatch<any>(fetchUsers());
    }, []);

    const isLoading = useSelector((state: any) => state.userStore.loading);

    const handleDeleteUser=async ()=>{
        closeModal()
        await dispatch<any>(deleteUser(selectedUser))
        dispatch<any>(fetchUsers())
    }

    const openModal=(email:any)=>{
        setSelectedUser(email)
        setIsModalOpen(true)
    }

    const closeModal=()=>{
        setIsModalOpen(false)
    }

    return (
        <>
            {isLoading && <Loading />}
            <div className="user-table-container mt-4">
                <h4 className="text-center">Users List</h4>
                <table className="table table-hover table-striped table-responsive">
                    <thead className="thead">
                        <tr className="tr">
                            <th>Email</th>
                            <th>Role </th>
                            <th>Categories(Hover to see)</th>
                            <th>Delete Member</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: any, index: any) => (
                            <tr 
                                key={user._id}
                                onMouseEnter={() => setHoveredRow(index)}  // Set hovered row on mouse enter
                                onMouseLeave={() => setHoveredRow(null)}   // Reset hovered row on mouse leave
                                className={hoveredRow === index ? 'expanded-row' : ''}
                            >
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <div className="categories-cell">
                                        {hoveredRow === index ? (
                                            <div className="expanded-categories">
                                                {user.categories.map((category: any, idx: any) => (
                                                    <span key={idx} className="badge badge-info">
                                                        {categoryList[category]||category},
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <span className="assigned-categories">Assigned Categories</span>
                                        )}
                                    </div>
                                </td>
                                <td><button onClick={()=>openModal(user.email)} className="btn btn-danger">Delete</button></td>
                                <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Example Modal" className="modal-content d-flex flex-column align-center" overlayClassName="modal-overlay">
                                    <h6 className="mb-4">Are you sure?</h6>
                                    <div className="d-flex justify-content-center">
                                    <button onClick={()=>handleDeleteUser()} className="btn btn-outline-danger px-5 me-2">Delete</button>    

                                    <button onClick={closeModal} className='btn btn-danger px-5 ms-2'>
                                    Close
                                    </button>
                                    </div>
                                </Modal>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};
