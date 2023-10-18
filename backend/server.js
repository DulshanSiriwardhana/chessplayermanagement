const express  = require("express");
const mongoose  = require("mongoose");
const bodyParser  = require("body-parser");
const cors  = require("cors");
const dotenv  = require("dotenv");
const app  = express();
require("dotenv").config();

const PORT = process.env.PORT || 8060;
app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const connection = mongoose.connection;
connection.once("open",()=>{
    console.log("Mongodb Connection success!");
})

const UserRouter = require("./routes/Users.js");
app.use("/User",UserRouter);

const ClubRouter = require("./routes/Clubs.js");
app.use("/Club",ClubRouter);

const TournamentRouter = require("./routes/Tournaments.js");
app.use("/Tournament",TournamentRouter);

app.listen(PORT,()=>{
    console.log(`Server is up and running on port number: ${PORT}`);
})