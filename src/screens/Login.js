import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context-stores/AuthContext';

const axios = require('axios');

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { user, dispatch } = useAuth();

    useEffect(() => {
        if (user) {
            if (user.role === "claims") {
                navigate("/userpanel");
            } else {
                navigate("/adminpanel");
            }
        }
    })

    const login = (e) => {
        e.preventDefault();
        axios.post("/login", {
            email: email,
            password: password
        }).then((response) => {
            let user = response.data.user;
            localStorage.setItem("access_token", response.data.access_token);
            dispatch({ type: 'ADD_USER', user: user });
            console.log(user.role === "admin");
            if (user.role === "admin") {
                navigate("/adminpanel");
            } else {
                navigate("/userpanel");
            }
        }).catch(err => {
            setError("Check password or email");
            console.log(err.message)
        });
    }

    return (
        <div>
            <h1>Login</h1>
            {error && <div className="error">{error}</div>}
            <div className='loginForm'>
                <form className='form' onSubmit={login} >
                    <input type="text" placeholder='Enter your email' value={email} onChange={(e) => { setEmail(e.target.value) }} required />
                    <input type="password" placeholder='Enter password' value={password} onChange={(e) => { setPassword(e.target.value) }} required />
                    <button type="submit" className='btn' >Login</button>
                </form>
            </div>
            {/* {
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    validationSchema={Yup.object({
                        email: Yup.string().email().required(),
                        password: Yup.string().min(5, "Requires at least 5 characters").required()
                    })}
                    onSubmit={(values, { setSubmitting, resetForm }) => {

                    }}
                >

                </Formik>
            } */}``
        </div>
    )
}
