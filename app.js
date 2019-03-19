// setting prequisites
const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  morgan = require('morgan')
  app = express();

  app.use(cors());
  app.use(morgan('dev'));

// setting env

const result = require('dotenv').config();
if (result.error) {
    throw result.error
} else {
    console.log(result.parsed)
}

// setup mongoose connection
const mongoose = require('mongoose'),
  mongoDB = process.env.DB_URL;
mongoose.Promise = global.Promise;

mongoose.connect(mongoDB, {
    useNewUrlParser: true
}).then(() => {
    console.log('Successfully connected to the database');
}).catch(err => {
    console.log('Could not connect to the database. Exiting now..', err);
    process.exit(); 
})


// set router here

const todoRouter = require('./app/routes/todo'),
  userRouter = require('./app/routes/user')


app.use(bodyParser.urlencoded({ extended : false}))
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        success : true,
        message : 'Welcome to root page API'
    })
})

app.use('/todo', todoRouter); // set app router
app.use('/user', userRouter);

const port = process.env.PORT;
app.listen(port, () => {
    console.log("Server is listening on " + port)
})