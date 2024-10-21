import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import axios from 'axios';
 
export const Login = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
 
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
 
    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const domainRegex = /@g7cr\.com$/;
 
        if (!email) {
            toast.error('*Email is required', {
                position: "top-right",
                autoClose: 5000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme:"dark"
            });
            return false;
        }
        if (!emailRegex.test(email)) {
            toast.error('*Invalid email address', {
                position: "top-right",
                autoClose: 3000,
                theme:"dark"
            });
            return false;
        }
        if (!domainRegex.test(email)) {
            toast.error('*Email must end with g7cr.com', {
                position: "top-right",
                autoClose: 3000,
                theme:"dark"
            });
            return false;
        }
        return true;
    };
 
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
 
        if (!validateEmail(email)) {
            setIsSubmitting(false);
            return;
        }

        try{
            const response=await axios.get(`https://testsamplefnexp.azurewebsites.net/api/userfunctions?userMail=${email}`)
            if(response.status===200){
                const tenantId = process.env.REACT_APP_TENANT_ID;
                const clientId = process.env.REACT_APP_CLIENT_ID;
        
            
                toast.success('Redirecting to Microsoft Login...', {
                    position: "top-right",
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme:"dark"
                });
        
            
                const authUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=http://localhost:3000/runway&response_mode=query&scope=openid profile email User.Read`;
                window.location.href = authUrl;
        
                setIsSubmitting(false);
                    }
        }catch(err:any){
            console.log(err.response?.data)
        }
 
        
    };
 
    return (
        <>
           
            <ToastContainer
                className="toast-custom"
                position="top-right"
                autoClose={3000}
                hideProgressBar={true}
                closeOnClick={true}
                pauseOnHover={true}
                draggable={true}
            />
 
            <form className='login-form-container' onSubmit={handleSubmit}>
                <h1 className='welcome'>Hey, Welcome to File Manger!🚀</h1>
                <div className='email-container mb-3'>
                    <label className='label' htmlFor='email'>Email</label>
                    <input
                        className="input"
                        placeholder="Enter your email"
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <button
                    type="submit"
                    className='login-btn'
                    disabled={isSubmitting} // Disable button if the form is submitting
                >
                    Login with <img alt="microsoft" className='microsoft-icon' src='https://res.cloudinary.com/dywrzseia/image/upload/v1729364368/microsoft_732221_2_qzxstc.png'/>
                </button>
                </div>
                
            </form>
        </>
    );
};
 

 