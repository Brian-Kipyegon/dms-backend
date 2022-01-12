import React, { useEffect, useState } from 'react';
import { useAuth } from '../context-stores/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/admin.css'

export default function AdminPanel() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    const [empId, setEmpId] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (user.role === "claims") {
            navigate("/userpanel")
        }
    }, [])

    useEffect(() => {
        axios.get('/employees/1')
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const handleModal = () => {
        setShowModal(!showModal);
    }

    const registerEmployee = (e) => {
        e.preventDefault();
        axios.post("/newemp", {
            email: email,
            empName: name,
            department: department,
            is_head: false,
            empId: empId
        }).then((response) => {
            console.log(response.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="adminContainer">
            <nav className='navbar'>
                <div className='navLeft'>
                    <h1 style={{ color: '#fff', }}>Admin Panel</h1>
                </div>

                <div className='navRight'>
                    {user && <p className='email'> User: {user.email}</p>}
                    {user && <button className='logoutBtn' onClick={logout}>signout</button>}
                </div>
            </nav>

            <div className='addBtn'>
                <button className='registerBtn' onClick={handleModal}>Register Employee</button>
            </div>

            {
                showModal &&
                <div className='modal'>
                    <button className='btn' onClick={handleModal}>Close</button>
                    <div className="loginContainer">
                        <div className='loginForm'>

                            <form className='form' onSubmit={registerEmployee}>
                                <input type="text" placeholder='Enter employee name' value={name} onChange={(e) => { setName(e.target.value) }} required />
                                <input type="email" placeholder='Enter your employee email address' value={email} onChange={(e) => { setEmail(e.target.value) }} required />
                                <input type="text" placeholder='Enter employee department' value={department} onChange={(e) => { setDepartment(e.target.value) }} required />
                                <input type="text" placeholder='Enter employee id' value={empId} onChange={(e) => { setEmpId(e.target.value) }} required />
                                <button type="submit" className='btn' >submit</button>
                            </form>

                        </div>
                    </div>
                </div>
            }

            {/**the table to display users */}
            <div className="userTable">
                <table className="table">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>email</td>
                            <td>Department</td>
                            <td>Employee id</td>
                            <td>Status</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => {
                                return (
                                    <tr key={user.id}>
                                        <td>{user.full_name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.department}</td>
                                        <td>{user.emp_id}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}
