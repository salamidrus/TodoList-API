const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const auth = require('../../middleware/auth')

const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'public/uploads/')
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    let type = file.mimetype
    let typeArray = type.split('/')
    if (typeArray[0] !== 'image') {
      return cb(new Error('Only images allowed!'))
    } else {
      cb(null, true)
    }
  }

})

router.get('/', userController.findAll)
router.get('/find', userController.findOne)
router.post('/save', upload.single('image'), userController.create)
router.post('/login', userController.login)
router.put('/update', upload.single('image'), auth.isAuthenticated, userController.update)
router.delete('/delete', auth.isAuthenticated, userController.delete)

module.exports = router
