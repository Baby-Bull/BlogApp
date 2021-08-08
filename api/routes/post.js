const router = require("express").Router();

const Post = require("../models/Post");

//create post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error);
    }
});

//get a post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
});

//update a post
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            const updatedPost = await Post.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body
                }, { new: true }
            );
            res.status(200).json("this post has been updated !!!");
        } else {
            res.status(400).json("you cant edit this post, its not for you !!!");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// delete a post
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.userId === req.body.userId) {
            await post.delete();
            res.status(200).json("this post has been deleted !!!")
        } else {
            res.status(403).json("you cant delete this post, its not for you !!!");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// get all posts
router.get("/", async (req, res) => {
    const userId = req.query.usreId;
    const cateName = req.query.cate;
    try {
        let posts;
        if (userId) {
            posts = Post.find({ userId: userId });
        } else if (cateName) {
            posts = await Post.find({
                category: {
                    $in: [cateName]
                }
            });
        } else {
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;