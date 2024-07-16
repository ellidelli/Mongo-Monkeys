import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SalEmpCard from './SalEmpCard';

const ManageSection = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [employeeImages, setEmployeeImages] = useState({});

    // Fetch all employees for HR workers
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

    // Fetch managees for Product Managers
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

    useEffect(() => {
        const fetchEmployeeImages = async () => {
            const newEmployeeImages = {};
            
            for (const employee of employees) {
                const id = employee.employee_id; // Assuming employee_id is a number
                const gender = employee.gender === 'male' ? 'men' : 'women';
                const imageUrl = `http://localhost:3000/proxy/${gender}/${id}.jpg`;

                try {
                    // Fetch the image from the proxy server
                    await axios.get(imageUrl);
                    newEmployeeImages[employee.employee_id] = imageUrl;
                } catch (error) {
                    console.error(`Image not found for employee ${id}: ${error.message}`);
                    newEmployeeImages[employee.employee_id] = '/path/to/fallback-image.jpg'; // Use fallback image
                }
            }

            setEmployeeImages(newEmployeeImages);
        };

        if (employees.length > 0) {
            fetchEmployeeImages();
        }
    }, [employees]);

    const getEmployeeImage = (employee) => {
        return employeeImages[employee.employee_id] || '/path/to/fallback-image.jpg'; // Fallback image if not found
    };

    return (
        <div style={{ margin: 20 }}>
            <h4>{localStorage.getItem('job_role') === 'Product Manager' ? 'Direct Reports' : ''}</h4>
            <h4>{localStorage.getItem('job_role') === 'HR Specialist' ? 'All Employees' : ''}</h4>
            {loading ? (
                <p>Loading...</p>
            ) : (
                employees.map((employee) => (
                    <SalEmpCard key={employee.employee_id} data={employee} image={getEmployeeImage(employee)} />
                ))
            )}
        </div>
    );
};

export default ManageSection;
