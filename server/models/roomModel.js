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
        
        id: String,
        name: String,
        result: {
            type: Number,
            default: 0
        }
          
    }],
    
    quizId: {
        type: mongoose.Types.ObjectId,
        ref: 'Quiz',
        require: true
        
    },
    
    questions:[{
        type: mongoose.Types.ObjectId,
        ref: 'Question',
        
    }],
    
    status: {
        type: String,
        enum: ['pending', 'started', 'finished'],
        default: 'pending'
    },
        
   
    
}, {timestamps: true})





const Room = mongoose.model('Room', roomSchema);

module.exports = Room;