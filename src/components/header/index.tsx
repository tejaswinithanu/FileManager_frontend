import { FaFolderOpen } from "react-icons/fa6";

import './index.css'
import { Link} from "react-router-dom";


export const Header=()=>{

    const userDetails:any=localStorage.getItem('userDetails')
    const {username,role}=JSON.parse(userDetails)

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
        

        <nav id="navbar-example2" className="navbar navbar-dark px-5 header">
            <Link className="navbar-brand app-name" to="/">
            <FaFolderOpen className="me-2"/>
            File Manager</Link>

            <ul className="nav nav-pills">
                <li className="nav-item">
                <Link className="link-item nav-link" to="/folders">
                {/* <a className="nav-link" href="/"> */}
                    Folders📂
                
                </Link>
                </li>

                <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#." role="button" aria-expanded="false">
                    {username}
                </a>

                <ul className="dropdown-menu">
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