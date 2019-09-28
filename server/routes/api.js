const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Mentor = require('../models/mentor');
const  Course  = require('../models/course');
const EnrolledCourse  = require('../models/EnrolledCourse');
const jwt = require('jsonwebtoken');
let userId ="";
let teacherId ="";
mongoose.Promise = global.Promise;
const db = "mongodb://localhost:27017/pritam_db";

//const db = "mongodb+srv://pritam03:tukai1996@cluster0-v2k4n.mongodb.net/pritam_db"

mongoose.connect(db, function(err){
    if(err){
        console.error('Error! ' + err)
    } else {
      console.log('Connected to mongodb')      
    }
});

function verifyToken(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if(token === 'null') {
    return res.status(401).send('Unauthorized request')    
  }
  let payload = jwt.verify(token, 'secretKey')
  if(!payload) {
    return res.status(401).send('Unauthorized request')    
  }
  req.userId = payload.subject
  next()
}

router.get('/events', (req, res) => {
  Course.find((err, docs) => {
      if (!err) { res.send(docs); }
      else { console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2)); }
  });
});

router.post('/events', (req, res) => {
  let eventData = req.body
  //userId =  req.body.studentId
  //console.log("*********"+userId)
  let events = new Course(eventData)
  events.save((err, registeredEvents) => {
    if (err) {
      console.log(err)      
    } else {
      res.status(200).send(registeredEvents)
    }
  })
});



router.get('/special', verifyToken, (req, res) => {

  console.log("******from special get method Api**" + userId);
  EnrolledCourse.find({ studentId: userId },(err, docs) => {
      if (!err) { res.send(docs); }
      else { console.log('Error in Retriving Courses :' + JSON.stringify(err, undefined, 2)); }
  });
});

router.post('/special', verifyToken, (req, res) => {
  let SpecialEventData = req.body
  userId = req.body.studentId
  console.log("*******from Post Method Api*****"+ userId);

  EnrolledCourse.findOne({ course_id: SpecialEventData.course_id , 
     name: SpecialEventData.name , studentId: SpecialEventData.studentId }, (err, eventdetails) => {
    if (!eventdetails) {
      let specialevents = new EnrolledCourse(SpecialEventData)
      specialevents.save((err, enrolledEvents) => {
        if (err) {
          console.log(err)      
        } else {
          let enrollEvents = {keyCourse:enrolledEvents.studentId}
          res.status(200).send({enrollEvents})
        }
      })
    } else {
      res.status(401).send('Alraedy you enrolled for the course, Choose another')
      console.log(err+" ******Alraedy A Course exist") 
    }
  })
});

router.get('/courses',(req, res) => {

  console.log("******from courses get method Api**" + userId);
  EnrolledCourse.find({ mentorId: teacherId },(err, docs) => {
      if (!err) { res.send(docs); }
      else { console.log('Error in Retriving Courses :' + JSON.stringify(err, undefined, 2)); }
  });
});

router.post('/register', (req, res) => {
  let userData = req.body
  userId = req.body.email
  
  User.findOne({email: userData.email}, (err, userdetails) => {
    if (!userdetails) {
      let user = new User(userData)
      user.save((err, registeredUser) => {
    if (err) {
      console.log(err)      
    } else {
      let payload = {subject: registeredUser._id}
      let token = jwt.sign(payload, 'secretKey')
      let sample = {email : user.email, key:token}
      res.status(200).send({sample})
    }
  })      
    } else  {
      console.log(err+" ******Alraedy An user exist") 
    }
  })
 
})

router.post('/login', (req, res) => {
  let userData = req.body
  userId = req.body.email
  User.findOne({email: userData.email}, (err, user) => {
    if (err) {
      console.log(err)    
    } else {
      if (!user) {
        res.status(401).send('Invalid Email')
      } else 
      if ( user.password !== userData.password) {
        res.status(401).send('Invalid Password')
      } else {
        let payload = {subject: user._id}
        let token = jwt.sign(payload, 'secretKey')
        let sample = {email : user.email, key:token}
        res.status(200).send({sample})
      }
    }
  })
})

router.post('/mentorRegister', (req, res) => {
  let mentorData = req.body
  teacherId = req.body.email
  
  Mentor.findOne({email: mentorData.email}, (err, mentordetails) => {
    if (!mentordetails) {
      let mentor = new Mentor(mentorData)
      mentor.save((err, registeredMentor) => {
    if (err) {
      console.log(err)      
    } else {
      let payload = {subject: registeredMentor._id}
      let token = jwt.sign(payload, 'secretKey')
      let mentorsample = {email : mentor.email, key:token}
      res.status(200).send({mentorsample})
    }
  })      
    } else  {
      console.log(err+" ******Alraedy An user exist") 
    }
  })
 
})

router.post('/mentorLogin', (req, res) => {
  let mentorData = req.body
  teacherId = req.body.email
  Mentor.findOne({email: mentorData.email}, (err, mentor) => {
    if (err) {
      console.log(err)    
    } else {
      if (!mentor) {
        res.status(401).send('Invalid Email')
      } else 
      if ( mentor.password !== mentorData.password) {
        res.status(401).send('Invalid Password')
      } else {
        let payload = {subject: mentor._id}
        let token = jwt.sign(payload, 'secretKey')
        let mentorsample = {email : mentor.email, key:token}
        res.status(200).send({mentorsample})
       
      }
    }
  })
})

module.exports = router;