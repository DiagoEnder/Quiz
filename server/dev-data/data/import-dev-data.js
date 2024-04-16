const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const User = require('./../../models/userModel');


dotenv.config({ path: './config.env' });



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

//READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));
//Import DATA into DB
const importData = async () => {
    try{
        
        
        await User.create(users, {validateBeforeSave: false});
     
        console.log('Data successfully loaded');
        
    } catch(err) {
        console.log(err);
    }
    process.exit();
};

// DELETE ALL DATA FROM COLLECTION
const deleteData = async () => {  
    try {
       
        await User.deleteMany();
        
        console.log('Deleted all successfully!');
    } catch(err) {
        console.log(err);
    }
    process.exit();
}

if(process.argv[2] === '--import') {
    importData();
} else if(process.argv[2] === '--delete'){
    deleteData();
}

console.log(process.argv);

// node dev-data/data/import-dev-data.js