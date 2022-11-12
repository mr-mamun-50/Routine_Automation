import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function TeacherEdit() {
    const { id } = useParams();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [success, setSuccess] = React.useState('');
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [designation, setDesignation] = useState('');
    const [department, setDepartment] = useState('');
    const [email, setEmail] = useState('');
    const [photo, setPhoto] = useState('');
    const [is_active, setActive] = useState(0);

    const fetchTeacher = () => {

        setLoading(true)
        setError('')

        axios.get(`/api/teachers/${id}/edit`).then(res => {

            if (res.status === 200) {
                setLoading(false)
                setName(res.data.teacher.name)
                setDesignation(res.data.teacher.designation)
                setDepartment(res.data.teacher.department)
                setEmail(res.data.teacher.email)
                setActive(res.data.teacher.is_active)
            } else {
                setLoading(false)
                setError(res.data.message)
            }
        }).catch(err => {
            setLoading(false)
            setError(err.response.data.message)
        });
    }

    const updateTeacher = (e) => {
        e.preventDefault()

        let formData = new FormData()
        formData.append('name', name)
        formData.append('designation', designation)
        formData.append('department', department)
        formData.append('email', email)
        formData.append('photo', photo)
        formData.append('is_active', is_active)

        setLoading(true)
        setError('')

        axios.post(`/api/teachers/${id}`, formData).then(res => {

            if (res.status === 200) {
                setLoading(false)
                setSuccess(res.data.message)
                navigate('/teachers')
            } else {
                setLoading(false)
                setError(res.data.message)
            }
        }).catch(err => {
            setLoading(false)
            setError(err.response.data.message)
        });
    }

    React.useEffect(() => {
        fetchTeacher()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <ul className='breadcrumb'>
                <li className='breadcrumb-item'> <Link>Dashboard</Link> </li>
                <li className='breadcrumb-item'> <Link to='/teachers'>Teachers</Link> </li>
                <li className='breadcrumb-item'> <Link>Edit</Link> </li>
            </ul>

            <div className="col mt-3">
                <div className="card col-12 col-lg-10">
                    <div className="card-header d-flex justify-content-between align-items-center my-2">
                        <h4>{name}</h4>
                        <span><Link to="/teachers" className="btn btn-secondary btn-sm"><i className="fas fa-arrow-left"></i> Back</Link></span>
                    </div>

                    <div className="card-body">
                        <form onSubmit={updateTeacher}>
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
                                <input type="checkbox" id="is_active" value={is_active} onChange={(e) => setActive(!is_active)} checked={is_active} /> Active
                            </label>

                            <div className="my-3">
                                <button type="submit" className="btn btn-primary btn-block">
                                    {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> :
                                        success ? setTimeout(() => setSuccess(''), 30000) && success :
                                            error ? setTimeout(() => setError(''), 30000) && error :
                                                <span><i class="far fa-check-circle me-1"></i> Update Teacher</span>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
