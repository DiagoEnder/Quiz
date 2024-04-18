const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    IdRoom: {
        type: Number,
        required: true,
        unique: true
    },
    
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    players: [{
        type: String,
        required: true
    }],
    
    quizId: {
        type: mongoose.Types.ObjectId,
        ref: 'quiz',
        require: true
        
    },
    

    status: {
        type: String,
        enum: ['pending', 'started', 'finished'],
        default: 'pending'
    }
        
    
    
}, {timestamps: true})



const Room = mongoose.model('Room', roomSchema);

module.exports = Room;