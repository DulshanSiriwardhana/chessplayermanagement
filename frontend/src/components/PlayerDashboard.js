import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const PlayerDashboard = () => {
    const [playerUsers, setPlayerUsers] = useState([]);
    const [tournaments, setTournaments] = useState([]);

    // Fetch all users from the database
    useEffect(() => {
        axios
            .get('http://localhost:8060/User')
            .then((response) => {
                // Filter users by role 'Player'
                const filteredUsers = response.data.filter((user) => user.role === 'Player');
                setPlayerUsers(filteredUsers);
            })
            .catch((error) => {
                console.error('Error fetching player users:', error);
            });
    }, []);

    // Fetch all tournaments from the database
    useEffect(() => {
        axios
            .get('http://localhost:8060/Tournament')
            .then((response) => {
                setTournaments(response.data);
            })
            .catch((error) => {
                console.error('Error fetching tournaments:', error);
            });
    }, []);

    // Function to handle deleting a tournament
    const handleDeleteTournament = (tournamentId) => {
        // Send a DELETE request to remove the tournament by ID
        axios
            .delete(`http://localhost:8060/Tournament/delete/${tournamentId}`)
            .then(() => {
                // Update the tournaments list after deletion
                setTournaments((prevTournaments) =>
                    prevTournaments.filter((tournament) => tournament._id !== tournamentId)
                );
            })
            .catch((error) => {
                console.error('Error deleting tournament:', error);
            });
    };

    return (
        <div>
            <div className="container mt-4" style={{ fontSize: '15px' }}>
                {/* Display Player Users */}
                <div className="mb-4">
                    {/*<h2 className="mb-3">Players</h2>*/}
                    <div className="list-group">
                        {playerUsers.map((user) => (
                            <div key={user._id} className="list-group-item" style={{ backgroundColor: '#93e880', color: '#000000' }}>
                                <h5 className="mb-1">{user.name}</h5>
                                <p className="mb-1"><strong>Email:</strong> {user.email}</p>
                                <p className="mb-1"><strong>Age:</strong> {user.age}</p>
                                <p className="mb-1"><strong>Gender:</strong> {user.gender}</p>
                                <p className="mb-1"><strong>Rating:</strong> {user.rating}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Display Tournaments */}
                <div className="mb-4">
                    <h2 className="mb-3" style={{fontWeight:'600'}}>Tournaments</h2>
                    <table className="table table-striped" style={{boxShadow:'5px 5px 20px 5px'}}>
                        <thead>
                            <tr>
                                <th>Tournament Name</th>
                                <th>Description</th>
                                <th>Number of Matches</th>
                                {/*<th>Action</th>*/}
                            </tr>
                        </thead>
                        <tbody>
                            {tournaments.map((tournament) => (
                                <tr key={tournament._id}>
                                    <td>{tournament.tournamentname}</td>
                                    <td>{tournament.tournamentdescription}</td>
                                    <td>{tournament.numberofmatch}</td>
                                    {/*<td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDeleteTournament(tournament._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>*/}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PlayerDashboard;
