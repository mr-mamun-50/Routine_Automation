import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CourseEditModal from './editModal';
import Swal from 'sweetalert2';

export default function Courses() {

    const [loading, setLoading] = useState();
    const [success, setSuccess] = useState();
    const [error, setError] = useState();
    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);

    const [name, setName] = useState('');
    const [code, setCode] = useState();
    const [teacher_id, setTeacherId] = useState();
    const [clas, setClas] = useState();

    const fetchTeacher = () => {
        axios.get('/api/teachers').then(res => {
            if (res.status === 200) {
                setTeachers(res.data.teachers)
            } else {
                console.log(res.data.message)
            }
        }).catch(err => {
            console.log(err.response.data.message)
        });
    }

    const fetchCourses = () => {
        setLoading(true)
        axios.get('/api/courses').then(res => {
            if (res.status === 200) {
                setLoading(false)
                setCourses(res.data.courses)
            } else {
                console.log(res.data.message)
            }
        }).catch(err => {
            console.log(err.response.data.message)
        });
    }

    const createCourse = (e) => {
        e.preventDefault();

        setLoading(true)
        setError('')
        let course = { name, code, teacher_id, clas }

        axios.post('/api/courses', course).then(res => {
            if (res.status === 200) {
                setLoading(false)
                setSuccess(res.data.message)
                fetchCourses()

                setName('')
                setCode('')
                setTeacherId('')
            } else {
                setLoading(false)
                setError(res.data.message)
            }
        }).catch(err => {
            setLoading(false)
            setError(err.response.data.message)
        });
    }

    const deleteCourse = (e, id) => {
        const dataTarget = e.currentTarget;

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#332D2D',
            cancelButtonColor: '#9FA6B2',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/api/courses/${id}`).then(res => {
                    if (res.status === 200) {
                        Swal.fire(
                            'Deleted!',
                            res.data.message,
                            'success'
                        )
                        dataTarget.parentElement.parentElement.remove();
                    } else {
                        console.log(res.data.message)
                    }
                }).catch(err => {
                    console.log(err.response.data.message)
                });
            }
        })
    }

    useEffect(() => {
        fetchTeacher()
        fetchCourses()
    }, []);

    console.log(courses)

    return (
        <div>
            <ul className='breadcrumb'>
                <li className='breadcrumb-item'> <Link>Dashboard</Link> </li>
                <li className='breadcrumb-item'> <Link>Courses</Link> </li>
            </ul>


            <div className="card-header p-3 rounded-5 d-flex justify-content-between align-items-center my-3">
                <h4 className='m-0'>Courses</h4>
                <button className="btn btn-secondary btn-sm" data-mdb-toggle="modal" data-mdb-target="#createCourseModal">
                    <i className="fas fa-plus me-1"></i> Create</button>
            </div>

            <div className="card-body row bg-dark mt-0">
                <div className="col-md-12 col-lg-6">
                    <div className="card mb-3">
                        <div className="card-header">
                            <h5 className='my-2'>Class: XI</h5>
                        </div>
                        <div className="card-body table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Code</th>
                                        <th>Teacher</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? <tr><td colSpan="5" className="text-center"><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></td></tr> :
                                        courses ? courses.map((course, index) => (
                                            course.clas === 'XI' ?
                                                <tr>
                                                    <td>{course.name}</td>
                                                    <td>{course.code}</td>
                                                    <td>{teachers.map((teacher) => (
                                                        teacher.id === course.teacher_id ? <p>{teacher.name} <br />
                                                            <span className='text-muted'>{teacher.designation + ', ' + teacher.department}</span></p> : ''
                                                    ))}</td>
                                                    <td><div className='d-flex'>
                                                        <button className="btn btn-primary btn-sm mx-1 px-2 mb-1" data-mdb-toggle="modal" data-mdb-target={'#editCourse' + course.id + 'Modal'}><i className="fas fa-edit"></i></button>
                                                        <button className="btn btn-danger btn-sm mx-1 px-2 mb-1" onClick={(e) => deleteCourse(e, course.id)}><i className="fas fa-trash-alt"></i></button>
                                                    </div></td>

                                                    <CourseEditModal course={course} teachers={teachers} />
                                                </tr> : ''
                                        )) :
                                            <tr><td colSpan="5" className="text-center">No data found</td></tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 col-lg-6 mt-md-3 mt-lg-0">
                    <div className="card mb-3">
                        <div className="card-header">
                            <h5 className='my-2'>Class: XII</h5>
                        </div>
                        <div className="card-body table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Code</th>
                                        <th>Teacher</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? <tr><td colSpan="5" className="text-center"><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></td></tr> :
                                        courses ? courses.map((course, index) => (
                                            course.clas === 'XII' ?
                                                <tr>
                                                    <td>{course.name}</td>
                                                    <td>{course.code}</td>
                                                    <td>{teachers.map((teacher) => (
                                                        teacher.id === course.teacher_id ? <p>{teacher.name} <br />
                                                            <span className='text-muted'>{teacher.designation + ', ' + teacher.department}</span></p> : ''
                                                    ))}</td>
                                                    <td><div className='d-flex'>
                                                        <button className="btn btn-primary btn-sm mx-1 px-2 mb-1" data-mdb-toggle="modal" data-mdb-target={'#editCourse' + course.id + 'Modal'}><i className="fas fa-edit"></i></button>
                                                        <button className="btn btn-danger btn-sm mx-1 px-2 mb-1" onClick={(e) => deleteCourse(e, course.id)}><i className="fas fa-trash-alt"></i></button>
                                                    </div></td>

                                                    <CourseEditModal course={course} teachers={teachers} />
                                                </tr> : ''
                                        )) :
                                            <tr><td colSpan="5" className="text-center">No data found</td></tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>


            {/* Modal for create course */}
            <div className="modal fade" id="createCourseModal" tabIndex="-1" aria-labelledby="createCourseModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="createCourseModalLabel">Create Course</h5>
                            <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <form onSubmit={createCourse}>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Course Name</label>
                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Course Code</label>
                                    <input type="number" className="form-control" value={code} onChange={(e) => setCode(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Assign Teacher</label>
                                    <select className="form-select bg-dark text-white-50" value={teacher_id} onChange={(e) => setTeacherId(e.target.value)}>
                                        <option selected disabled>Select Teacher</option>
                                        {teachers && teachers.map((teacher) => (
                                            <option value={teacher.id}>{teacher.name + ', ' + teacher.designation + ', ' + teacher.department}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='mb-3'>
                                    <label className="form-label">Select Class</label>
                                    <select className="form-select bg-dark text-white-50" value={clas} onChange={(e) => setClas(e.target.value)}>
                                        <option selected disabled>Select Class</option>
                                        <option value={"XI"}>XI</option>
                                        <option value={"XII"}>XII</option>
                                    </select>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary btn-block">
                                    {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> :
                                        success ? setTimeout(() => setSuccess(''), 3000) && success :
                                            error ? setTimeout(() => setError(''), 3000) && error :
                                                <span><i className="fas fa-plus me-1"></i> Create</span>
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}
