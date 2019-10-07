const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mentorSchema = new Schema({
    email: String,
    password: String,
    name:String,
    technology:String,
    timings:String
});

module.exports = mongoose.model('mentor', mentorSchema, 'mentors');