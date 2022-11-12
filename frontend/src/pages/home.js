import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div>
            <ul className='breadcrumb'>
                <li className='breadcrumb-item'> <Link>Dashboard</Link> </li>
                <li className='breadcrumb-item'> <Link>Routines</Link> </li>
            </ul>

            <div className="row mt-3">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h4>Class: XI</h4>
                        </div>

                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Day</th>
                                        <th>Subject</th>
                                        <th>Teacher</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Monday</td>
                                        <td>English</td>
                                        <td>Mr. John</td>
                                    </tr>
                                    <tr>
                                        <td>Tuesday</td>
                                        <td>Math</td>
                                        <td>Mr. Smith</td>
                                    </tr>
                                    <tr>
                                        <td>Wednesday</td>
                                        <td>Science</td>
                                        <td>Mr. David</td>
                                    </tr>
                                    <tr>
                                        <td>Thursday</td>
                                        <td>History</td>
                                        <td>Mr. John</td>
                                    </tr>
                                    <tr>
                                        <td>Friday</td>
                                        <td>Geography</td>
                                        <td>Mr. Smith</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="text-center">
                                <button className="btn btn-primary mx-1">Edit</button>

                                <button className="btn btn-danger mx-1">Delete</button>

                                <button className="btn btn-success mx-1">Add</button>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h4>Class: XII</h4>
                        </div>

                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Day</th>
                                        <th>Subject</th>
                                        <th>Teacher</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Monday</td>
                                        <td>English</td>
                                        <td>Mr. John</td>
                                    </tr>
                                    <tr>
                                        <td>Tuesday</td>
                                        <td>Math</td>
                                        <td>Mr. Smith</td>
                                    </tr>
                                    <tr>
                                        <td>Wednesday</td>
                                        <td>Science</td>
                                        <td>Mr. David</td>
                                    </tr>
                                    <tr>
                                        <td>Thursday</td>
                                        <td>History</td>
                                        <td>Mr. John</td>
                                    </tr>
                                    <tr>
                                        <td>Friday</td>
                                        <td>Geography</td>
                                        <td>Mr. Smith</td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="text-center">
                                <button className="btn btn-primary mx-1">Edit</button>

                                <button className="btn btn-danger mx-1">Delete</button>

                                <button className="btn btn-success mx-1">Add</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
