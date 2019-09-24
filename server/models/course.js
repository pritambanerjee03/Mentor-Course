const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    course_id: String,
    name:String,
    description:String,
    date:String
});

module.exports = mongoose.model('course', eventSchema, 'courses');