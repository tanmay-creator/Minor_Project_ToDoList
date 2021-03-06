const mongoose = require("mongoose");
// database schema for storing data.
const taskSchema = new  mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    description: {
        type: String,
        required: true
    },
    endDate:{
        type: String,
        required: true
    }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;