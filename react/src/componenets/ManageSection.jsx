import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SalEmpCard from './SalEmpCard';

const ManageSection = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);

    const allEmployees = async () => {
        try {
            const response = await axios.get("http://localhost:3000/employees");
            setEmployees(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching employees", error);
            setLoading(false);
        }
    };

    const getManagees = async () => {
        try {
            const response = await axios.post("http://localhost:3000/login", {
                username: localStorage.getItem('username'),
                password: localStorage.getItem('password')
            });

            const manages = response.data[0].manages;
            const employeePromises = manages.map(async (employee) => {
                const empResponse = await axios.get("http://localhost:3000/manages", { params: { employee_id: employee } });
                return empResponse.data[0];
            });

            const employeeArray = await Promise.all(employeePromises);
            setEmployees(employeeArray);
        } catch (error) {
            console.error("Error fetching managees:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const jobRole = localStorage.getItem('job_role');
        if (jobRole === 'Product Manager') {
            getManagees();
        } else if (jobRole === 'HR Specialist') {
            allEmployees();
        }
    }, []);

    return (
        <div style={{ margin: 20 }}>
            <h4>{localStorage.getItem('job_role') === 'Product Manager' ? 'Direct Reports' : ''}</h4>
            <h4>{localStorage.getItem('job_role') === 'HR Specialist' ? 'All Employees' : ''}</h4>
            {loading ? (
                <p>Loading...</p>
            ) : (
                employees.map((employee) => (
                    <SalEmpCard key={employee.employee_id} data={employee} />
                ))
            )}
        </div>
    );
};

export default ManageSection;
