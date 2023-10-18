import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';

const Club = () => {
    const customStyles = {
        rows: {
            style: {
                fontSize: '14px',
                minHeight: '48px', // Adjust row height
            },
        },
        cells: {
            style: {
                paddingLeft: '10px',
            },
        },
        head: {
            style: {
                fontSize: '16px',
                backgroundColor: '#f2f2f2', // Change header background color
            },
        },
    };

    const columns = [
        {
            name: 'Name',
            selector: 'name',
            sortable: true, // Allow sorting by name
        },
        {
            name: 'Email',
            selector: 'email',
        },
        {
            name: 'Age',
            selector: 'age',
        },
        {
            name: 'Rating',
            selector: 'rating',
            sortable: true,
        },
        {
            name: 'Gender',
            selector: 'gender', // Add the Gender column
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div>
                    <button onClick={() => handleEditUser(row)} className="btn btn-primary btn-sm mr-2">
                        Edit
                    </button>
                    <button onClick={() => handleDeleteUser(row._id)} className="btn btn-danger btn-sm">
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newPlayer, setNewPlayer] = useState({
        name: '',
        email: '',
        age: '',
        rating: '',
        gender: '', // Add the gender field
    });

    // State for editing
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(null);

    useEffect(() => {
        // Fetch chess player users' data from your API with role 'Chess Player'
        axios
            .get('http://localhost:8060/User')
            .then((response) => {
                const filteredUsers = response.data.filter((user) => user.role === 'Chess Player');
                setData(filteredUsers);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching chess player data:', error);
                setLoading(false);
            });
    }, []);

    // Function to delete a user
    const handleDeleteUser = (userId) => {
        // Send a DELETE request to delete the user
        axios
            .delete(`http://localhost:8060/User/delete/${userId}`)
            .then(() => {
                // Remove the deleted user from the data state
                setData(data.filter((user) => user._id !== userId));
            })
            .catch((error) => {
                console.error('Error deleting user:', error);
            });
    };

    // Function to activate editing mode
    const handleEditUser = (user) => {
        setEditedUser({ ...user });
        setIsEditing(true);
    };

    // Function to update edited user data
    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({
            ...editedUser,
            [name]: value,
        });
    };

    // Function to save the edited user data
    const handleSaveUser = () => {
        // Send a PUT request to update the user data
        axios
            .put(`http://localhost:8060/User/update/${editedUser._id}`, editedUser)
            .then(() => {
                // Update the user data in the data state
                setData((prevData) =>
                    prevData.map((user) =>
                        user._id === editedUser._id ? editedUser : user
                    )
                );
                // Reset the edited user and exit editing mode
                setEditedUser(null);
                setIsEditing(false);
            })
            .catch((error) => {
                console.error('Error updating user:', error);
            });
    };

    // Function to cancel editing
    const handleCancelEdit = () => {
        setEditedUser(null);
        setIsEditing(false);
    };

    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPlayer({
            ...newPlayer,
            [name]: value,
        });
    };

    // Function to add a new chess player
    const handleAddPlayer = () => {
        // Send a POST request to add the new chess player
        axios
            .post('http://localhost:8060/User/add', {
                ...newPlayer,
                role: 'Chess Player',
            })
            .then((response) => {
                // Add the new chess player to the data state
                setData([...data, response.data]);
                // Reset the form fields
                setNewPlayer({
                    name: '',
                    email: '',
                    age: '',
                    rating: '',
                    gender: '', // Reset the gender field
                });
            })
            .catch((error) => {
                console.error('Error adding chess player:', error);
            });
    };

    return (
        <div className="container">
            <h1 className="my-4">Chess Player Table</h1>

            {/* Add Chess Player Section */}
            <div className="card" style={{backgroundColor:"#e0d272",boxShadow:"5px 5px 10px 2px"}}>
                <div className="card-body">
                    <h2 className="card-title mb-4">
                        {isEditing ? 'Edit Chess Player' : 'Add Chess Player'}
                    </h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={isEditing ? editedUser.name : newPlayer.name}
                                onChange={isEditing ? handleEditInputChange : handleInputChange}
                                className="form-control"
                                placeholder="Enter name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={isEditing ? editedUser.email : newPlayer.email}
                                onChange={isEditing ? handleEditInputChange : handleInputChange}
                                className="form-control"
                                placeholder="Enter email"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="age">Age</label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={isEditing ? editedUser.age : newPlayer.age}
                                onChange={isEditing ? handleEditInputChange : handleInputChange}
                                className="form-control"
                                placeholder="Enter age"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rating">Rating</label>
                            <input
                                type="text"
                                id="rating"
                                name="rating"
                                value={isEditing ? editedUser.rating : newPlayer.rating}
                                onChange={isEditing ? handleEditInputChange : handleInputChange}
                                className="form-control"
                                placeholder="Enter rating"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="gender">Gender</label>
                            {isEditing ? (
                                <select
                                    id="gender"
                                    name="gender"
                                    value={editedUser.gender}
                                    onChange={handleEditInputChange}
                                    className="form-control"
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            ) : (
                                <select
                                    id="gender"
                                    name="gender"
                                    value={newPlayer.gender}
                                    onChange={handleInputChange}
                                    className="form-control"
                                >
                                    <option value="">Select gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            )}
                        </div>
                        <div className="form-group">
                            {isEditing ? (
                                <div>
                                    <button type="button" onClick={handleSaveUser} className="btn btn-success">
                                        Save
                                    </button>
                                    <button type="button" onClick={handleCancelEdit} className="btn btn-secondary ml-2">
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleAddPlayer}
                                    className="btn btn-primary"
                                    style={{backgroundColor:"#000000", marginTop:'20px'}}
                                >
                                    Add Player
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>

            {/* Display Chess Player Table */}
            <div className="card mt-4" style={{boxShadow:"5px 5px 10px 2px"}}>
                <div className="card-body" >
                    <h2 className="card-title mb-3">Chess Player List</h2>
                    <DataTable
                        columns={columns}
                        data={data}
                        customStyles={customStyles}
                        selectableRows
                        pagination
                        responsive // Make the table responsive
                    />
                    {loading ? <p>Loading...</p> : null}
                </div>
            </div>
        </div>
    );
};

export default Club;