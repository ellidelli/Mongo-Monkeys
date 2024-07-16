import React from "react";
import './EmployeeCard.css'

const SalEmpCard = (props) => {

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    });

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
                    <p>Salary: {formatter.format(props.data.salary)}</p>
                </div>
            </div>
        </>
    )
}

export default SalEmpCard