const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user")

const router = express.Router();

// create a new account for user if not already made
router.post("/", (req, res) => {
        User
            .create(req.body)
            .then((user) => {
                    // create token payload and headers if user was sucessfully created
                    const tokenPayload = {
                        username: user.username,
                        id: user._id

                        const tokenHeaders = {
                            expiresIn: "60 days"
                        }

                        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, tokenHeaders);

                        // create cookie with encrypted jwt token, and then send it to the user
                        res.cookie('mzklabel-auth', token, {
                            maxAge: 60 * 24 * 60 * 60 * 1000
                        });
                        res.json("success: "
                            user creation success: auth token issued "");
                    })
                .catch(err => res.json({
                    err: "user creation: failed"
                }));


    //sign the user into our api
    router.put("/", (req, res) => {
            const {
                username,
                password
            } = req.body;

            User
                .findOne({
                    username: username
                }, "username password")
                .then((user) => {
                        if (!user) {
                            res.status(401).json(err: "user can not be found"
                            });
                    }

                    user.comparePassword(password, (err, isMatch) => {
                        if (isMatch) {
                            const tokenPayload = {
                                username: user.username,
                                id: user._id,
                            }

                            const tokenHeaders = {
                                expiresIn: "60 Days"
                            };

                            const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, tokenHeaders);
                            res.cookie("mzklabel-auth", token, {
                                maxAge: 60 * 24 * 60 * 60 * 1000,
                                httpOnly: true
                            });
                            res.json({
                                success: "sign in success: auth token issued"
                            });
                        }
                    })
                })

    })

router.delete('/', (req, res) => {
    res.clearCookie("mzklabel-auth"); //check name
    res.json({
        success: "Sign out: Success, token removed"
    })
})

module.exports = router;
