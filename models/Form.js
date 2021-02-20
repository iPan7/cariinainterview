const mongoose = require('mongoose')
const { Schema } = mongoose;
const questionSchema = require('./Question')
const formSchema = new Schema({
  questions: [questionSchema],
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
});
const Form = mongoose.model('form', formSchema);
module.exports = Form;