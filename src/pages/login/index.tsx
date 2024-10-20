import { Navigate } from "react-router-dom";
import { Login } from "../../components/login"

import './index.css'

const LoginPage = () => {

    const token = localStorage.getItem('token');

    if (token) {
        return <Navigate to="/" />
    }

    return (
        <div className="login-page-container">
            <div className="sub-container">
                <div className="img-div">
                    <img alt="login" src="https://jumptools.com/wp-content/uploads/2023/03/section_client-portal_illustration-1.png" className="login-img" />
                </div>
                <div>
                    <Login />
                </div>
            </div>
        </div>
    )
}

export default LoginPage