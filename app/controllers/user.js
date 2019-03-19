const userCollection = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.findAll = (req, res) => {
    userCollection.find().populate('todo')
    .then( user => {
        res.json(user)
    })
    .catch(err => {
        res.status(500).json({
            success : false,
            message : err.message || "Please Contact Our Admin"
        })
    })
}
exports.findOne = (req, res) => {

    userCollection.findById(req.body.id).populate('todo')
    .then( user => {
        res.json({
            success : true,
            data : user,
        })
    })
    .catch( err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).json({
                success : false,
                message : "Data is not found with id" + req.body.id
            })
        }
        res.status(500).json({
            sucess  : false,
            message : err.message || "Please Contact Our Admin"
        })
    })
}

exports.create = (req, res, next) => {
  userCollection.create(req.body)
  .then( () => {
      res.json({
          success : true,
          message : "User data successfully created!"
      })
  })
  .catch( err => {
      res.status(500).json({
          success : false,
          message : err.message || "Please contact our admin!"
      })
  })
}

exports.update = (req, res) => {

    userCollection.findByIdAndUpdate(req.body.id, {
        name : req.body.name,
        username : req.body.username,
        password : req.body.password,
        email : req.body.email,
        image : req.file ? req.file.filename : null
    })
    .then(() => {
        res.json({
            success : true,
            message : "User successfully updated!"
        })
    })
    .catch((err)  => {
        if (err.kind === "ObjectId") {
            return res.status(404).json({
                sucess  : false,
                message : err.message || "Please Contact Our Admin!"

            })
        }
    })  
}

exports.delete  = (req, res) => {
    
      userCollection.findOneAndDelete({ "_id" : req.body.id})
      .then(() => {
          res.json({
              success : true,
              message : "User successfully deleted!"
          })
      })
      .catch( err => {
          if(err.kind === 'ObjectId') {
              return res.status(404).json({
                  success : false,
                  message : "User ID is not found" + req.body.id
              })
          }
          res.status(500).json({
              success : false,
              message : err.message || "Please Contact Our Admin!"
      })
    })
}

exports.login = (req, res, next) => { 
    let user = userCollection.findOne({
        username: req.body.username
    }, (err,obj) => {
        !err ? obj : console.log(err);
    });

user.then((user) => {
    console.log(user);
    console.log(req.body);
    bcrypt.compare(req.body.password, user.password)
    .then( (result) => {
        if(result) {

          let token = jwt.sign(user.toJSON(),
          'abcd123',{
          algorithm: 'HS256'
          });
        res.json({ message : "Successfully logged in!", token})
       } else {
           res.status(401);
           res.send({ message : "Wrong password!"})
       }
    }).catch((err) => {
        console.log(err);
    })


})    
}