const mongoose = require('mongoose');
const { Schema } = mongoose;

const testSchema = new Schema({
    title: String,
    body: String,
    subject: String,
});

mongoose.model('test, ttestSchema');