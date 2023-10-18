const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClubSchema = new Schema({
    clubname : {
        type : String,
        require: true
    },
    clubtype : {
        type : String,
        require : true
    },
    tournamentId: {
        type: Schema.Types.ObjectId,
        ref: 'Tournament'
    }
})

const Club = mongoose.model("Club",ClubSchema);
module.exports = Club;
