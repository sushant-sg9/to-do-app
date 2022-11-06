const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    activity: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    timeTaken: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
}, {
    versionKey: false // You should be aware of the outcome after set to false
})

const Task = mongoose.model('task', taskSchema);

module.exports = Task;