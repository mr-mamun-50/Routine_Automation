import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SideNav() {
    return (
        <nav id="sidebarMenu" className="collapse d-lg-block sidebar shadow-lg">
            <div className="position-sticky">
                <div className="list-group list-group-flush mx-3 mt-4">
                    <NavLink to="/">
                        <span className="list-group-item list-group-item-action py-2">
                            <i className="fas fa-calendar-alt me-3"></i> Routine
                        </span>
                    </NavLink>
                    <NavLink to="/courses">
                        <span className="list-group-item list-group-item-action py-2">
                            <i className="fas fa-book-open me-3"></i> Courses
                        </span>
                    </NavLink>
                    <NavLink to="/teachers">
                        <span className="list-group-item list-group-item-action py-2">
                            <i className="fas fa-chalkboard-teacher me-3"></i>Teachers
                        </span>
                    </NavLink>
                    <NavLink to="/students">
                        <span className="list-group-item list-group-item-action py-2">
                            <i className="fas fa-users me-3"></i>Students
                        </span>
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}
