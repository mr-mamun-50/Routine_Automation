import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SideNav() {
    return (
        <nav id="sidebarMenu" className="collapse d-lg-block sidebar shadow-lg">
            <div className="position-sticky">
                <div className="list-group list-group-flush mx- mt-5">
                    <NavLink to="/">
                        <span className="list-group-item list-group-item-action py-2">
                            <i className="fas fa-calendar-alt me-3"></i> <span>Routine</span>
                        </span>
                    </NavLink>
                    <NavLink to="/courses">
                        <span className="list-group-item list-group-item-action py-2">
                            <i className="fas fa-book-open me-3"></i> <span>Subjects</span>
                        </span>
                    </NavLink>
                    <NavLink to="/teachers">
                        <span className="list-group-item list-group-item-action py-2">
                            <i className="fas fa-chalkboard-teacher me-3"></i><span>Teachers</span>
                        </span>
                    </NavLink>
                    {/* <NavLink to="/students">
                        <span className="list-group-item list-group-item-action py-2">
                            <i className="fas fa-users me-3"></i>Students
                        </span>
                    </NavLink> */}
                </div>
            </div>
        </nav>
    )
}
