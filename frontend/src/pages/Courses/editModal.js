import axios from 'axios';
import React, { useState } from 'react'

export default function CourseEditModal({ course, teachers }) {

    const [loading, setLoading] = useState();
    const [success, setSuccess] = useState();
    const [error, setError] = useState();
    const id = course.id;

    const [name, setName] = useState(course.name);
    const [code, setCode] = useState(course.code);
    const [teacher_id, setTeacherId] = useState(course.teacher_id);

    const updateCourse = (e) => {
        e.preventDefault();
        setLoading(true)
        setError('')
        let course = { name, code, teacher_id }

        axios.put(`/api/courses/${id}`, course).then(res => {
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
        <div className="modal fade" id={'editCourse' + course.id + 'Modal'} tabIndex="-1" aria-labelledby="createCourseModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="createCourseModalLabel">{course.name}</h5>
                        <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <form onSubmit={updateCourse}>
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
                                <select className="form-select" value={teacher_id} onChange={(e) => setTeacherId(e.target.value)}>
                                    {teachers && teachers.map((teacher) => (
                                        <option value={teacher.id}>{teacher.name + ', ' + teacher.designation + ', ' + teacher.department}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary btn-block">
                                {loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> :
                                    success ? setTimeout(() => setSuccess(''), 3000) && success :
                                        error ? setTimeout(() => setError(''), 3000) && error :
                                            <span><i class="far fa-check-circle me-1"></i> Update</span>
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
