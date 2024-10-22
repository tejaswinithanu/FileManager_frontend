import { FaFolderOpen } from "react-icons/fa6";

import './index.css'
import { Link} from "react-router-dom";
import Modal from 'react-modal'
import { useState } from "react";
import { Sidebar } from "../sidebar";

Modal.setAppElement('#root')


export const Header=()=>{

    const [isOpen,setIsOpen]=useState(false); 
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const openModal=()=>setIsOpen(true);
    const closeModal=()=>setIsOpen(false);

    const openSidebar = () => setSidebarOpen(true); // Function to open sidebar
    const closeSidebar = () => setSidebarOpen(false); // Function to close sidebar

    const userDetails:any=sessionStorage.getItem('userDetails')
    const {username,role}=JSON.parse(userDetails)

    const handleLogout=()=>{
        sessionStorage.clear(); 
        const azureLogoutUrl = `https://login.microsoftonline.com/${
            process.env.REACT_APP_TENANT_ID
          }/oauth2/v2.0/logout?post_logout_redirect_uri=${encodeURIComponent(
            "http://localhost:3000/login" // Set the login page after logout
          )}`;
        window.location.href = azureLogoutUrl;
    }

    return(
        
    <>
        <nav id="navbar-example2" className="navbar navbar-dark px-5 header">
            <Link className="navbar-brand app-name-container" to="/">
            <FaFolderOpen className="me-2 mb-0 pb-0"/>
            <p className="app-name">File Manager</p>
            </Link>

            <ul className="nav nav-pills">
                <li className="nav-item">
                <Link className="link-item nav-link" to="/folders">
                {/* <a className="nav-link" href="/"> */}
                    Folders📂
                
                </Link>
                </li>

                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle link-item" data-bs-toggle="dropdown" href="#." role="button" aria-expanded="false">
                    <p className="user-name">{username}</p>
                    <img alt="profile" className="user-logo ms-2 me-1" src="https://res.cloudinary.com/dywrzseia/image/upload/v1729363391/success_15374780_ydhodm.gif"/>
                </a>

                <ul className="dropdown-menu">
                    <li onClick={openSidebar} className="dropdown-item cursor-pointer">Profile</li>
                    <li><Link className="dropdown-item ps-3" to="/folders">Folders</Link></li>
                    <li><hr className="dropdown-divider"/></li>
                    
                    {
                        role==="admin" &&
                        <li>
                        <Link className="drop-item dropdown-item ps-3" to="/user-management">
                            User Management
                        </Link>
                        </li>
                    }
                    <li>
                    <button onClick={openModal} className="logout-btn dropdown-item">Logout</button>
                    {/* <MdDelete className="delete-icon" onClick={()=>openModal(eachFile.name)}/> */}
                                
                    <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Example Modal" className="modal-content d-flex flex-column align-center" overlayClassName="modal-overlay">
                        <h6 className="mb-4">Are you sure, you want to logout?</h6>
                        <div className="d-flex justify-content-center">
                        <button onClick={handleLogout} className="btn btn-outline-danger px-5 me-2">Logout</button>    

                        <button onClick={closeModal} className='btn btn-danger px-5 ms-2'>
                        Close
                        </button>
                        </div>
                    </Modal>
                    </li>
                </ul>
                </li>
            </ul>
            </nav>
            <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />
    </>

    )
}