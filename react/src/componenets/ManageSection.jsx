import react from 'react'
import EmployeeCard from './EmployeeCard'
import SalEmpCard from './SalEmpCard'
import {useState, useEffect} from 'react'
import axios from 'axios'

const ManageSection = () => {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    //get all employees for HR workers
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
    //get all managees
    async function getManagees() {
        try {
            const response = await axios.get("http://localhost:3000/login", { params: { name: localStorage.getItem('name') } });
            const manages = response.data[0].manages;
            console.log(manages);
            
            // Using Promise.all to handle multiple asynchronous operations
            const employeePromises = manages.map(async (employee) => {
                const empResponse = await axios.get("http://localhost:3000/manages", { params: { employee_id: employee } });
                return empResponse.data[0];
            });
    
            // Await all promises to complete
            const employeeArray = await Promise.all(employeePromises);
            console.log(employeeArray);
            
            // Update state after all data is fetched
            setEmployees(employeeArray);
        } catch (error) {
            console.error("Error fetching managees:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const jobRole = localStorage.getItem('job_role');
        if (jobRole === 'Product Manager') {
            getManagees();
        } else if (jobRole === 'HR Specialist') {
            allEmployees(); // Make sure allEmployees function is defined
        }
    }, []); // Empty dependency array ensures this runs only once on mount

    return (
        <>
            {
                employees.map((employee) => (
                    <SalEmpCard key={employee.employee_id} data={employee} />
                ))
            }
        </>
    )
}

export default ManageSection