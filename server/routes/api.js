const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const Mentor = require('../models/mentor');
const Admin = require('../models/admin');
const  Course  = require('../models/course');
const EnrolledCourse  = require('../models/EnrolledCourse');
const jwt = require('jsonwebtoken');
let userId ="";
let teacherId ="";
let adminId ="";
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

router.post('/special', (req, res) => {
  let SpecialEventData = req.body

  delete SpecialEventData._id;
  
  userId = req.body.studentId
  console.log("*******from Post Method Api*****"+ userId);

  EnrolledCourse.findOne({ name: SpecialEventData.name , studentId: SpecialEventData.studentId }, (err, eventdetails) => {
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
  //mentorData.name = ""
  //mentorData.technology = ""
  //mentorData.timings = ""
  console.log("****from mentor register api ***"+JSON.stringify(mentorData)) 
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

router.post('/addCourse', (req, res) => {
  let courseData = req.body
  //userId =  req.body.studentId
  //console.log("*********"+userId)
  let courses = new Course(courseData)
  courses.save((err, courseAdded) => {
    if (err) {
      console.log(err)      
    } else {
      res.status(200).send(courseAdded)
    }
  })
});

router.post('/deleteCourse', (req, res) => {
  let courseData = req.body
  Course.remove({_id: courseData._id}, (err, deletedCourse) => {
    if (err) {
      console.log(err)      
    } else {
      res.status(200).send('Course Id '+courseData._id +' is Deleted')
    }
  })
});

router.put('/editCourse', (req, res) => {
  let editCourseData = req.body
  let courseId = req.body._id
  Course.findByIdAndUpdate(courseId,req.body,{new: true},(err, courseEdited) => {
    if (err) {
      console.log(err)      
    } else {
      res.status(200).send(courseEdited)
    }
  })
});



/*router.post('/adminRegister', (req, res) => {
  let adminData = req.body
  adminId = req.body.email
  
  Admin.findOne({email: adminData.email}, (err, admindetails) => {
    if (!admindetails) {
      let admin = new Admin(adminData)
      admin.save((err, registeredAdmin) => {
    if (err) {
      console.log(err)      
    } else {
      let payload = {subject: registeredAdmin._id}
      let token = jwt.sign(payload, 'secretKey')
      let adminsample = {email : admin.email, key:token}
      res.status(200).send({adminsample})
    }
  })      
    } else  {
      console.log(err+" ******Alraedy An Admin exist") 
    }
  })
 
})*/

router.post('/adminLogin', (req, res) => {
  let adminData = req.body
  adminId = req.body.email
  Admin.findOne({email: adminData.email}, (err, admin) => {
    if (err) {
      console.log(err)    
    } else {
      if (!admin) {
        res.status(401).send('Invalid Email')
      } else 
      if ( admin.password !== adminData.password) {
        res.status(401).send('Invalid Password')
      } else {
        let payload = {subject: admin._id}
        let token = jwt.sign(payload, 'secretKey')
        let adminsample = {email : admin.email, key:token}
        res.status(200).send({adminsample})
       
      }
    }
  })
});

router.post('/searchCourse', (req, res) => {
  let searchData = req.body.searchItem
  console.log('**** : ' + JSON.stringify(req.body));
  Course.find({
    $or: [
      { '_id': searchData},
      { 'name': searchData },
      { 'description': searchData }
    ]
  },(err, docs) => {
      if (!err) { res.send(docs); }
      else { console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2)); }
  });
});

router.get('/getMentor',(req, res) => {

  console.log("******from mentors get method Api**" + teacherId);
  Mentor.find({ email: teacherId },(err, docs) => {
      if (!err) { res.send(docs); }
      else { console.log('Error in Retriving Courses :' + JSON.stringify(err, undefined, 2)); }
  });
});

router.put('/editMentor', (req, res) => {
  let editCourseData = req.body
  console.log("************edit mentor*****"+ JSON.stringify(editCourseData))
  let MentorId = editCourseData[0]._id
  console.log("************edit mentor s Id*****"+ MentorId)
  Mentor.findByIdAndUpdate(MentorId, editCourseData[0], {new: true},(err, MentorEdited) => {
    if (err) {
      console.log(err)      
    } else {
      console.log("************edit mentor after metod*****"+ JSON.stringify(MentorEdited))
      res.status(200).send(MentorEdited)
    }
  })
});

module.exports = router;