const mongoose = require('mongoose')
const { Schema } = mongoose;
const valuesSchema = require('./Values')
const questionSchema = new Schema({
  type: String,
  subtype: String,
  label: String,
  access: Boolean,
  required: Boolean,
  className: String,
  name: String,
  requireValidOption: String,
  values: [valuesSchema],
  toggle: Boolean,
  inline: Boolean,
  style: String,
  other: Boolean,
  multiple: Boolean,
});
module.exports = questionSchema