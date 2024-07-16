import React, { useEffect, useState } from 'react';
import EmployeeCard from "./EmployeeCard";
import './EmployeeCard.css';
import Monkey from '../assets/MongoMonkey.png';
import axios from 'axios';

const Home = (props) => {
    const [employeeImages, setEmployeeImages] = useState({});

    const HRSpecialist = props.data.filter(employee => employee.job_role === 'HR Specialist');
    const Designer = props.data.filter(employee => employee.job_role === 'Designer');
    const ProductManager = props.data.filter(employee => employee.job_role === 'Product Manager');
    const DataAnalyst = props.data.filter(employee => employee.job_role === 'Data Analyst');
    const SoftwareEngineer = props.data.filter(employee => employee.job_role === 'Software Engineer');

    useEffect(() => {
        const fetchEmployeeImages = async () => {
            const newEmployeeImages = {};

            for (const employee of props.data) {
                const id = employee.employee_id; // Assuming employee_id is a number
                const gender = employee.gender === 'male' ? 'men' : 'women';
                const imageUrl = `http://localhost:3000/proxy/${gender}/${id}.jpg`;

                try {
                    // Fetch the image from the proxy server
                    await axios.get(imageUrl);
                    newEmployeeImages[employee.employee_id] = imageUrl;
                } catch (error) {
                    console.error(`Image not found for employee ${id}: ${error.message}`);
                    newEmployeeImages[employee.employee_id] = Monkey; // Use fallback image
                }
            }

            setEmployeeImages(newEmployeeImages);
        };

        fetchEmployeeImages();
    }, [props.data]);

    const getEmployeeImage = (employee) => {
        return employeeImages[employee.employee_id] || Monkey; // Fallback to default image if not found
    };

    return (
        <>
            <div className="home">
                <img src={Monkey} alt="" />
                <h1>MongoMonkey Employee Directory</h1>
            </div>

            <h3>HR Specialists</h3>
            <div className="employees">
                {HRSpecialist.map((employee) => (
                    <EmployeeCard 
                        key={employee.employee_id} 
                        data={employee} 
                        image={getEmployeeImage(employee)} 
                    />
                ))}
            </div>

            <h3>Product Managers</h3>
            <div className="employees">
                {ProductManager.map((employee) => (
                    <EmployeeCard 
                        key={employee.employee_id} 
                        data={employee} 
                        image={getEmployeeImage(employee)} 
                    />
                ))}
            </div>

            <h3>Software Engineers</h3>
            <div className="employees">
                {SoftwareEngineer.map((employee) => (
                    <EmployeeCard 
                        key={employee.employee_id} 
                        data={employee} 
                        image={getEmployeeImage(employee)} 
                    />
                ))}
            </div>

            <h3>Data Analysts</h3>
            <div className="employees">
                {DataAnalyst.map((employee) => (
                    <EmployeeCard 
                        key={employee.employee_id} 
                        data={employee} 
                        image={getEmployeeImage(employee)} 
                    />
                ))}
            </div>

            <h3>Designers</h3>
            <div className="employees">
                {Designer.map((employee) => (
                    <EmployeeCard 
                        key={employee.employee_id} 
                        data={employee} 
                        image={getEmployeeImage(employee)} 
                    />
                ))}
            </div>
        </>
    );
};

export default Home;
