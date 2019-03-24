const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TodoSchema = Schema({
  _id: Schema.Types.ObjectId,
  list: {
    type: String, require: [true, "Can't be blank!"], max: 100
  },
  completed: {
    type: Boolean, default: false, require: [true, 'Please update todo list'], max: 100
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
},
{
  timestamps: true
}
)

module.exports = mongoose.model('Todo', TodoSchema)
