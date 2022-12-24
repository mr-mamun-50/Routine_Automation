import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function TeacherCreate() {

    const [name, setName] = useState('')
    const [designation, setDesignation] = useState('')
    const [department, setDepartment] = useState('')
    const [email, setEmail] = useState('')
    const [photo, setPhoto] = useState('')
    const [is_active, setActive] = useState(0)

    const [error, setError] = useState()
    const [success, setSuccess] = useState("")
    const [loading, setLoading] = useState()

    const addTeacher = (e) => {
        e.preventDefault()

        const teacher = new FormData()
        teacher.append('name', name)
        teacher.append('designation', designation)
        teacher.append('department', department)
        teacher.append('email', email)
        teacher.append('photo', photo)
        teacher.append('is_active', is_active)

        setLoading(true)
        setError('')

        axios.post('/api/teachers', teacher).then(res => {

            if (res.status === 200) {
                setLoading(false)
                setSuccess(res.data.message)

                setName('')
                setDesignation('')
                setDepartment('')
                setEmail('')
                setPhoto('')
                setActive(0)
            } else {
                setLoading(false)
                setError(res.data.message)
            }

        }
        ).catch(err => {
            setLoading(false)
            setError(err.response.data.message)
        });

    }

    return (
        <div>
            <ul className='breadcrumb'>
                <li className='breadcrumb-item'> <Link>Dashboard</Link> </li>
                <li className='breadcrumb-item'> <Link to='/teachers'>Teachers</Link> </li>
                <li className='breadcrumb-item'> <Link>Create</Link> </li>
            </ul>

            <div className="col mt-3">
                <div className="card col-12 col-lg-10">
                    <div className="card-header d-flex justify-content-between align-items-center my-2">
                        <h4>Add Teacher</h4>
                        <span><Link to="/teachers" className="btn btn-dark btn-sm"><i className="fas fa-arrow-left"></i> Back</Link></span>
                    </div>

                    <div className="card-body">
                        <form onSubmit={addTeacher}>
                            <div className="mb-3">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>

                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className="mb-3">
                                        <label htmlFor="designation">Designation</label>
                                        <input type="text" className="form-control" value={designation} onChange={(e) => setDesignation(e.target.value)} />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className="mb-3">
                                        <label htmlFor="department">Department</label>
                                        <input type="text" className="form-control" value={department} onChange={(e) => setDepartment(e.target.value)} />
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className="mb-3">
                                        <label htmlFor="email">Email address</label>
                                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className='col-md-6'>
                                    <div className="mb-3">
                                        <label htmlFor="phone">Photo</label>
                                        <input type="file" className="form-control" onChange={(e) => setPhoto(e.target.files[0])} />
                                    </div>
                                </div>
                            </div>

                            <label htmlFor='is_active'>
                                <input type="checkbox" id="is_active" value={is_active} onChange={(e) => setActive(!is_active)} /> Active
                            </label>

                            <div className="my-3">
                                <button type="submit" className="btn btn-primary btn-block">
                                    {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> :
                                        success ? setTimeout(() => setSuccess(''), 3000) && success :
                                            error ? setTimeout(() => setError(''), 3000) && error :
                                                <span><i className="fas fa-plus me-1"></i> Add Teacher</span>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
