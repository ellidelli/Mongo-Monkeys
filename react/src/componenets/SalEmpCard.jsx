import React from "react";
import './EmployeeCard.css'

const SalEmpCard = (props) => {
    return (
        <>
            <div className="employee-card">
            <div className="employee-picture">
                    <img src={props.image} alt="" />
                </div>
                <div className="employee-data">
                    <p>Name: {props.data.name}</p>
                    <p>Phone Number: {props.data.phone}</p>
                    <p>Job: {props.data.job_role}</p>
                    <p>Salary: {props.data.salary}</p>
                </div>
            </div>
        </>
    )
}

export default SalEmpCard