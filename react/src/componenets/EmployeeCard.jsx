import React from "react";
import './EmployeeCard.css'

const EmployeeCard = (props) => {
    return (
        <>
            <div className="employee-card">
                <div ClassName="employee-picture">
                    
                </div>
                <img src={props.image} alt="" />
                <div ClassName="employee-data">
                    <p>Name: {props.data.name}</p>
                    <p>Phone Number: {props.data.phone}</p>
                    <p>Job: {props.data.job_role}</p>
                </div>
            </div>
        </>
    )
}

export default EmployeeCard