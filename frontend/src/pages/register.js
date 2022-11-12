import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/images/TECH_CLOUD_Logo.png'
import { useState } from 'react'
import axios from 'axios'

export default function Register() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirmation, setPasswordConfirmation] = useState('')

    const [error, setError] = useState()
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState()

    const navigate = useNavigate();

    const registerSubmit = (e) => {
        e.preventDefault()

        if (password !== password_confirmation) {
            return setError('Passwords does not match')
        }

        let data = { name, email, password }

        setLoading(true)
        setError('')

        axios.get('/sanctum/csrf-cookie').then(response => {
            axios.post('/api/register', data).then(res => {

                if (res.status === 200) {
                    localStorage.setItem('auth_token', res.data.token)
                    localStorage.setItem('auth_user_name', res.data.user.name)
                    localStorage.setItem('auth_user_email', res.data.user.email)
                    setLoading(false)
                    setSuccess(res.data.message)

                    navigate('/')
                } else {
                    setLoading(false)
                    setError(res.data.message)
                }

            }).catch(err => {
                setLoading(false)
                setError(err.response.data.message)
            });
        });
    }


    return (
        <div className='d-flex align-items-center justify-content-center p-5' style={{ minHeight: '100vh' }} >
            <div className='col-lg-4 col-md-6 col-12'>
                <img src={logo} alt='logo' className='img-fluid d-block mx-auto mb-5' width='220px' />

                <div className='card card-body shadow-lg rounded-7'>
                    <form onSubmit={registerSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" className='form-control' value={name} onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className='mb-3'>
                            <label htmlFor="password2">Confirm Password</label>
                            <input type="password" name="password2" id="password2" className='form-control' value={password_confirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
                        </div>

                        {error && <div className='alert alert-danger py-2'>{error}</div>}

                        <button type="submit" className='btn btn-primary btn-block'>
                            {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> :
                                success ? setTimeout(() => { setSuccess(""); }, 3000) && success : 'Register'}
                        </button>
                    </form>

                    <div className='mt-3'>
                        <p className='text-center mb-0'>Already have an account? <Link to='/login'>Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
