var MongoClient = require('mongodb').MongoClient;
//create a database named anything_db
var url= "mongodb://localhost:27017/pritam_db";

//var url = "mongodb+srv://pritam03:tukai1996@cluster0-v2k4n.mongodb.net/pritam_db"

MongoClient.connect(url,{ useUnifiedTopology: true } , function(err,dbcon){
    if(err) throw err;
    var dbo = dbcon.db("pritam_db");
    var record=[
        {
            _id: "1",
            name: "Java Full Stack",
            mentorId:"jag123@gmail.com",
            description: "Java with Spring Boot Technology",
            date: "Mon-Fri(5pm-7pm)",
            duration: "8 weeks",
            courseFee: "Rs.4500"
          },
          {
            _id: "2",
            name: "Mean Stack",
            mentorId:"amar09@yahoo.com",
            description: "Mean with Angular 8",
            date: "Mon-Fri(7pm-9pm)",
            duration: "8 weeks",
            courseFee: "Rs.5500"
          },
          {
            _id: "3",
            name: ".Net full Stack",
            mentorId:"yashRam89@hotmail.com",
            description: ".Net core with MVC",
            date: "Fri-Sun(10am-12am)",
            duration: "8 weeks",
            courseFee: "Rs.5000"
          },
          {
            _id: "4",
            name: "Advance Java",
            mentorId:"jag123@gmail.com",
            description: "Java with JSP,Servlet",
            date: "Mon-Fri(6pm-7pm)",
            duration: "6 weeks",
            courseFee: "Rs.4200"
          },
          {
            _id: "5",
            name: "No Sql & Sql",
            mentorId:"yashRam89@hotmail.com",
            description: "MongoDb with Mysql, Oracle",
            date: "Tue-Thur(2pm-5pm)",
            duration: "4 weeks",
            courseFee: "Rs.4000"
          },
          {
            _id: "6",
            name: "PHP Framework",
            mentorId:"amar09@yahoo.com",
            description: "Core PHP with CodeIgniter",
            date: "Sun-Mon(7pm-9pm)",
            duration: "6 weeks",
            courseFee: "Rs.4500"
          }
        

    ] ;
    dbo.collection("courses").insertMany(record,function(err,res){
        if(err) throw err;
    console.log('No of documents Inserted '+res.insertedCount);
    dbcon.close();
    });
});