const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
process.on('uncaughtException', err => {
  console.log('Uncaught Exception: Shutting down')
  console.log(err.name, err.message);

  process.exit(1);

})


const { server, io } = require('./app');
const { askNewQuestion } = require('./socketQuiz/newQuestion')

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful');
  });

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`)

  socket.on('createRoom', () => {
    console.log(`Room created: ${socket.room}`)
  })

  // socket.on('joinroom', (nameUser, codeRoom) => {
  //   socket.join(codeRoom)
  //   console.log(`Room joined: ${codeRoom} + ${nameUser}`)
  //   io.to(codeRoom).emit('messagejoined', `${nameUser} has join the game`)
  // })
  //
  socket.on('joinroom', (data) => {
    socket.join(data.codeRoom)
    console.log(`Room joined: ${data.codeRoom} + ${data.nameUser}`)
    io.to(data.codeRoom).emit('messagejoined', `${data.nameUser} has join the game`)
  })

  socket.on('leaveroom', (data) => {
    socket.join(data.codeRoom)
    console.log(`Room joined: ${data.codeRoom} + ${data.nameUser}`)
    io.to(data.codeRoom).emit('messagejoined', `${data.nameUser} has join the game`)
  })
  //
  socket.on('asknewquestion', async (codeRoom, indexQuestion) => {
    try {

      const data = await askNewQuestion({ codeRoom, indexQuestion })
      console.log(`ngoài fucntion quesiton ${data} `)
      // socket.to(codeRoom).emit('newQuestion', data)
      io.to(codeRoom).emit('newQuestion', data)
    } catch (err) {
      console.error('Error fetching data from API:', err);
      socket.emit('apiError', err.message); // Gửi thông báo lỗi đến client nếu có lỗi xảy ra
    }

  })


})


process.on('unhandledRejection', err => {
  console.log('unhandledRejection: Shutting down')
  console.log(err.name, err.message);
  server.close(() => {

    process.exit(1);
  })
})