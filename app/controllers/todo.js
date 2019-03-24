const todoCollection = require('../models/todo')
const userCollection = require('../models/user')
const mongoose = require('mongoose')

exports.findAll = (req, res) => {
  todoCollection.find().populate('userId')
    .then(todo => {
      res.json(todo)
    })
    .catch(err => {
      res.status(500).json({
        'success': false,
        'message': err.message || 'Please Contact Our Admin'
      })
    })
}

exports.findOne = (req, res) => {
  todoCollection.find({ userId: req.decoded._id })
    .then(todo => {
      res.json({
        success: true,
        data: todo
        // user: todo.userId
      })
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).json({
          success: false,
          message: 'Data is not found with id' + req.decoded._id
        })
      }
      res.status(500).json({
        sucess: false,
        message: err.message || 'Please Contact Our Admin'
      })
    })
}

exports.save = (req, res) => {
  req.body._id = new mongoose.Types.ObjectId()
  req.body.userId = req.decoded._id

  todoCollection.create(req.body)
    .then(() => {
      userCollection.findByIdAndUpdate(req.decoded._id, { todo: req.body._id }).exec().then((user) => {
        res.json({
          body: req.body,
          success: true,
          message: 'Todo data successfully saved'
        })
      })
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: err.message || 'Please Contact Our Admin'
      })
    })
}

exports.update = (req, res) => {
  todoCollection.findByIdAndUpdate(req.body.id, {
    list: req.body.list,
    completed: req.body.completed

  })
    .then(() => {
      res.json({
        success: true,
        message: 'Todo data successfully updated'
      })
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).json({
          success: false,
          message: 'Todo is not found with id' + req.body.id
        })
      }
      res.status(500).json({
        success: false,
        message: err.meesage || 'Please Contact Our Admin'
      })
    })
}

exports.delete = (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({
      'success': false,
      'message': 'Field id is required '
    })
  }

  todoCollection.findOneAndDelete({ '_id': req.body.id })
    .then(() => {
      res.json({
        'success': true,
        'message': 'Todo list successfully deleted '
      })
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).json({
          'success': false,
          'message': 'Todo list is not found by ID' + req.body.id
        })
      }
      res.status(500).json({
        'success': false,
        'message': err.message || 'Please Contact Our Admin'
      })
    })
}
