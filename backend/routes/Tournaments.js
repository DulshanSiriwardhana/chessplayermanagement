const router = require("express").Router();
const { response } = require("express");
let Tournament = require("../models/Tournament");

router.route("/add").post((req, res) => {
    const { tournamentname, numberofmatch, tournamentdescription, selectedPlayerIds } = req.body;

    const newTournament = new Tournament({
        tournamentname,
        numberofmatch,
        tournamentdescription,
        selectedPlayers: selectedPlayerIds, // Use the correct field name
    });

    newTournament
        .save()
        .then(() => {
            res.json("Tournament Added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});


router.route("/").get((req,res)=>{
    Tournament.find().then((Tournament)=>{
        res.json(Tournament)
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/update/:id").put(async(req,res)=>{
    let TournamentId = req.params.id;
    const { tournaTournamentname, numberofmatch, tournaTournamentdescription, selectedPlayerIds } = req.body;

    const UpdateTournament = {
        tournaTournamentname,
        numberofmatch,
        tournaTournamentdescription,
        selectedPlayerIds
    }
    const update = await Tournament.findByIdAndUpdate(TournamentId,UpdateTournament).then(()=>{
        res.status(200).send({status: "Tournament updated",Tournament:update});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    })
})

router.route("/delete/:id").delete(async(req,res)=>{
    let TournamentId = req.params.id;

    await Tournament.findByIdAndDelete(TournamentId).then(()=>{
        res.status(200).send({status : "Tournament Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status : "Error with delete"});
    })
})

router.route("/get/:id").get(async(req,res)=>{
    let TournamentId = req.params.id;
    const player = await Tournament.findById(TournamentId).then((player)=>{
        res.status(200).send({status : "Tournament Found",Tournament:player})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status : "Tournament not Found",error : err.message});
    })
})

router.route("/addSelectedPlayers/:id").put(async (req, res) => {
    let TournamentId = req.params.id;
    const selectedPlayerIds = req.body.selectedPlayerIds;

    try {
        const updatedTournament = await Tournament.findByIdAndUpdate(TournamentId, {
            $addToSet: { selectedPlayers: { $each: selectedPlayerIds } }
        }, { new: true });

        res.status(200).json({ status: "Selected players added to tournament", Tournament: updatedTournament });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error with updating data" });
    }
});

module.exports = router;