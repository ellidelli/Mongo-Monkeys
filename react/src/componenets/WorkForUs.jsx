import React, { useState } from 'react';
import axios from 'axios';

const WorkForUs = () => {

    const jobRoleOptions = ['Software Engineer', 'Data Analyst', 'Product Manager', 'Designer', 'HR Specialist'];
    const workLocationOptions = ['New York', 'San Francisco', 'Chicago', 'Austin'];  

    const [workLocation, setWorkLocation] = useState('');
    const [jobRole, setJobRole] = useState('');
    const [predictedSalary, setPredictedSalary] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!jobRole || !workLocation) {
            setError('You must choose a job title and work location!');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:5000/predict', {
                job_role: jobRole, 
                work_location: workLocation
            });

            setPredictedSalary(response.data.predicted_salary);
            setError('');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    });

    return (
        <>
        <div style={{margin: 5}}>
            <h1>Interested in being a Monkey? 🙈</h1>
            <p>Enter your job title at one of our four locations to see what you could be earning!</p>
            <form onSubmit={handleSubmit}>
                    <label style={{margin: 5}}>
                        Job Role: <br />
                        <select value={jobRole} onChange={(e) => setJobRole(e.target.value)}>
                            <option value="">Select Job Role</option>
                            {jobRoleOptions.map((role, index) => (
                                <option key={index} value={role}>{role}</option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <label style={{margin: 5}}>
                        Work Location: <br />
                        <select value={workLocation} onChange={(e) => setWorkLocation(e.target.value)}>
                            <option value="">Select Work Location</option>
                            {workLocationOptions.map((location, index) => (
                                <option key={index} value={location}>{location}</option>
                            ))}
                        </select>
                    </label>
                    <br />
                <button type="submit">Submit</button>
            </form>
                {error && (
                    <div style={{ color: 'red' }}>{error}</div>
                )}
                {predictedSalary !== null && (
                    <div>
                        <h2>Predicted Salary:</h2>
                        <p>{formatter.format(predictedSalary)}</p>
                        <br />
                        <button type="button">Schedule an interview</button>
                    </div>
                )}
        </div>
        </>
    );
};

export default WorkForUs