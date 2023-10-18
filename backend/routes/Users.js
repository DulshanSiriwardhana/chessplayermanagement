const router = require("express").Router();
const { response } = require("express");
let User = require("../models/user");

router.route("/add").post((req,res)=>{
    const name = req.body.name;
    const email = req.body.email;
    const age = Number(req.body.age);
    const gender = req.body.gender;
    const rating = Number(req.body.rating);
    const role = req.body.role;
    const clubId = req.body.clubId;

    const NewUser =  new User({
        name,
        email,
        age,
        gender,
        rating,
        role,
        clubId
    })
    NewUser.save().then(()=>{
        res.json(NewUser);
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{
    User.find().then((User)=>{
        res.json(User)
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id;
    const { name, email, age, gender, rating, role } = req.body;

    const UpdateUser = {
        name,
        email,
        age,
        gender,
        rating,
        role,
    };

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, UpdateUser, { new: true });
        if (updatedUser) {
            res.status(200).json({ status: "User updated", user: updatedUser });
        } else {
            res.status(404).json({ status: "User not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error with updating data" });
    }
});


router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;

    await User.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status : "User Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status : "Error with delete"});
    })
})

router.route("/get/:id").get(async(req,res)=>{
    let userId = req.params.id;
    const player = await User.findById(userId).then((player)=>{
        res.status(200).send({status : "User Found",user:player})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status : "User not Found",error : err.message});
    })
})

router.route("/getRole/:role").get(async(req,res)=>{
    let userRole = req.params.role;
    const player = await User.findOne(userRole).then((player)=>{
        res.status(200).send({status : "User Found",user:player})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status : "User not Found",error : err.message});
    })
})

module.exports = router;