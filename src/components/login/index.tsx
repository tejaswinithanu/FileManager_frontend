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
                const res=await axios.get('http://10.0.0.171:4000/auth/login')
            console.log(res.data)
            window.location.href=res.data
             }}
        >
            {({isSubmitting})=>(
                <Form className='login-form-container rounded'>
                    <div className='email-container mb-3'>
                        <label className='mb-2' htmlFor='email'>Email</label>
                        <Field className="input mb-2" placeholder="Enter your email" type="email" id="email" name="email"/>
                        <ErrorMessage className='text-danger' component="div" name="email"/>
                    </div>
                    <button className='btn btn-primary'>Login</button>
                </Form>
            )}
        </Formik>
    )
}