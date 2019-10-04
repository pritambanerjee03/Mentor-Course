const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SpecialeventSchema = new Schema({
    name:String,
    mentorId: String,
    description:String,
    date:String,
    studentId: String
});

module.exports = mongoose.model('enrolledcourse', SpecialeventSchema, 'EnrolledCourses');