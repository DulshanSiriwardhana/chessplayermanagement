import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PairingPlayer = ({ email }) => {
    const [tournamentDetails, setTournamentDetails] = useState([]);
    
    useEffect(() => {
        // Fetch all users
        axios
            .get('http://localhost:8060/User')
            .then((response) => {
                // Find the user with the matching email
                const userWithEmail = response.data.find((user) => user.email === email);

                if (userWithEmail) {
                    const chessPlayerId = userWithEmail.chessPlayerId;
                    // Now that you have chessPlayerId, fetch tournament details
                    axios
                        .get('http://localhost:8060/tournament')
                        .then((response) => {
                            // Filter tournaments for the given chessPlayerId
                            const filteredTournaments = response.data.filter((tournament) =>
                                tournament.selectedPlayers.includes(chessPlayerId)
                            );
                            setTournamentDetails(filteredTournaments);
                        })
                        .catch((error) => {
                            console.error('Error fetching tournament details:', error);
                        });
                } else {
                    console.error('User not found with email:', email);
                }
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    }, [email]);

    return (
        <div>
            <h2>Tournament Details for Chess Player</h2>
            <table>
                <thead>
                    <tr>
                        <th>Tournament Name</th>
                        <th>Number of Matches</th>
                        <th>Tournament Description</th>
                    </tr>
                </thead>
                <tbody>
                    {tournamentDetails.map((tournament) => (
                        <tr key={tournament._id}>
                            <td>{tournament.tournamentname}</td>
                            <td>{tournament.numberofmatch}</td>
                            <td>{tournament.tournamentdescription}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PairingPlayer;
