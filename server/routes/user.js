const router = require('express').Router();
const userModel = require('../models/usermodel')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
let secret = "RESTAPI"



router.post('/register', body('email').isEmail(), body('password').isLength({ min: 5 }), async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({ errors: errors.array() });
        }
        const data = new userModel(req.body);
        data.password = await bcrypt.hash(data.password, 10)
        await data.save();
        res.status(200).json({ message: "success", data });
    } catch (e) {
        res.status(400).json({
            message: e.message
        })
    }
})




router.post('/login', async (req, res) => {
    try {
        const checkUser = await userModel.findOne({ email: req.body.email });
        if (checkUser) {
            bcrypt.compare(req.body.password, checkUser.password, function (err, result) {
                // result == true
                if (result) {
                    const token = "test" + jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        data: checkUser._id
                    }, secret);
                    console
                    res.status(200).json({ message: "success", token });
                }
                else {
                    res.status(203).json({ message: "Wrong Password" });
                }
            });
        }
        else {
            res.status(203).json({ message: "Email not found" });
        }
    } catch (e) {
        res.status(400).json({
            message: e.message
        })
    }
})

module.exports = router;