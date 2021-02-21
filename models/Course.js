const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
    creator:{
        type:String,
        required:true
    },
    title: {
        type: String,
        required: [true, 'Username is requred!'],
        unique: true,
    },
    description: {
        type: String,
        required: [true, 'Description is requred!'],
        maxlength: 50,
    },
    imageUrl: {
        type: String,
        required: [true, 'Image URL is requred!'],
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    duration: {
        type: Number,
        required: [true, 'Duration time required']
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    },
    usersEnrolled: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Course', courseSchema); 