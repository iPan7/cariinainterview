const mongoose = require('mongoose')
const { Schema } = mongoose;
const valuesSchema = new Schema({
  label: String,
  value: String,
  selected: Boolean,
});
module.exports = valuesSchema