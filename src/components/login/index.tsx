import {ErrorMessage, Field, Form, Formik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

import './index.css'

const validationSchema=Yup.object({
    email:Yup.string().email('*Invalid email address').required('*Email is required').matches(/@g7cr\.com$/,"*Email must ends with g7cr.com")
})

export const Login=()=>{
    return(
        <Formik
            initialValues={{email:""}}
            validationSchema={validationSchema}
            onSubmit={async(values,{setSubmitting})=>{
                const tenantId = process.env.REACT_APP_TENANT_ID;    
                const clientId = process.env.REACT_APP_CLIENT_ID;  
                const url= process.env.REACT_APP_REDIRECT_URL
            
                const authUrl =`https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=http://localhost:3000/runway&response_mode=query&scope=openid profile email User.Read`    
                // Redirect to the Microsoft login page
                window.location.href = authUrl;
             }}
        >
            {({isSubmitting})=>(
                <Form className='login-form-container rounded'>
                    <div className='email-container mb-3'>
                        <label className='mb-2' htmlFor='email'>Email</label>
                        <Field className="input mb-2" placeholder="Enter your email" type="email" id="email" name="email"/>
                        <ErrorMessage className='text-danger' component="div" name="email"/>
                    </div>
                    <button type="submit" className='btn btn-primary'>Login</button>
                </Form>
            )}
        </Formik>
    )
}