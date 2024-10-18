import { FaFolderOpen } from "react-icons/fa6";

import './index.css'
import { Link, useNavigate} from "react-router-dom";

export const Header=()=>{

    const navigate=useNavigate();

    const handleLogout=()=>{
        localStorage.clear();
        const azureLogoutUrl = `https://login.microsoftonline.com/${
            process.env.REACT_APP_TENANT_ID
          }/oauth2/v2.0/logout?post_logout_redirect_uri=${encodeURIComponent(
            "http://localhost:3000/login" // Set the login page after logout
          )}`;
        window.location.href = azureLogoutUrl;
    }

    return(
        
        <nav id="navbar-example2" className="navbar navbar-dark bg-warning px-5 header">
            <a className="navbar-brand app-name" href="/">
            <FaFolderOpen className="me-2"/>
            Tech Solutions</a>
            <ul className="nav nav-pills">
                <li className="nav-item">
                <Link className="link-item nav-link" to="/folders">
                {/* <a className="nav-link" href="/"> */}
                    Folders
                
                </Link>
                </li>
                <li className="nav-item link-item">
                <Link className="link-item nav-link" to="/files">
                {/* <a className="nav-link" href="#scrollspyHeading2"> */}
                    All Files
                  
                </Link>
                </li>
                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#." role="button" aria-expanded="false">Admin</a>
                <ul className="dropdown-menu">
                    <li><a className="dropdown-item ps-3" href="#scrollspyHeading3">Folders</a></li>
                    <li><a className="dropdown-item ps-3" href="#scrollspyHeading4">All Files</a></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li>
                    <Link className="link-item dropdown-item ps-3" to="/user-management">
                    {/* <a className="dropdown-item" href="/"> */}
                    User Management
                    </Link></li>
                    <button onClick={handleLogout} className="btn btn-outline">Logout</button>
                </ul>
                </li>
            </ul>
            </nav>
    

    )
}