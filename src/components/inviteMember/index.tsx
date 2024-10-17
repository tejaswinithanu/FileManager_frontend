import React, { useState } from 'react';
import Modal from 'react-modal';

import './index.css'
import { CategoriesDropdown } from '../categories';
import { useDispatch, useSelector } from 'react-redux';

import { Field, Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { inviteUser } from '../../store/userStore';


Modal.setAppElement('#root')

const validationSchema=Yup.object({
    email:Yup.string().email('Invalid email').matches(/^[a-zA-Z0-9._%+-]+@g7cr\.com$/, 'Email must be registered under g7cr.com address').required('Email is required')
})

export const AddUser:React.FC=()=>{
    const [isOpen,setIsOpen]=useState(false);

    const dispatch=useDispatch();

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const selectedCategories=useSelector((state:any)=>state.userStore.selectedCategories)

    return(
        <div className="d-flex flex-row justify-content-end add-user-bar shadow">
            <button 
                onClick={openModal}
                className='btn btn-primary'
                >
                Invite Member
            </button>
            <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Example Modal" className="modal-content" overlayClassName="modal-overlay">
                {/* <form className='d-flex flex-column'>
                <div className='d-flex flex-column mb-3'>
                    <label className='form-label' htmlFor='email'>User email</label>
                    <input onChange={onChangeEmail} id="email" className='form-control' type="email" placeholder="Enter User email"/>
                </div>
                <div className='mb-3'>
                    <label className='me-2 form-label' htmlFor="access-level">Access level</label>
                    <select style={{ cursor: 'pointer' }} onChange={handleRoleChange} value={role} className='form-control' id="access-level">
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                    </select>
                </div>
                {role==='user'&& (
                    <div className='mb-3 d-flex'>      
                        <CategoriesDropdown/>
                    </div>
                )}
                
                <button onClick={handleInviteMember} type="submit" className='btn btn-primary mb-3'>Invite {role}</button>
                </form> */}
                <Formik
                    initialValues={{email:"",role:"user"}}
                    validationSchema={validationSchema}
                    onSubmit={async (values,{setSubmitting})=>{
                        
                        const userDetails={...values,categories:selectedCategories}
                        console.log('userDetails before dispatch',userDetails)
                        dispatch<any>(inviteUser(userDetails))
                        closeModal()

                     }}
                >
                {({isSubmitting,values})=>(
                    <Form className='d-flex flex-column'>
                        <div className='d-flex flex-column mb-3'>
                            <label className='form-label' htmlFor='email'>User email</label>
                            <Field name="email" id="email" className='form-control' placeholder="Enter User email"/>
                            <ErrorMessage className='text-danger' name="email"/>
                        </div>
                        <div className='mb-3'>
                            <label className='me-2 form-label' htmlFor="access-level">Access level</label>
                            <Field name="role" as="select" style={{ cursor: 'pointer' }} className='form-control' id="access-level">
                                <option value="user">user</option>
                                <option value="admin">admin</option>
                            </Field>
                            <ErrorMessage name="role"/>
                        </div>
                        {values.role==='user'&& (
                            <div className='mb-3 d-flex'>      
                                <CategoriesDropdown/>
                            </div>
                        )}
                        
                        <button type="submit" className='btn btn-primary mb-3'>Invite {values.role}</button>
                    </Form>
                )}
                </Formik>
                
                <button onClick={closeModal} className='btn btn-danger'>
                Close
                </button>
            </Modal>
        </div>
    )
}