import React, { useState } from 'react';
import Modal from 'react-modal';

import './index.css'

Modal.setAppElement('#root')

export const AddUser:React.FC=()=>{
    const [isOpen,setIsOpen]=useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };
    

    return(
        <div className="d-flex flex-row justify-content-end add-user-bar shadow">
            <button 
                onClick={openModal}
                className='btn btn-primary'
                >
                Add User
            </button>
            <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Example Modal" className="modal-content" overlayClassName="modal-overlay">
                <form className='d-flex flex-column'>
                <div className='d-flex flex-column mb-3'>
                    <label className='form-label' htmlFor='email'>User email</label>
                    <input id="email" className='form-control' type="text" placeholder="Enter User email"/>
                </div>
                <button type="submit" className='btn btn-primary mb-3'>Add User</button>
                </form>
                
                <button onClick={closeModal} className='btn btn-danger'>
                Close
                </button>
            </Modal>
        </div>
    )
}