import axios from 'axios';
import React, { useState } from 'react'

export default function RoutineEditModal({ routine, cls }) {

    const [loading, setLoading] = useState();
    const [success, setSuccess] = useState();
    const [error, setError] = useState();
    const id = routine.id;

    const [xi10_30, setXI10_30] = useState(routine.xi10_30);
    const [xi11_15, setXI11_15] = useState(routine.xi11_15);
    const [xi12_00, setXI12_00] = useState(routine.xi12_00);
    const [xi12_45, setXI12_45] = useState(routine.xi12_45);
    const [xi01_30, setXI01_30] = useState(routine.xi01_30);

    const [xii10_30, setXII10_30] = useState(routine.xii10_30);
    const [xii11_15, setXII11_15] = useState(routine.xii11_15);
    const [xii12_00, setXII12_00] = useState(routine.xii12_00);
    const [xii12_45, setXII12_45] = useState(routine.xii12_45);
    const [xii01_30, setXII01_30] = useState(routine.xii01_30);


    const updateroutine = (e) => {
        e.preventDefault();
        setLoading(true)
        setError('')
        let routine

        if (cls === 'XI')
            routine = { xi10_30, xi11_15, xi12_00, xi12_45, xi01_30 };
        else
            routine = { xii10_30, xii11_15, xii12_00, xii12_45, xii01_30 };

        axios.put(`/api/routines/${id}/${cls}`, routine).then(res => {
            if (res.status === 200) {
                setLoading(false)
                setSuccess(res.data.message)

                window.location.reload();
            } else {
                setLoading(false)
                setError(res.data.message)
            }
        }).catch(err => {
            setLoading(false)
            setError(err.response.data.message)
        });
    }

    return (
        <div className="modal fade" id={'editroutine' + routine.id + cls + 'Modal'} tabIndex="-1" aria-labelledby="createroutineModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="createroutineModalLabel">{cls + ": " + routine.day}</h5>
                        <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <form onSubmit={updateroutine}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">10:30</label>
                                <input type="text" className="form-control" value={cls === "XI" ? xi10_30 : xii10_30} onChange={(e) => cls === "XI" ? setXI10_30(e.target.value) : setXII10_30(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">11:15</label>
                                <input type="text" className="form-control" value={cls === "XI" ? xi11_15 : xii11_15} onChange={(e) => cls === "XI" ? setXI11_15(e.target.value) : setXII11_15(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">12:00</label>
                                <input type="text" className="form-control" value={cls === "XI" ? xi12_00 : xii12_00} onChange={(e) => cls === "XI" ? setXI12_00(e.target.value) : setXII12_00(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">12:45</label>
                                <input type="text" className="form-control" value={cls === "XI" ? xi12_45 : xii12_45} onChange={(e) => cls === "XI" ? setXI12_45(e.target.value) : setXII12_45(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">1:30</label>
                                <input type="text" className="form-control" value={cls === "XI" ? xi01_30 : xii01_30} onChange={(e) => cls === "XI" ? setXI01_30(e.target.value) : setXII01_30(e.target.value)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary btn-block">
                                {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> :
                                    success ? setTimeout(() => setSuccess(''), 3000) && success :
                                        error ? setTimeout(() => setError(''), 3000) && error :
                                            <span><i className="fas fa-plus me-1"></i> Update</span>
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
