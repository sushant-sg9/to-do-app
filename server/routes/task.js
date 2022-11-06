const router = require('express').Router();
const taskModel = require('../models/taskmodel')
const userModel = require('../models/usermodel')
var jwt = require('jsonwebtoken');
let secret = "RESTAPI"

router.use('/', (req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split("test")[1];
        try {
            jwt.verify(token, secret, async function (err, decoded) {
                if (err) {
                    res.status(400).json(err.message)
                }
                const user = await userModel.findOne({ _id: decoded.data })
                req.user = user._id;
                console.log(req.user);
                next();
            });
        }
        catch (e) {
            res.status(400).json(e.message)
        }
    }
    else {
        res.status(400).json({ message: "user invalid" })
    }

})

router.get('/', async (req, res) => {
    try {
        const tasks = await taskModel.find({ user: req.user });
        res.status(200).json(tasks);
        console.log(tasks)
    } catch (e) {
        console.log(e.message)
        res.status(400).json({
            message: e.message
        })
    }
})
router.put('/:id', async (req, res) => {
    try {
        await taskModel.findByIdAndUpdate(req.params.id, req.body)
        const task = await taskModel.findById(req.params.id);
        res.status(200).json(task);
    } catch (e) {
        console.log(e.message)
        res.status(400).json({
            message: e.message
        })
    }
})
router.post('/', async (req, res) => {
    try {
        const task = await taskModel.create({
            //mention as per the schema which is to be created
            activity: req.body.activity,
            status: req.body.status,
            timeTaken: req.body.timeTaken,
            user: req.user
        })
        res.status(200).json({
            message: "success",
            task
        })
    } catch (e) {
        console.log(e.message)
        res.status(400).json({
            message: e.message

        })
    }
})



module.exports = router;