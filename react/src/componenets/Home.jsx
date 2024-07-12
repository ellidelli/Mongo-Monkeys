import React from "react";
import { useEffect, useState } from 'react'
import EmployeeCard from "./EmployeeCard";
import './EmployeeCard.css'
import Monkey from '../assets/MongoMonkey.png'

const Home = (props) => {
    const [images, setImages] = useState([]);
    useEffect(() => {
        //todo create an image getter
        //https://randomuser.me/api/portraits/men/53.jpg
    })

    const HRSpecialist = props.data.filter(employee => employee.job_role === 'HR Specialist');
    const Designer = props.data.filter(employee => employee.job_role === 'Designer');
    const ProductManager = props.data.filter(employee => employee.job_role === 'Product Manager');
    const DataAnalyst = props.data.filter(employee => employee.job_role === 'Data Analyst');
    const SoftwareEngineer = props.data.filter(employee => employee.job_role === 'Software Engineer');

    return (

        <>
            <div className="home">
                <img src={Monkey} alt="" />
                <h1>MongoMonkey Employee Directory</h1>
            </div>

            <h3>HR</h3>
            <div className="employees">
                {
                    HRSpecialist.map((employee) => (
                        <EmployeeCard key={employee.employee_id} data={employee} />
                    ))
                }
            </div>

            <h3>Product Managers</h3>
            <div className="employees">
                {
                    ProductManager.map((employee) => (
                        <EmployeeCard key={employee.employee_id} data={employee} />
                    ))
                }
            </div>

            <h3>Softtware Engineers</h3>
            <div className="employees">
                {
                    SoftwareEngineer.map((employee) => (
                        <EmployeeCard key={employee.employee_id} data={employee} />
                    ))
                }
            </div>

            <h3>Data Analysts</h3>
            <div className="employees">
                {
                    DataAnalyst.map((employee) => (
                        <EmployeeCard key={employee.employee_id} data={employee} />
                    ))
                }
            </div>

            <h3>Designers</h3>
            <div className="employees">
                {
                    Designer.map((employee) => (
                        <EmployeeCard key={employee.employee_id} data={employee} />
                    ))
                }
            </div>



        </>
    )
}

export default Home