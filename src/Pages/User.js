import React from 'react';
import { useSelector } from 'react-redux';
import '../Assets/Styles/user.css';

export default function User() {

    const { userData } = useSelector((store) => store.user);

    return (
        <div className="user-container">
            <div className='user-data-container'>
                <div>
                    <h3>User name:</h3>
                    <p>{userData.user ? userData.user : "missing information"}</p>
                </div>
                <div>
                    <h3>Phone Number:</h3>
                    <p>{userData.phoneNumber ? userData.phoneNumber : "missing information"}</p>
                </div>
            </div>
        </div>
    )
}
