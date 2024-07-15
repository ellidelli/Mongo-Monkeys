import React, { useState } from 'react';

const SearchComponent = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await fetch(`http://localhost:3000/employees/${encodeURIComponent(searchTerm)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            props.setData(data); // Assuming props.setData is a function to update data in parent component
            setSearchResults(data);
        } catch (error) {
            console.error('Search error:', error);
        }
    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={handleChange} // Update search term as user types
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchComponent;
