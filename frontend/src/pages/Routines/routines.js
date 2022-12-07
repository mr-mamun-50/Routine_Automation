import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import RoutineEditModal from './editModal';

export default function Home() {

    const [loading, setLoading] = useState();
    const [success, setSuccess] = useState();
    const [error, setError] = useState();
    const [routineXI, setRoutineXI] = useState([]);
    const [routineXII, setRoutineXII] = useState([]);

    const fetchRoutineXI = () => {
        setLoading(true)
        axios.get('/api/routines_xi').then(res => {
            if (res.status === 200) {
                setLoading(false)
                setRoutineXI(res.data.routine_xi)
            } else {
                console.log(res.data.message)
            }
        }).catch(err => {
            console.log(err.response.data.message)
        });
    }

    const fetchRoutineXII = () => {
        setLoading(true)
        axios.get('/api/routines_xii').then(res => {
            if (res.status === 200) {
                setLoading(false)
                setRoutineXII(res.data.routine_xii)
            } else {
                console.log(res.data.message)
            }
        }).catch(err => {
            console.log(err.response.data.message)
        });
    }

    React.useEffect(() => {
        fetchRoutineXI();
        fetchRoutineXII();
    }, []);

    return (
        <div>
            <ul className='breadcrumb'>
                <li className='breadcrumb-item'> <Link>Dashboard</Link> </li>
                <li className='breadcrumb-item'> <Link>Routines</Link> </li>
            </ul>


            <div className="card">
                <div className="card-header">
                    <h4 className='m-0'>Class: XI</h4>
                </div>

                <div className="card-body">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Day</th>
                                <th>10:30</th>
                                <th>11:15</th>
                                <th>12:00</th>
                                <th>12:45</th>
                                <th>01:30</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? <tr><td colSpan="5" className="text-center"><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></td></tr> :
                                routineXI ? routineXI.map((routine_xi, index) => (
                                    <tr>
                                        <td>{routine_xi.day}</td>
                                        <td>{routine_xi.xi10_30}</td>
                                        <td>{routine_xi.xi11_15}</td>
                                        <td>{routine_xi.xi12_00}</td>
                                        <td>{routine_xi.xi12_45}</td>
                                        <td>{routine_xi.xi01_30}</td>
                                        <td>
                                            <button className="btn btn-primary btn-sm" data-mdb-toggle="modal" data-mdb-target={'#editroutine' + routine_xi.id + 'XIModal'}><i className="fa fa-edit btn-sm"></i></button>
                                        </td>

                                        <RoutineEditModal routine={routine_xi} cls={'XI'} />
                                    </tr>
                                )) : <tr><td colSpan="5" className="text-center">No Routine Found</td></tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>


            <div className="card my-4">
                <div className="card-header">
                    <h4 className='m-0'>Class: XII</h4>
                </div>

                <div className="card-body">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Day</th>
                                <th>10:30</th>
                                <th>11:15</th>
                                <th>12:00</th>
                                <th>12:45</th>
                                <th>01:30</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? <tr><td colSpan="5" className="text-center"><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></td></tr> :
                                routineXII ? routineXII.map((routine_xii, index) => (
                                    <tr>
                                        <td>{routine_xii.day}</td>
                                        <td>{routine_xii.xii10_30}</td>
                                        <td>{routine_xii.xii11_15}</td>
                                        <td>{routine_xii.xii12_00}</td>
                                        <td>{routine_xii.xii12_45}</td>
                                        <td>{routine_xii.xii01_30}</td>
                                        <td>
                                            <button className="btn btn-primary btn-sm" data-mdb-toggle="modal" data-mdb-target={'#editroutine' + routine_xii.id + 'XIIModal'}><i className="fa fa-edit btn-sm"></i></button>
                                        </td>

                                        <RoutineEditModal routine={routine_xii} cls={'XII'} />
                                    </tr>
                                )) : <tr><td colSpan="5" className="text-center">No Routine Found</td></tr>
                            }
                        </tbody>
                    </table>

                </div>
            </div>


        </div>
    )
}
