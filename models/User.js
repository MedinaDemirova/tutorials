const mongoose = require ('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is requred!'],
        unique: true,
        minlength: [3, `Username must be least 3 characters long!`],
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    enrolledCourses:[{
        type:mongoose.Types.ObjectId,
        ref: 'Course'
    }]
});

module.exports = mongoose.model('User', userSchema); 