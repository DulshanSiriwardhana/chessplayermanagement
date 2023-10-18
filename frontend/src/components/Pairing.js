import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import '../App.css'; // Import your CSS file for styling

const Pairing = () => {
    const [clubPlayers, setClubPlayers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [tournamentname, setTournamentName] = useState('');
    const [tournamentdescription, setTournamentDescription] = useState('');
    const [pairings, setPairings] = useState([]);
    const [currentRound, setCurrentRound] = useState(1);
    const [showPairings, setShowPairings] = useState(false);
    const [noOfMatch, setNoOfMatch] = useState(0);

    useEffect(() => {
        const storedSelectedPlayers = localStorage.getItem('selectedPlayers');
        if (storedSelectedPlayers) {
            setSelectedPlayers(JSON.parse(storedSelectedPlayers));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('selectedPlayers', JSON.stringify(selectedPlayers));
    }, [selectedPlayers]);

    useEffect(() => {
        axios
            .get('http://localhost:8060/User')
            .then((response) => {
                const filteredUsers = response.data.filter((user) => user.role === 'Chess Player');
                setClubPlayers(filteredUsers);
            })
            .catch((error) => {
                console.error('Error fetching club players:', error);
            });
    }, []);

    const handleAddTournament = () => {
        const selectedPlayerIds = selectedPlayers.map(player => player._id);

        const tournamentData = {
            tournamentname: tournamentname,
            numberofmatch:noOfMatch,
            tournamentdescription: tournamentdescription,
            selectedPlayerIds: selectedPlayerIds,
        };

        axios.post('http://localhost:8060/Tournament/add', tournamentData)
            .then(response => {
                console.log('Tournament Added:', response.data);
                setShowPairings(true);
            })
            .catch(error => {
                console.error('Error adding tournament:', error);
            });
    };

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
    };

    const handleSelectPlayer = (player) => {
        if (!selectedPlayers.some((selectedPlayer) => selectedPlayer._id === player._id)) {
            setSelectedPlayers([...selectedPlayers, player]);
        }
    };

    const handleRemoveSelectedPlayer = (player) => {
        const updatedSelectedPlayers = selectedPlayers.filter((selectedPlayer) => selectedPlayer._id !== player._id);
        setSelectedPlayers(updatedSelectedPlayers);
    };

    const handleTournamentNameChange = (event) => {
        const Tname = event.target.value;
        setTournamentName(Tname);
    };

    const handleTournamentDescriptionChange = (event) => {
        const Tdisc = event.target.value;
        setTournamentDescription(Tdisc);
    };

    const clubPlayerColumns = [
        {
            name: 'Name',
            selector: 'name',
            sortable: true,
        },
        {
            name: 'Age',
            selector: 'age',
            sortable: true,
        },
        {
            name: 'Gender',
            selector: 'gender',
        },
        {
            name: 'Rating',
            selector: 'rating',
            sortable: true,
        },
        {
            cell: (row) => {
                const isSelected = selectedPlayers.some((selectedPlayer) => selectedPlayer._id === row._id);
                return (
                    <button
                        className={`btn ${isSelected ? 'btn-success' : 'btn-primary'}`}
                        onClick={() => handleSelectPlayer(row)}
                        disabled={isSelected}
                    >
                        {isSelected ? 'Selected' : 'Select'}
                    </button>
                );
            },
        },
    ];

    const selectedPlayerColumns = [
        {
            name: 'Name',
            selector: 'name',
        },
        {
            cell: (row) => (
                <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveSelectedPlayer(row)}
                >
                    Remove
                </button>
            ),
        },
    ];

    const calculatePairings = () => {
        const playersCopy = [...selectedPlayers];
        const numberOfPlayers = playersCopy.length;
        const numberOfRounds = numberOfPlayers - 1;
        const pairingsPerRound = [];
        let round = 1
        for (round; round <= numberOfRounds; round++) {
            const roundPairings = [];

            for (let i = 0; i < numberOfPlayers / 2; i++) {
                const player1 = playersCopy[i];
                const player2 = playersCopy[numberOfPlayers - 1 - i];
                roundPairings.push({ player1, player2 });
            }
            setNoOfMatch(round);
            playersCopy.splice(1, 0, playersCopy.pop());
            pairingsPerRound.push(roundPairings);
        }
        setPairings(pairingsPerRound);
    };

    const handleSaveMatchResult = (roundIndex, matchIndex, result) => {
        const updatedPairings = [...pairings];
        updatedPairings[roundIndex][matchIndex].result = result;
        setPairings(updatedPairings);
    };

    const handleNextRound = () => {
        setCurrentRound(currentRound + 1);
    };

    useEffect(() => {
        calculatePairings();
    }, [selectedPlayers]);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Pairing Page</h1>

            <div className="mb-3">
                <input
                    className="form-control"
                    type="text"
                    placeholder="Search players"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>

            <div className="box mb-5">
                <h2>Club Players</h2>
                <DataTable
                    columns={clubPlayerColumns}
                    data={clubPlayers.filter((player) =>
                        player.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )}
                    pagination
                />
            </div>

            <div className="box mb-5">
                <h2>Selected Players</h2>
                <DataTable
                    columns={selectedPlayerColumns}
                    data={selectedPlayers}
                />
            </div>

            <div className="box mb-5">
                <h2>Add Tournament</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="tournamentName" className="form-label">Tournament Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="tournamentName"
                            name="tournamentName"
                            value={tournamentname}
                            onChange={handleTournamentNameChange}
                            placeholder="Enter tournament name"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tournamentDescription" className="form-label">Tournament Description</label>
                        <textarea
                            className="form-control"
                            id="tournamentDescription"
                            name="tournamentDescription"
                            value={tournamentdescription}
                            onChange={handleTournamentDescriptionChange}
                            placeholder="Enter tournament description"
                        />
                    </div>
                    <div>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleAddTournament}
                        >
                            Add Tournament
                        </button>
                    </div>
                </form>
            </div>

            {showPairings && (
                <div className="box mb-5">
                    <h2>Match Pairings - Round {currentRound}</h2>
                    {pairings.length > 0 ? (
                        <table className="table table-bordered table-striped" style={{ boxShadow: "5px 5px 10px 2px" }}>
                            <thead>
                                <tr>
                                    <th>Match</th>
                                    <th>Player 1</th>
                                    <th>Player 2</th>
                                    <th>Result</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pairings[currentRound - 1].map((pairing, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{pairing.player1.name}</td>
                                        <td>{pairing.player2.name}</td>
                                        <td>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Result"
                                                onChange={(e) =>
                                                    handleSaveMatchResult(
                                                        currentRound - 1,
                                                        index,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No pairings available.</p>
                    )}
                    {currentRound < pairings.length && (
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleNextRound}
                        >
                            Next Round
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Pairing;
