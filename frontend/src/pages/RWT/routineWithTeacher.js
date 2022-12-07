import React from 'react'
import { Link } from 'react-router-dom'

export default function RoutineWithTeacher() {
    return (
        <div>
            <ul className='breadcrumb'>
                <li className='breadcrumb-item'> <Link>Dashboard</Link> </li>
                <li className='breadcrumb-item'> <Link>RWT</Link> </li>
            </ul>

            <div className="col my-3">
                <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center my-2">
                        <h4>All Teachers</h4>
                        <span><Link to="" className="btn btn-secondary btn-sm"><i className="fas fa-plus me-1"></i> Add RWT</Link></span>
                    </div>

                    <div className="card-body table-responsive">
                        <table className="table table-">
                            <thead>
                                <tr>
                                    <th>SL</th>
                                    <th>Name</th>
                                    <th>Designation</th>
                                    <th>Department</th>
                                    <th>Subjects</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Afran Sarkar</td>
                                    <td>Lecturer</td>
                                    <td>Science</td>
                                    <td>Chemistry I, Chemistry II</td>
                                    <td><div className='d-flex'>
                                        <button className="btn btn-primary btn-sm mx-1 px-2 mb-1" data-mdb-toggle="modal" data-mdb-target=""><i className="fas fa-edit"></i></button>
                                        <button className="btn btn-danger btn-sm mx-1 px-2 mb-1" onClick=""><i className="fas fa-trash-alt"></i></button>
                                    </div></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
