const dotenv = require('dotenv')
const express = require('express');
const contactRoutes = require('../schmeaModels/usersSchema');
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const router = express.Router();

dotenv.config({path:'./config.env'})

SECRET = process.env.SECRET

router.post('/signup', body('email').isEmail(), body('password').isLength({ min: 5 }), async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        };

        let {  email, password } = req.body;

        const user = await contactRoutes.findOne({ email });

        if (user) {
            return res.status(400).json({
                status: "Fialed",
                message: "User Exist"
            });
        };

        bcrypt.hash(password, 10, async function (err, hash) {
            // Store hash in your password DB.
            if (err) {
                return res.status(400).json({
                    status: "Not OK",
                    message: err.message
                });
            };

            const user = await contactRoutes.create(
                {
                    email,
                    password: hash,

                }
            );
            res.status(200).json({
                status: 'Success',
                user
            });
        });

    } catch (error) {
        res.status(400).json({
            status: 'Failed',
            meassage: "Catched error"
        });
        console.log(error);
    };

});


router.post('/login', body("email").isEmail(), body("password").isLength({ min: 6, max: 16 }),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { email, password } = req.body

            const user = await contactRoutes.findOne({ email });
            if (!user) {
                return res.status(400).json(
                    {
                        status: 'failed',
                        message: 'Invalid user'
                    });
            }

            // Load hash from your password DB.
            bcrypt.compare(password, user.password, function (err, result) {
                // result == true
                if (err) {
                    return res.status(403).json({ status: 'failed', message: err.meassage });
                }
                if (result) {

                    const token = jwt.sign({
                        data: user._id
                    },
                        SECRET, {
                        expiresIn: "10h"
                    }
                    );

                    return res.status(200).json({ status: 'success', meassage: 'Login success', token });
                } else {
                    return res.status(403).json({ status: 'success', meassage: 'Invalid credentials' });
                }
            });

        } catch (error) {
            res.json({
                status: "failure",
                meassage: error.message
            })
        }
    });



module.exports = router


