import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import RoutineEditModal from './editModal';

export default function Home() {

    const [loadingXI, setLoadingXI] = useState();
    const [successXI, setSuccessXI] = useState();
    const [loadingXII, setLoadingXII] = useState();
    const [successXII, setSuccessXII] = useState();
    const [error, setError] = useState();
    const [routineXI, setRoutineXI] = useState([]);
    const [routineXII, setRoutineXII] = useState([]);

    const generate = (clas) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "Once this process is completed, all the data in the routine will be changed!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#6749c6',
            cancelButtonColor: '#ff4546',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {

                clas === 'XI' ? setLoadingXI(true) : setLoadingXII(true)
                axios.get(`/api/generate_routine/${clas}`).then(res => {
                    if (res.status === 200) {
                        if (clas === 'XI') {
                            setLoadingXI(false)
                            setSuccessXI(res.data.message)
                            fetchRoutineXI()
                        } else {
                            setLoadingXII(false)
                            setSuccessXII(res.data.message)
                            fetchRoutineXII()
                        }
                    } else {
                        clas === 'XI' ? setLoadingXI(false) : setLoadingXII(false)
                        setError(res.data.message)
                    }
                }).catch(err => {
                    clas === 'XI' ? setLoadingXI(false) : setLoadingXII(false)
                    setError(err.response.data.message)
                });
            }
        })
    }

    const fetchRoutineXI = () => {
        setLoadingXI(true)
        axios.get('/api/routines_xi').then(res => {
            if (res.status === 200) {
                setLoadingXI(false)
                setRoutineXI(res.data.routine_xi)
            } else {
                console.log(res.data.message)
            }
        }).catch(err => {
            console.log(err.response.data.message)
        });
    }

    const fetchRoutineXII = () => {
        setLoadingXII(true)
        axios.get('/api/routines_xii').then(res => {
            if (res.status === 200) {
                setLoadingXII(false)
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
                    <button type='button' onClick={() => generate('XI')} className="btn btn-primary btn-lg">
                        {loadingXI ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> :
                            successXI ? setTimeout(() => setSuccessXI(''), 3000) && successXI :
                                error ? setTimeout(() => setError(''), 3000) && error :
                                    <span><i class="fas fa-bolt fa-xl me-2"></i> Re-Generate</span>
                        }
                    </button>
                </div>

                <div className="card-body table-responsive">
                    <table className="table table-bordere table-striped">
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
                            {loadingXI ? <tr><td colSpan="7" className="text-center"><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></td></tr> :
                                routineXI ? routineXI.map((routine_xi, index) => (
                                    <tr>
                                        <th>{routine_xi.day}</th>
                                        <td>{routine_xi.xi10_30}</td>
                                        <td>{routine_xi.xi11_15}</td>
                                        <td>{routine_xi.xi12_00}</td>
                                        <td>{routine_xi.xi12_45}</td>
                                        <td>{routine_xi.xi01_30}</td>
                                        <td>
                                            <button className="btn btn-secondary btn-sm px-2" data-mdb-toggle="modal" data-mdb-target={'#editroutine' + routine_xi.id + 'XIModal'}><i className="fa fa-edit btn-sm"></i></button>
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
                    <button type='button' onClick={() => generate('XII')} className="btn btn-primary btn-lg">
                        {loadingXII ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> :
                            successXII ? setTimeout(() => setSuccessXII(''), 3000) && successXII :
                                error ? setTimeout(() => setError(''), 3000) && error :
                                    <span><i class="fas fa-bolt fa-xl me-2"></i> Re-Generate</span>
                        }
                    </button>
                </div>

                <div className="card-body table-responsive">
                    <table className="table table-bordere table-striped">
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
                            {loadingXII ? <tr><td colSpan="7" className="text-center"><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></td></tr> :
                                routineXII ? routineXII.map((routine_xii, index) => (
                                    <tr>
                                        <th>{routine_xii.day}</th>
                                        <td>{routine_xii.xii10_30}</td>
                                        <td>{routine_xii.xii11_15}</td>
                                        <td>{routine_xii.xii12_00}</td>
                                        <td>{routine_xii.xii12_45}</td>
                                        <td>{routine_xii.xii01_30}</td>
                                        <td>
                                            <button className="btn btn-secondary btn-sm px-2" data-mdb-toggle="modal" data-mdb-target={'#editroutine' + routine_xii.id + 'XIIModal'}><i className="fa fa-edit btn-sm"></i></button>
                                        </td>

                                        <RoutineEditModal routine={routine_xii} cls={'XII'} />
                                    </tr>
                                )) : <tr><td colSpan="5" className="text-center">No Routine Found</td></tr>
                            }
                        </tbody>
                    </table>

                </div>
            </div>


        </div >
    )
}
