var MongoClient = require('mongodb').MongoClient;
//create a database named anything_db
var url= "mongodb://localhost:27017/pritam_db";

//var url = "mongodb+srv://pritam03:tukai1996@cluster0-v2k4n.mongodb.net/pritam_db"

MongoClient.connect(url,{ useUnifiedTopology: true } , function(err,dbcon){
    if(err) throw err;
    var dbo = dbcon.db("pritam_db");
    var record=[
        {
            _id: "7",
            name: "Trainer 1",
            mentorId:"b@n.com",
            description: "Java Trainer",
            date: "Mon-Fri(5pm-7pm)"
          },
          {
            _id: "8",
            name: "Trainer 2",
            mentorId:"a@m.com",
            description: "MVC Trainer",
            date: "Mon-Fri(7pm-9pm)"
          },
          {
            _id: "9",
            name: "Trainer 3",
            mentorId:"b@n.com",
            description: ".Net Trainer",
            date: "Fri-Sun(10am-12am)"
          },
          {
            _id: "10",
            name: "Trainer 4",
            mentorId:"a@m.com",
            description: "Database Trainer",
            date: "Mon-Fri(6pm-7pm)"
          },
          {
            _id: "11",
            name: "Trainer 5",
            mentorId:"b@n.com",
            description: "Mean Stack Trainer",
            date: "Tue-Thur(2pm-5pm)"
          },
          {
            _id: "12",
            name: "Trainer 6",
            mentorId:"a@m.com",
            description: "PHP Trainer",
            date: "Sun-Mon(7pm-9pm)"
          }
        

    ] ;
    dbo.collection("courses").insertMany(record,function(err,res){
        if(err) throw err;
    console.log('No of documents Inserted '+res.insertedCount);
    dbcon.close();
    });
});