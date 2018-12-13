const express = require("express");
const router = express.Router();
const Label = require('../../models/label');

// get all music labels that have registered
router.get("/", (req, res) => {
    Label
        .find()
        .then(label => res.json(label))
        .catch(err => res.json({
            err: "can not load music labels"
        }));
});

router.post("/", (req, res) => {
    Label
        .create(req.body)
        .then(label => res.json(label))
        .catch(err => res.json({
            error:err.message,
            err: "can not create music label"
        }));
});

router.get("/:name", (req, res) => {
    Label
        .findOne({
            name: req.params.name
        })
        .then(label => res.json(label))
        .catch(err => res.json({
            err: "can not find the label"
        }));
});

router.put("/:name", (req, res) => {
    Label
        .findOneAndUpdate({
            name: req.params.name
        }, req.body)
        .then(label => res.json(label))
        .catch(err => res.json({
            err: "can not find label you were trying to update"
        }));
});

router.delete("/:name", (req, res) => {
    Label
        .findOneAndDelete({
            name: req.params.name
        })
        .then(label => res.json(label))
        .catch(err => res.json({
            err: "can not find label you were trying to delete"
        }));
});

module.exports = router;
