import React, { useState } from 'react';
import Modal from 'react-modal';
import './index.css';
import { CategoriesDropdown } from '../categories';
import { fetchUsers } from "../../store/userStore";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import { inviteUser } from '../../store/userStore';

Modal.setAppElement('#root');

export const AddUser: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');
  const [emailError, setEmailError] = useState('');

  const dispatch = useDispatch();
  const selectedCategories = useSelector(
    (state: any) => state.userStore.selectedCategories
  );

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Toastify notifications
  const notifySuccess = (message: string) => {
    toast.success(message, {
      position:'top-right',
      autoClose: 5000,
      theme:"dark"
    });
  };

  const notifyError = (message: string) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      theme:"dark"
    });
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@g7cr\.com$/; // Regex for g7cr.com domain
    if (!value) {
      return 'Email is required';
    } else if (!emailRegex.test(value)) {
      return 'Email must be registered under g7cr.com address';
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      return 'Invalid email';
    }
    return '';
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailValidationError = validateEmail(email);

    if (emailValidationError) {
      setEmailError(emailValidationError);
      notifyError(emailValidationError); // Show error via Toastify
      return;
    } else {
      setEmailError('');
    }

    try {
      const userDetails = {
        email,
        role,
        categories: selectedCategories,
      };

      console.log('User details before dispatch:', userDetails);

      // Dispatch the action
      closeModal();
      await dispatch<any>(inviteUser(userDetails)); 
      dispatch<any>(fetchUsers())
      notifySuccess(`Member ${email} invited successfully!`);
      setEmail("");
    } catch (error) {
      notifyError('Failed to invite the user.');
    }
  };

  return (
    <div className="d-flex flex-row justify-content-end add-user-bar">
      <button onClick={openModal} className="invite-btn">
        Invite Member
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Invite Member Modal"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <form onSubmit={handleSubmit} className="d-flex flex-column modal-box">
          <div className="d-flex flex-column mb-3">
            <label className="form-label" htmlFor="email">
              User email
            </label>
            <input
              type="text"
              id="email"
              className="form-control input-box"
              placeholder="Enter User email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="me-2 form-label " htmlFor="access-level">
              Access level
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ cursor: 'pointer' }}
              className="form-control input-box"
              id="access-level"
            >
              <option value="user">user</option>
              <option value="admin">admin</option>
            </select>
          </div>

          {role === 'user' && (
            <div className="mb-3 d-flex ">
              <CategoriesDropdown />
            </div>
          )}

          <button type="submit" className="invite-btn mb-3">
            Invite {role}
          </button>
        </form>

        <button onClick={closeModal} className="close-button">
          Close
        </button>
      </Modal>

      {/* Toastify Container for notifications */}
      <ToastContainer />
    </div>
  );
};
