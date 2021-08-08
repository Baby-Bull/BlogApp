const router = require("express").Router();

const bcrypt = require('bcrypt');
const Post = require("../models/Post");
const User = require("../models/User");

//get an user
router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            const { password, ...others } = user._doc;
            res.status(200).json(others);
        } else {
            res.status(401).json("user doesnt exist !!!")
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

//update an user 
router.put("/:id", async (req, res) => {
    try {
        if (req.params.id === req.body.userId) {
            // const user = await User.findById(req.params.id);
            if (req.body.password) {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }
            try {
                const updatedUser = await User.findByIdAndUpdate(req.body.userId, {
                    $set: req.body
                })
                res.status(200).json(updatedUser);
            } catch (error) {
                res.status(400).json(error);
            }
        } else {
            res.status(403).json("you cant modify here, this is not for you !!!");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

//delete an user
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            await User.findById(req.body.userId);
            await Post.deleteMany({ userId: req.body.userId });
            await User.findByIdAndDelete(req.body.userId);
            res.status(200).json("delete user successful");
        } catch (error) {
            res.status(404).json("user not found")
        }
    } else {
        res.status(500).json("you cant edit this user");
    }
})



module.exports = router;