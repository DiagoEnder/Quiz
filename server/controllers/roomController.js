const Room = require('./../models/roomModel')
const User = require('./../models/userModel')
const Quiz = require('./../models/quizModel')
const Question = require('./../models/questionModel');

const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')

const generateIdRoom = () => {
    let val;
    let isUnique = false;
    
    while(!isUnique) {
        val = Math.floor( 1000 + Math.random() * 9000)
        
        const existRoom = Room.find({IdRoom: val})
        
        if(existRoom) {
            isUnique = true;
        }
        
    }
    
    
    
    return val;
      
}

exports.createRoom = catchAsync(async (req, res, next) => { 
    const IdRoom = generateIdRoom()
    console.log(IdRoom);
    const {IdUser} = req.body
    const owner = await User.findById(IdUser).select('-password')
    
    if(!owner) {
        return next(new AppError('User not found', 404))
    }
    
    const idQuiz = req.params.quizId
    
    const newRoom = await Room.create({
        IdRoom,
        owner: owner,
        players:[owner],
        quizId: idQuiz
    })
    
    res.status(201).json({
        status:'success',
        data: {
            data: newRoom
        }
    })
    
})




