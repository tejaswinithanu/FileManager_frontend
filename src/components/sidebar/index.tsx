import React from 'react';
import { Link } from 'react-router-dom';

import './index.css'


export const Sidebar = ({ isOpen, closeSidebar }:any) => {
    const userDetails:any=sessionStorage.getItem('userDetails');
    const {profilePic,email,role,username}=JSON.parse(userDetails)
    const profileUrl=profilePic ? profilePic : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd5avdba8EiOZH8lmV3XshrXx7dKRZvhx-A&s"
    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            
            <img className='profile-img' alt="profile" src={profileUrl}/>
            {/* <ul>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
                <li>
                    <Link to="/folders">Folders</Link>
                </li>
                <li>
                    <Link to="/user-management">User Management</Link>
                </li>
            </ul> */}
            <div className='mt-5 text-center'>
                <h5>{username}</h5>
                <p className='email-text'>{email}</p>
            </div>
            <button onClick={closeSidebar} className="close-btn">✖</button>
        </div>
    );
};


