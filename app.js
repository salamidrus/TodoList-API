// setting prequisites
const express = require('express'),
  bodyParser = require('body-parser'),
  dbConfig = require('./config/database.config'),
  cors = require('cors'),
  morgan = require('morgan')
  app = express();

  app.use(cors());
  app.use(morgan('dev'));


// setup mongoose connection
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParse: true
}).then(() => {
    console.log('Successfully connected to the database');
}).catch(err => {
    console.log('Could not connect to the database. Exiting now..', err);
    process.exit(); //tanya bang agus
})


// set router here

const todoRouter = require('./app/routes/todo');
const userRouter = require('./app/routes/user')

// regex

const regex = new RegExp('(?=.*\d)')


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

const port = 8000;
app.listen(port, () => {
    console.log("Server is listening on " + port)
})