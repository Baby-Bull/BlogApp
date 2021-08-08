const router = require("express").Router();

const Category = require("../models/Category");

//create a category
router.post("/", async (req, res) => {
    const newCate = new Category(req.body);
    try {
        const savedCate = await newCate.save();
        res.status(200).json("a new category has been created")
    } catch (error) {
        res.status(500).json(error);
    }
});

// get all categories
router.get("/", async (req, res) => {
    try {
        const cates = await Category.find();
        res.status(200).json(cates);
    } catch (error) {
        res.status(500).json(error);
    }
})


module.exports = router;