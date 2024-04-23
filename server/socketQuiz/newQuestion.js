const Room = require('./../models/roomModel')



// Khai báo một hàm để xử lý sự kiện 'createRoom'
async function askNewQuestion({ codeRoom, indexQuestion }) {
    try {
        console.log(`trong function ${codeRoom}, ${indexQuestion}`);
        const room = await Room.findOne({IdRoom:  codeRoom }).populate('questions');
        if (!room) {
            throw new Error('Room not found');
        }
        console.log(room)
        const question = room.questions[indexQuestion];
        console.log(question);
        if (!question) {
            throw new Error('No more question');
        }
        return question;
    } catch (error) {
        throw error;
    }
}
  
  // Khai báo một hàm để xử lý sự kiện 'joinroom'
  function updateResult(socket) {
    return function (nameUser, codeRoom) {
      socket.join(codeRoom);
      console.log(`Room joined: ${codeRoom} + ${nameUser}`);
      socket.io.to(codeRoom).emit('messagejoined', `${nameUser} has joined the game`);
    };
  }
  
  module.exports = {
    askNewQuestion,
    updateResult
  };
  