const express = require('express');
const contactRoutes = require('../schmeaModels/usersSchema');
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const secret = 'secret'

const router = express.Router();

router.post('/signup', body("email").isEmail(), body("password").isLength({ min: 6, max: 16 }),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array()});
            }

            const { email, password } = req.body

            const user = await contactRoutes.findOne({ email });
            if (user) {
                return res.status(400).json(
                    {
                        status: 'failed',
                        message: 'user exist'
                    });
            }

            bcrypt.hash(password, 10, async function (err, hash) {
                if (err) {
                    return res.status(400).json({
                        status: "not ok",
                        meassage: err.meassage
                    });
                }
                // Store hash in your password DB.
                const userdata = await contactRoutes.create({
                    email,
                    password: hash
                })
                res.json({
                    status: "user created successfully",
                    userdata
                })
            });

        } catch (error) {
            res.json({
                status: "failure",
            })
        }
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
                if(err){
                    return res.status(403).json({ status:'failed', message:err.meassage});
                }
                if(result){
                    
                   const token= jwt.sign({
                        data: user._id
                      }, 
                      secret,{
                        expiresIn: "10h" 
                      }
                      );

                    return res.status(200).json({ status:'success', meassage:'Login success',token});
                }else{
                    return res.status(403).json({ status:'success', meassage:'Invalid credentials'});
                }
            });

        } catch (error) {
            res.json({
                status: "failure",
                meassage:error.message
            })
        }
    });



module.exports = router


