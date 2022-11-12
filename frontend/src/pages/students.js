import React from 'react'
import { Link } from 'react-router-dom'

export default function Students() {
    return (
        <div>
            <ul className='breadcrumb'>
                <li className='breadcrumb-item'> <Link>Dashboard</Link> </li>
                <li className='breadcrumb-item'> <Link>Students</Link> </li>
            </ul>

            <div className="col mt-3">
                <div className="card">
                    <div className="card-header">
                        <h4>All Students</h4>
                    </div>

                    <div className="card-body">
                        <table className="table table-">
                            <thead>
                                <tr>
                                    <th>Photo</th>
                                    <th>Student Name</th>
                                    <th>Class</th>
                                    <th>Section</th>
                                    <th>Roll</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><img className='rounded-circle' src="https://via.placeholder.com/50" alt="student" /></td>
                                    <td>John Doe</td>
                                    <td>1</td>
                                    <td>A</td>
                                    <td>1</td>
                                    <td>
                                        <button className="btn btn-primary btn-sm mx-1"><i class="fas fa-edit"></i></button>
                                        <button className="btn btn-danger btn-sm mx-1"><i class="fas fa-trash-alt"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td><img className='rounded-circle' src="https://via.placeholder.com/50" alt="student" /></td>
                                    <td>John Doe</td>
                                    <td>1</td>
                                    <td>A</td>
                                    <td>1</td>
                                    <td>
                                        <button className="btn btn-primary btn-sm mx-1"><i class="fas fa-edit"></i></button>
                                        <button className="btn btn-danger btn-sm mx-1"><i class="fas fa-trash-alt"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}
