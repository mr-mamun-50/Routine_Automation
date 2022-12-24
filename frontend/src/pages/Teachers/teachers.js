import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';

export default function Teachers() {

    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const [teachers, setTeachers] = useState([]);

    const fetchTeacher = () => {

        setLoading(true)
        setError('')

        axios.get('/api/teachers').then(res => {

            if (res.status === 200) {
                setLoading(false)
                setTeachers(res.data.teachers)
            } else {
                setLoading(false)
                setError(res.data.message)
            }

        }).catch(err => {
            setError(err.response.data.message)
        });
    }

    const deleteTeacher = (e, id) => {
        const dataTarget = e.currentTarget;

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#6749c6',
            cancelButtonColor: '#ff4546',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/teachers/${id}`).then(res => {
                    if (res.status === 200) {
                        Swal.fire(
                            'Deleted!',
                            res.data.message,
                            'success'
                        )
                        dataTarget.parentElement.parentElement.remove();
                    } else {
                        setError(res.data.message)
                    }

                }).catch(err => {
                    setError(err.response.data.message)
                });
            }
        })
    }

    useEffect(() => {
        fetchTeacher()
    }, [])

    return (
        <div>
            <ul className='breadcrumb'>
                <li className='breadcrumb-item'> <Link>Dashboard</Link> </li>
                <li className='breadcrumb-item'> <Link>Teachers</Link> </li>
            </ul>

            <div className="col my-3">
                <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center my-2">
                        <h4>All Teachers</h4>
                        <span><Link to="/teachers/create" className="btn btn-primary btn-sm"><i className="fas fa-plus me-1"></i> Add Teacher</Link></span>
                    </div>

                    <div className="card-body table-responsive">
                        <table className="table table-">
                            <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>Photo</th>
                                    <th>Name</th>
                                    <th>Designation</th>
                                    <th>Department</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? <tr><td colSpan="8" className="text-center"><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></td></tr> :
                                    teachers ? teachers.map((teacher, index) => (
                                        <tr>
                                            <td> {++index} </td>
                                            <td> <img className='rounded' src={teacher.photo} alt="" width="60" /> </td>
                                            <td>{teacher.name}</td>
                                            <td>{teacher.designation}</td>
                                            <td>{teacher.department}</td>
                                            <td><a href={'mailto:' + teacher.email} target='blank'>{teacher.email}</a></td>
                                            <td>
                                                {teacher.is_active ? <span className="badge badge-success">Active</span> : <span className="badge badge-danger">Inactive</span>}
                                            </td>
                                            <td><div className='d-flex'>
                                                <Link to={`/teachers/${teacher.id}/edit`} className="btn btn-primary btn-sm mx-1 px-2 mb-1"><i className="fas fa-edit"></i></Link>
                                                <button className="btn btn-danger btn-sm mx-1 px-2 mb-1" onClick={(e) => deleteTeacher(e, teacher.id)}><i className="fas fa-trash-alt"></i></button>
                                            </div></td>
                                        </tr>
                                    )) :
                                        error ? <tr><td colSpan="8" className="text-center">{error}</td></tr> :
                                            <tr><td colSpan="8" className="text-center">No data found</td></tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
