import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import RoutineEditModal from './editModal';

export default function Home() {

    const [loading, setLoading] = useState();
    const [success, setSuccess] = useState();
    const [error, setError] = useState();
    const [routineXI, setRoutineXI] = useState([]);
    const [routineXII, setRoutineXII] = useState([]);

    const generate = (clas) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "Once it process all this routines data are changed!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#332D2D',
            cancelButtonColor: '#9FA6B2',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {

                setLoading(true)
                axios.get(`/api/generate_routine/${clas}`).then(res => {
                    if (res.status === 200) {
                        setLoading(false)
                        setSuccess(res.data.message)
                        if (clas === 'XI')
                            fetchRoutineXI()
                        else
                            fetchRoutineXII()
                    } else {
                        setLoading(false)
                        setError(res.data.message)
                    }
                }).catch(err => {
                    setLoading(false)
                    setError(err.response.data.message)
                });
            }
        })
    }


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
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h4 className='m-0'>Class: XI</h4>
                    <button type='button' onClick={() => generate('XI')} className="btn btn-success btn-lg">
                        {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> :
                            success ? setTimeout(() => setSuccess(''), 3000) && success :
                                error ? setTimeout(() => setError(''), 3000) && error :
                                    <span><i class="fas fa-bolt fa-xl me-2"></i> Re-Generate</span>
                        }
                    </button>
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
                            {loading ? <tr><td colSpan="7" className="text-center"><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></td></tr> :
                                routineXI ? routineXI.map((routine_xi, index) => (
                                    <tr>
                                        <td>{routine_xi.day}</td>
                                        <td>{routine_xi.xi10_30}</td>
                                        <td>{routine_xi.xi11_15}</td>
                                        <td>{routine_xi.xi12_00}</td>
                                        <td>{routine_xi.xi12_45}</td>
                                        <td>{routine_xi.xi01_30}</td>
                                        <td>
                                            <button className="btn btn-primary btn-sm px-2" data-mdb-toggle="modal" data-mdb-target={'#editroutine' + routine_xi.id + 'XIModal'}><i className="fa fa-edit btn-sm"></i></button>
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
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h4 className='m-0'>Class: XII</h4>
                    <button type='button' onClick={() => generate('XII')} className="btn btn-success btn-lg">
                        {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> :
                            success ? setTimeout(() => setSuccess(''), 3000) && success :
                                error ? setTimeout(() => setError(''), 3000) && error :
                                    <span><i class="fas fa-bolt fa-xl me-2"></i> Re-Generate</span>
                        }
                    </button>
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
                            {loading ? <tr><td colSpan="7" className="text-center"><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></td></tr> :
                                routineXII ? routineXII.map((routine_xii, index) => (
                                    <tr>
                                        <td>{routine_xii.day}</td>
                                        <td>{routine_xii.xii10_30}</td>
                                        <td>{routine_xii.xii11_15}</td>
                                        <td>{routine_xii.xii12_00}</td>
                                        <td>{routine_xii.xii12_45}</td>
                                        <td>{routine_xii.xii01_30}</td>
                                        <td>
                                            <button className="btn btn-primary btn-sm px-2" data-mdb-toggle="modal" data-mdb-target={'#editroutine' + routine_xii.id + 'XIIModal'}><i className="fa fa-edit btn-sm"></i></button>
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
