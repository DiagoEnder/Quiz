const Room = require('./../models/roomModel')
const User = require('./../models/userModel')
// const Quiz = require('./../models/quizModel')
const Question = require('./../models/questionModel');

const catchAsync = require('./../utils/catchAsync')
const AppError = require('./../utils/appError')

exports.setRoomUser = (req,res,next) => {
    if(!req.body.user) req.body.user = req.user.name
    
    next();
}

exports.setOwnerRoom = (req,res,next) => {
    if(!req.body.owner) req.body.owner = req.user._id
    
    next();
}

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

exports.deleteRoom = catchAsync(async (req, res, next) => {
    
    const {IdRoom, IdOwner } = req.body
    
    const room = await Room.findOne({IdRoom}).populate('owner')
                                 
                        
    if(!room) {
        return next(new AppError('Room not found', 404))
    }
    
    console.log(room.owner._id)
    
    if(room.owner._id.toString() !== IdOwner) {
        return next(new AppError('You are not the owner of this room', 401))
    }
    
     await Room.findByIdAndDelete(room._id)
    
     
     res.status(204).json({
         status:'success',
         message: 'Successfully deleted'
     })
    
})

exports.checkExistRoom = catchAsync(async (req,res, next) => {
    const codeRoom = req.params.roomId
    
    const room = await Room.findOne({IdRoom: codeRoom})
    
    if(!room) {
        return next(new AppError('Room not found', 404))
    }

   
   if(room.status !== 'pending') {
    return next(new AppError('Room is not ready or started', 404))
   }
    
    res.status(200).json({
        status:'success',
        message: 'Room successfully',
        data: {
            data: room
        }
    })
})



exports.joinRoom = catchAsync(async (req, res, next) => {
    
    const {codeRoom} = req.body
    const {nameUser} = req.body

   const val = Math.round(1000 + Math.random() *9000).toString()
   const user = {
    name: nameUser,
    id: val
   }
   
   const room = await Room.findOne({IdRoom: codeRoom})
   
   if(room.status !== 'pending') {
    return next(new AppError('Room is not ready or started', 404))
   }
   
    const updateRoom = await Room.findOneAndUpdate({IdRoom: codeRoom},  {$push: {players: user
        
    }}, {new: true})
    
    if(!updateRoom) {
        return next(new AppError('Error in Enter Room', 500))
    }
    
    res.status(201).json({
        status:'success',
        data: {
            data: updateRoom
        }
    })
    
    
})

exports.currentRoom = catchAsync(async (req, res, next) => {
    const {codeRoom} = req.body
    
    const room = await Room.findOne({IdRoom: codeRoom}).populate('owner').populate('quizId').populate('questions')
    
    if(!room) {
        return next(new AppError('Room not found', 404))
    }
    
    res.status(200).json({
        status:'success',
        message: 'Room successfully',
        data: {
            data: room
        }
    })
})

exports.leaveRoom = catchAsync(async (req, res, next) => {
       
    const {IdPlayer, IdRoom} = req.body
    const room = await Room.findById(IdRoom)
    
    if(!room) {
        return next(new AppError('Room not found', 404))
    }
    
    
    
    
    const updateRoom = await Room.findByIdAndUpdate(IdRoom, {
        $pull: { players: {_id : IdPlayer}  },
        ready: false
    }, {new: true})
    
    if(!updateRoom) {
        return next(new AppError('You are not in Room', 500))
    }
    
    res.status(200).json({
        status:'success',
        message: 'You left the room',
        data: {
            data: null
        }
    })
})

exports.kickPlayer = catchAsync(async (req, res, next) => {
    const {IdOwner,id, _idPlayers} = req.body
    
    const room = await Room.findById(id).populate('owner')
    
    if(!room) {
        return next(new AppError('Room not found', 404))
    }
    
    if(room.owner._id.toString() !== IdOwner) {
        return next(new AppError('You are not the owner of this room', 401))
    }
   
    if(room.owner._id.toString() === _idPlayers) {
        return next(new AppError('You are not remove yourselt of this room', 401))
    }
    
    const updateRoom = await Room.findByIdAndUpdate(id, {
        $pull: { players: {_id : _idPlayers}  },
        ready: false
    }, {new: true}
    
    )
    
    
    res.status(200).json({
        status:'success',
        message: 'Successfully deleted player',
        data: {
            data: updateRoom
        }
    })
    
    
})

exports.startRoom = catchAsync(async (req,res,next) => {
    const {IdRoom, Idowner} = req.body
    const {quizId} = req.params
    
    const room = await Room.findById(IdRoom)
    
    if(room.owner._id.toString()!== Idowner) {
        return next(new AppError('You are not the owner of this room', 401))
    }
    
    if(!room) {
        return next(new AppError('Room not found', 404))
    }
    
    const question = await Question.find({quiz: quizId})
    
    if(!question) {
        return next(new AppError('Question not found or Error to connect Server', 404))
    }
    
    if(room.status !== 'pending') {
        return next(new AppError('Room is not ready or started', 404))
    }
    
    const updateRoom = await Room.findByIdAndUpdate(IdRoom, {
        $push: {questions: question}
    }, {new: true}).populate('questions')
    
    if(!updateRoom) {
        return next(new AppError('Error in Start Room', 500))
    }

    
    res.status(200).json({
        status:'success',
        message: 'Room successfully started',
        data: {
            data: updateRoom
        }
    })
})

exports.pushResult = catchAsync(async (req, res, next)=> {
    const {roomId, playerId, score} = req.body
    
    const room = await Room.findById(roomId)
    
    if(!room) {
        return next(new AppError('Room not found', 404))
    }
    
    if(room.players.find(player => player._id === playerId)) {
        return next(new AppError('You are not already in this room', 401))
    }
    
    const updateScore = await Room.findByIdAndUpdate(
        roomId,
        { $inc: { 'players.$[elem].result': score } }, // Cập nhật kết quả của người chơi
        { arrayFilters: [{ 'elem._id': playerId }], new: true } // Lọc người chơi cần cập nhật
      );
      
    
    if(!updateScore) {
        return next(new AppError('Error in Push Result', 500))
    }
    
    res.status(200).json({
        status:'success',
        message: 'Result successfully pushed',
        data: {
            data: null
        }
    })
})





