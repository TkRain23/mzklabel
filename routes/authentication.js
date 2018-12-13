const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user")

const router = express.Router();

// create a new account for user if not already made
router.post('/', (req, res) => {
    User
        .create(req.body)
        .then((user) => {
            // create token payload if user sucessfully created
            const tokenPayload = {
                username: user.username,
                id: user._id,
            };

            // create header if user sucessfully created
            const tokenHeaders = {
                expiresIn: '60 days'
            };
            const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, tokenHeaders);

            // create cookie with encrypyted jwt token
            res.cookie('mzklabelauth', token, {
                maxAge: 60 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });

            // send cookie to user
            return res.json({
                success: 'success: user created and auth token issued'
            });
        })
        .catch(err => res.status(500).json({
            err: err.message//'failure: user not created'
        }));
});

// sign the user into the api
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
            // verify found user to continue login
            if (!user) {
                return res.status(403).json({
                    err: "incorrect user or pass"
                });
            }

            // compare entered pass with stored pass
            user.comparePassword(password, (err, isMatch) => {
                if (isMatch) {
                    // create json webtoken
                    const tokenPayload = {
                        username: user.username,
                        id: user._id,
                    };

                    const tokenHeaders = {
                        expiresIn: "60 Days"
                    };

                    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, tokenHeaders);

                    // create cookie with jwt token
                    res.cookie("mzklabelauth", token, {
                        maxAge: 60 * 24 * 60 * 60 * 1000,
                        httpOnly: true
                    });
                    // return cookie to the user
                    return res.json({
                        success: "success: signed in and auth token issued"
                    });
                }
                return res.status(403).json({
                    err: 'failure: user or pass incorrect'
                });
            });
        }).catch(err => res.status(500).json({
            err: "failure: could not sign into api"
        }))
});

router.delete('/', (req, res) => {
    res.clearCookie("mzklabelauth"); //check name
    res.json({
        success: "sucess: signed out and token removed"
    });
});

module.exports = router;
