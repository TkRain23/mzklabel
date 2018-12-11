const express = require("express");
const router = express.Router();

const Label = require('../../models/label');

// Get all of the labels rgistered with the api
router.get("/", (req, res) => {

})

router.post("/", (req, res) => {

})

router.get("/:labelName", (req, res) => {
    Label
        .findOne({ name: req.params.labelName })
        .then(company => res.json(label))
        .catch(err => res.json({ err: "can not find the label"}));
});

router.put("/:name", (req, res) => {
    Label
        .findOneAndUpdate({ name: req.params.name }, req.body)
        .then(label => res.json(label))
        .catch(err => res.json({ err: "can not find label you were trying to update" }));
});


router.delete("/:name", (req, res) => {
    Label
        .findOneAndDelete({ name: req.params.name })
        .then(label => res.json(label))
        .catch(err => res.json({ err: "can not find label you were trying to delete"}));
});

router.put("/")

module.exports = router;
