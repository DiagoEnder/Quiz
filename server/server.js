const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
process.on('uncaughtException', err => {
  console.log('Uncaught Exception: Shutting down')
  console.log(err.name, err.message);
   
    process.exit(1);
  
})


const {server, io} = require('./app');


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
  .then(()=> {console.log('DB connection successful');
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
})
//setupSOcket
// const io = require('socket.io')(server, {
//   cors: {
//     origin: '*',
//   },
// });



process.on('unhandledRejection' , err => {
  console.log('unhandledRejection: Shutting down')
  console.log(err.name, err.message);
  server.close(() => {
    
    process.exit(1);
  })
})
