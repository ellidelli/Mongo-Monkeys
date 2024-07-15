import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [inputValue, setInputValue] = useState('');
    const [exists, setExists] = useState(null);

    const handleChange = async (event) => {
        const value = event.target.value;
        console.log('Input value changed to:', value); // Log the new input value
        setInputValue(value);

        // Make API call
        try {
            const response = await axios.get("http://localhost:3000/login", { params: { name: value } });
            console.log(response.data);
            if (response.data.length > 0) {
                localStorage.setItem('employee_id', response.data[0].employee_id)
                localStorage.setItem('name', response.data[0].name)
                localStorage.setItem('salary', response.data[0].salary)
                localStorage.setItem('job_role', response.data[0].job_role)
                localStorage.setItem('work_location', response.data[0].work_location)
                localStorage.setItem('manages', response.data[0].manages)

            }
            setExists(response.data.length > 0);
        } catch (error) {
            console.error("Can't get employees", error);
            setExists(false);
        }
    }

    return (
        <>
            <h1>Login</h1>
            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder='Type a name'
            />
            {exists !== null && (
                <p>{exists ? 'Employee exists!' : 'Employee does not exist!'}</p>
            )}
        </>
    );
}

export default Login;
