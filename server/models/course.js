const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    _id: String,
    name:String,
    mentorId:String,
    description:String,
    date:String
});

module.exports = mongoose.model('course', eventSchema, 'courses');