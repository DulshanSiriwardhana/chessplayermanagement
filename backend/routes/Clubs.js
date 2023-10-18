const router = require("express").Router();
const { response } = require("express");
let Club = require("../models/Club");

router.route("/add").post((req,res)=>{
    const clubname = req.body.clubname;
    const clubtype = req.body.clubtype;
    const tournamentId = req.body.tournamentId;

    const NewClub =  new Club({
        clubname,
        clubtype,
        tournamentId
    })
    NewClub.save().then(()=>{
        res.json("Club Added");
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{
    Club.find().then((Club)=>{
        res.json(Club)
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/update/:id").put(async(req,res)=>{
    let ClubId = req.params.id;
    const {name ,age ,gender,rating} = req.body;

    const UpdateClub = {
        clubname,
        clubtype,
        tournamentId
    }
    const update = await Club.findByIdAndUpdate(ClubId,UpdateClub).then(()=>{
        res.status(200).send({status: "Club updated",Club:update});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    })
})

router.route("/delete/:id").delete(async(req,res)=>{
    let ClubId = req.params.id;

    await Club.findByIdAndDelete(ClubId).then(()=>{
        res.status(200).send({status : "Club Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status : "Error with delete"});
    })
})

router.route("/get/:id").get(async(req,res)=>{
    let ClubId = req.params.id;
    const Club = await Club.findById(ClubId).then((Club)=>{
        res.status(200).send({status : "Club Found",Club:Club})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status : "Club not Found",error : err.message});
    })
})

module.exports = router;