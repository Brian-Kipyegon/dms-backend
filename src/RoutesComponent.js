import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context-stores/AuthContext';
import Login from './screens/Login';
import Adminpanel from './screens/AdminPanel';
import Userpanel from './screens/UserPanel';

export default function RoutesComponent() {
    const { user } = useAuth();

    return (
        <>
            <Routes>
                {!user &&
                    <>
                        <Route exact path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                    </>
                }
                {
                    user &&
                    <>
                        <Route path="/userpanel" element={<Userpanel />} />
                        <Route path="/adminpanel" element={<Adminpanel />} />
                    </>
                }
                <Route path="*" element={<Navigate to={user ? "/userpanel" : "/"} />} />
            </Routes>
        </>
    )
}
