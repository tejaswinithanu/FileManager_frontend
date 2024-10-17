import { Navigate } from "react-router-dom";
import { Login } from "../../components/login"

import './index.css'

const LoginPage=()=>{

    const token=localStorage.getItem('token');

    if(token){
        return <Navigate to="/"/>
    }

    return(
        <div className="login-page-container">
            <div className="login-image-container">
                <img className="login-image" alt="file manager" src="https://res.cloudinary.com/dywrzseia/image/upload/e_background_removal/f_png/v1728629884/illustration-steal-data-concept_23-2148534257_o4pk8h.avif"/>
            </div>
            <div className="login-container display-center">
                <img alt="file manager" className="logo-image" src="https://res.cloudinary.com/dqqijdyjr/image/upload/v1728624292/ihnfjchmcdymjfidvsz0.png"/>
                <h5 className="login-page-text mb-4 text-secondary">Welcome to File Manager, login to get started!</h5>
                <Login/>
            </div>  
        </div>
    )
}

export default LoginPage