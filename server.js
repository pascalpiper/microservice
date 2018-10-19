var seneca = require('seneca')()
var entities = require('seneca-entity')
var express = require('express');
var bodyParser =require("body-parser");
var app = express();

seneca.use('mongo-store', {
  name: 'meinedatenbank',
  host: '127.0.0.1',
  port: 27012,
  options: {}
}).use(entities)

//bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//schlecht gelöst
var studentID = 0;

// Make some dummy-entities - hardcodet
var student = seneca.make('student')

student.id = studentID;
studentID++;
student.vorname = 'Pascal'
student.nachname = 'Piper'
student.matrikelnummer = '11115314'
student.studiengang = 'Allgemeine Informatik'
student.semester = '7'
student.mail = 'pascal-piper@gmx.de'

student.save$(function(err,student){
  console.log(student)
})

var student2 = seneca.make('student')

student2.id = studentID;
studentID++;
student2.vorname = 'Hans'
student2.nachname = 'Peter'
student2.matrikelnummer = '11115315'
student2.studiengang = 'Allgemeine Informatik'
student2.semester = '4'
student2.mail = 'hans-peter@gmx.de'

student2.save$(function(err,student){
  console.log(student)
})

var student3 = seneca.make('student')

student3.id = studentID;
studentID++;
student3.vorname = 'Tim'
student3.nachname = 'Mueller'
student3.matrikelnummer = '11115415'
student3.studiengang = 'Allgemeine Informatik'
student3.semester = '8'
student3.mail = 'tim-mueller@gmx.de'

student3.save$(function(err,student){
  console.log(student)
})

var foo_entity = seneca.make('student')
foo_entity.list$( {id: '1'}, function(err,list){
  var i = 1
  list.forEach(function( foo ){
    console.log(i + '. Student  ' + foo.nachname + 'geladen ID: '+ foo.id)
    i++;
  });
})

// Rest API

// get - respond list of all students
app.get('/students', function (req, res) {
   var foo_entity = seneca.make('student')
   foo_entity.list$( {}, function(err,list){
     var i = 0;
     console.log('Ausgabe Studenten: ')
     var studentList;
     list.forEach(function( foo ){
       console.log(i + '. Student  ' + foo.nachname)
       // studentList = studentList + i + '. Student  ' + foo.nachname;
       if(i == 0 ){
         studentList = foo;
       }
       else {
       studentList = studentList + foo;
     }
       i++;
     });
     res.end(studentList);
   })
})

// get - respond one student
app.get('/students/:id', function (req, res) {
  // var respond;
  // foo_entity.load$(req.params.id, function(err,student){
  // console.log('load' + student)
  // respond = 'Student' + student;
  var foo_entity = seneca.make('student')
  foo_entity.list$( {id: parseInt(req.params.id)}, function(err,list){
    var i = 0;
    console.log('Ausgabe Studenten: ')
    var studentList;
    list.forEach(function( foo ){
      console.log(i + '. Student  ' + foo.nachname)
      // studentList = studentList + i + '. Student  ' + foo.nachname;
      // if(i == 0 ){
      //   studentList = foo;
      // }
      // else {
      studentList = studentList + foo;
    // }
      i++;
    });
    res.end(studentList);
  })
})
// res.end(student.nachname);
// })

// post - add a new student
app.post('/students/', function (req, res) {
  var newStudent = seneca.make('student')

  var firstName=req.body.first_name;
  var lastName=req.body.last_name;
  var matriculationNumber=req.body.matriculation_number;
  var course = req.body.course;
  var email = req.body.email;

  studentID++;
  newStudent.id = studentID;

  newStudent.vorname = req.body.first_name;
  newStudent.nachname = req.body.last_name;
  newStudent.matrikelnummer =  req.body.matriculation_number;
  newStudent.studiengang = req.body.course;
  newStudent.semester = '7'
  newStudent.mail = req.body.email;

  newStudent.save$(function(err,newStudent){
    console.log(newStudent)
  })

  console.log('post' +firstName+lastName+matriculationNumber+course,email);
  res.end('addStudent');
})

// delete - delete a student
app.delete('/students/:id', function (req, res) {
  foo_entity.remove$(req.params.id, function(err,student){
  console.log('remove')
  respond = 'Student' + student;
})
res.end('remove ' + req.params.id);
})

//PATCH - Student ändern

// post - add a new student
app.patch('/students/:id', function (req, res) {
  var newStudent = seneca.make('student')

  foo_entity.remove$(req.params.id, function(err,student){
  console.log('remove')
})

var firstName=req.body.first_name;
var lastName=req.body.last_name;
var matriculationNumber=req.body.matriculation_number;
var course = req.body.course;
var email = req.body.email;

  newStudent.id = parseInt(req.params.id);

  newStudent.vorname = req.body.first_name;
  newStudent.nachname = req.body.last_name;
  newStudent.matrikelnummer =  req.body.matriculation_number;
  newStudent.studiengang = req.body.course;
  newStudent.semester = '7'
  newStudent.mail = req.body.email;

  newStudent.save$(function(err,newStudent){
    console.log(newStudent)
  })

  console.log('post' +firstName+lastName+matriculationNumber+course,email);
  res.end('addStudent');
})


//start server
var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
//
})
