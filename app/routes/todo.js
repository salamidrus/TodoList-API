const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo');
const authController = require('../../middleware/auth')

router.get('/', todoController.findAll);
router.get('/find', todoController.findOne);
router.post('/save', authController.isAuthenticated, todoController.save);
router.put('/update', authController.isAuthenticated,todoController.update);
router.delete('/delete', authController.isAuthenticated, todoController.delete);

module.exports = router