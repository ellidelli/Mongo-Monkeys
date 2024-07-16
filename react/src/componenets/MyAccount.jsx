import React from "react";
import ManageSection from "./ManageSection";

const MyAccount = () => {

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    });

    return (
        <>
            <h1>{localStorage.getItem('name')}</h1>
            <h3>📍 {localStorage.getItem('work_location')}</h3>
            <h3>Role: {localStorage.getItem('job_role')}</h3>
            <h3>Salary: {formatter.format(localStorage.getItem('salary'))}</h3>
            <ManageSection></ManageSection>
            
        </>
    )
}

export default MyAccount