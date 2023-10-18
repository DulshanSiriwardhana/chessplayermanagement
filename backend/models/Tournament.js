const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TournamentSchema = new Schema({
    tournamentname: {
        type: String,
        required: true // Use "required" instead of "require"
    },
    numberofmatch: {
        type: Number,
        required: true
    },
    tournamentdescription: {
        type: String,
        required: true
    },
    selectedPlayers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

const Tournament = mongoose.model("Tournament", TournamentSchema);
module.exports = Tournament;
