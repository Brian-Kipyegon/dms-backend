import React, { useState, useEffect } from 'react';
import { useAuth } from '../context-stores/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function UserPanel() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user.role === "admin") {
            navigate("/adminpanel")
        }
    })

    return (
        <div>
            <h1>User Panel</h1>
            <button onClick={logout}>Logout</button>
            {user && <p>Logged in as {user.email}</p>}
        </div>
    )
}
