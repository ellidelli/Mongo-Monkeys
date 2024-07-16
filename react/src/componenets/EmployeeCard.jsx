import React from "react";
import './EmployeeCard.css'

const EmployeeCard = (props) => {
    return (
        <>
            <div className="employee-card">
                <div className="employee-picture">
                    <img src={props.image} alt="" />
                </div>
                <div className="employee-data">
                    <p>Name: {props.data.name}</p>
                    <p>Phone Number: {('('+props.data.phone.toString().substring(0, 3)+') '+props.data.phone.toString().substring(3, 6)+'-'+props.data.phone.toString().substring(6, 10))}</p>
                    <p>Job: {props.data.job_role}</p>
                </div>
            </div>
        </>
    )
}

export default EmployeeCard