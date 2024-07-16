import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import ManageSection from "./ManageSection";
import './MyAccount.css'; // Ensure the CSS file is correctly imported

const MyAccount = () => {
    const [image, setImage] = useState(''); // Use a single string to store the image URL
    const [loading, setLoading] = useState(true); // To manage the loading state
    const [error, setError] = useState(''); // To manage error state

    useEffect(() => {
        const fetchEmployeeImage = async () => {
            const employeeId = localStorage.getItem('employee_id'); // Assuming you store the employee_id in localStorage
            const gender = localStorage.getItem('gender') === 'male' ? 'men' : 'women';
            const imageUrl = `http://localhost:3000/proxy/${gender}/${employeeId}.jpg`;

            try {
                // Fetch the image from the proxy server
                await axios.get(imageUrl);
                setImage(imageUrl);
                setError(''); // Clear any previous errors
            } catch (error) {
                console.error(`Image not found for employee ${employeeId}: ${error.message}`);
                setImage('path_to_fallback_image.jpg'); // Use fallback image path
                setError('Error loading image');
            } finally {
                setLoading(false); // Set loading to false when the request is done
            }
        };

        fetchEmployeeImage();
    }, []);

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    });

    return (
        <>
            <div style={{ margin: 20 }} className='accCard'>
                <div className='accCard-image'>
                    {loading ? (
                        <p>Loading image...</p>
                    ) : (
                        <img src={image} alt="Profile" />
                    )}
                    {error && <p>{error}</p>} {/* Display error message if any */}
                </div>
                <div className='accCard-data'>
                    <h1>{localStorage.getItem('name')}</h1>
                    <h3>📍 {localStorage.getItem('work_location')}</h3>
                    <h3>Role: {localStorage.getItem('job_role')}</h3>
                    <h3>Salary: {formatter.format(localStorage.getItem('salary'))}</h3>
                </div>
            </div>
            <div className = 'wrap'><ManageSection /></div>
        </>
    );
}

export default MyAccount;
