import { FaFolderOpen } from "react-icons/fa6";

import './index.css'
import { Link} from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const Header=()=>{

    const memberRole=useSelector((state:any)=>state.userStore.userRole)

    const handleLogout=()=>{
        localStorage.clear();
        const azureLogoutUrl = `https://login.microsoftonline.com/${
            process.env.REACT_APP_TENANT_ID
          }/oauth2/v2.0/logout?post_logout_redirect_uri=${encodeURIComponent(
            "http://localhost:3000/login" // Set the login page after logout
          )}`;
        window.location.href = azureLogoutUrl;
    }

    const memberName=localStorage.getItem('username')

    return(
        
        <nav id="navbar-example2" className="navbar navbar-dark px-5 header">
            <a className="navbar-brand app-name" href="/">
            <FaFolderOpen className="me-2"/>
            File Manager.</a>
            <ul className="nav nav-pills">
                <li className="nav-item">
                <Link className="link-item nav-link" to="/folders">
                {/* <a className="nav-link" href="/"> */}
                    Folders📂
                
                </Link>
                </li>
                {/* <li className="nav-item link-item">
                <Link className="link-item nav-link" to="/files">
                
                    All Files
                  
                </Link>
                </li> */}
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle link-item" data-bs-toggle="dropdown" href="#." role="button" aria-expanded="false">{memberName}</a>
                <ul className="dropdown-menu">
                    <li><Link className="dropdown-item ps-3" to="/folders">Folders</Link></li>
                    <li><hr className="dropdown-divider"/></li>
                    
                    {
                        memberRole==="admin" &&
                        <li>
                        <Link className="drop-item dropdown-item ps-3" to="/user-management">
                            User Management
                        </Link>
                        </li>
                    }
                    
                    <button onClick={handleLogout} className="btn btn-outline">Logout</button>
                </ul>
                </li>
                <li>
                    <img className="user-logo" src="https://res.cloudinary.com/dywrzseia/image/upload/v1729363391/success_15374780_ydhodm.gif"/>
                </li>
            </ul>
            </nav>
    

    )
}