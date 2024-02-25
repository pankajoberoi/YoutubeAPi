const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    videoId: {
        type: String,
        required: true
    },
    
});

 let Video=  mongoose.model('Video', videoSchema);
module.exports =Video
