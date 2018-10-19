var seneca = require('seneca')()
var entities = require('seneca-entity')

seneca.use('mongo-store', {
  name: 'meinedatenbank',
  host: '127.0.0.1',
  port: 27012,
  options: {}
}).use(entities)

// Make some dummy-entities
var student = seneca.make('student')

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
foo_entity.list$( {matrikelnummer: '11115314'}, function(err,list){
  var i = 1
  list.forEach(function( foo ){
    console.log('habe geladen' + i + '. Student  ' + foo.nachname)
    i++;
  })

  //get
  seneca.get('/listUsers', function (req, res) {


     var data = 'test ausgabe'
     console.log( data );
     res.end( data );
  })
  //


  //start server
  var server = seneca.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
  })
  //
