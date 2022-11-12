import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/images/TECH_CLOUD_Icon.png'
import Swal from 'sweetalert2';

export default function Navbar() {

    const [error, setError] = useState()
    // const [success, setSuccess] = useState("")
    // const [loading, setLoading] = useState()
    const navigate = useNavigate();
    let AuthBtn = false;

    if (localStorage.getItem('auth_token')) {
        AuthBtn = true;
    }

    const handleLogOut = () => {
        setError('')

        Swal.fire({
            title: 'Are you sure?',
            text: "You will be redirect to login!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#332D2D',
            cancelButtonColor: '#9FA6B2',
            confirmButtonText: 'Yes, logout!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('/api/logout').then(res => {
                    if (res.status === 200) {
                        localStorage.removeItem('auth_token')
                        localStorage.removeItem('auth_user_name')
                        localStorage.removeItem('auth_user_email')

                        navigate('/login')
                    } else {
                        setError(res.data.message)
                    }
                }).catch(err => {
                    setError(err.response.data.message)
                });
            }
        })
    }


    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">

            <div className="container-fluid">

                <button
                    className="navbar-toggler"
                    type="button"
                    data-mdb-toggle="collapse"
                    data-mdb-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <i className="fas fa-bars"></i>
                </button>


                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                    <Link className="navbar-brand mt-2 mt-lg-0" to={'/'}>
                        <img src={logo} alt='logo' style={{ height: '40px' }} />
                    </Link>

                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" href="#">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="#">Team</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="#">Projects</Link>
                        </li>
                    </ul>

                </div>



                <div className="d-flex align-items-center">
                    {!AuthBtn ?
                        <>
                            <Link to='/register' className='btn btn-secondary btn-rounded me-2'>Register</Link>
                            <Link to='/login' className='btn btn-primary btn-rounded me-2'>Login</Link>
                        </> : <>
                            <span className='me-3'><i className="fas fa-user-circle fa-lg"></i> {localStorage.getItem('auth_user_name')}</span>
                            <button type='button' onClick={handleLogOut} className='btn btn-secondary btn-rounded'>
                                {error ? setTimeout(() => { setError(""); }, 3000) && error :
                                    <>Logout <i className="fas fa-sign-out-alt"></i></>}
                            </button>
                        </>
                    }
                </div>

            </div>

        </nav >

    )
}
