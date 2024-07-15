import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    // State hooks for managing input values and validation
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [exists, setExists] = useState(null);

    // Handle input value changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        // Update state based on input name
        if (name === 'username') {
            setUsername(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    }

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission

        try {
            // Make API call with both username and password
            const response = await axios.post("http://localhost:3000/login", { username, password });

            console.log(response.data);

            // Check if the response indicates successful login
            if (response.data.length > 0) {
                // Assuming the response includes employee data on successful login
                localStorage.setItem('employee_id', response.data[0].employee_id);
                localStorage.setItem('name', response.data[0].name);
                localStorage.setItem('salary', response.data[0].salary);
                localStorage.setItem('job_role', response.data[0].job_role);
                localStorage.setItem('work_location', response.data[0].work_location);
                localStorage.setItem('manages', response.data[0].manages);

                setExists(true); // Employee exists
            } else {
                setExists(false); // Employee does not exist or incorrect password
            }
        } catch (error) {
            console.error("Error during login", error);
            setExists(false);
        }
    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={handleChange}
                    placeholder='Type your username'
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    placeholder='Type your password'
                    required
                />
                <button type="submit">Login</button>
            </form>
            {exists !== null && (
                <p>{exists ? 'Employee exists!' : 'Employee does not exist or incorrect password!'}</p>
            )}
        </>
    );
}

export default Login;
