var seneca = require('seneca')()

seneca.add({role: 'hello', cmd: 'world'}, function (msg, respond) {
var sum = 'hello world';
console.log('Hello World service add');
  respond(null, {answer: sum})
})

seneca.act({role: 'hello', cmd: 'world'}, function (err, result) {
  if (err) return console.error(err)
  var result = 'result is hello world'
  console.log(result)
  done(null, {result: "Hi there"});
})

seneca.listen({"type": "http", "port": 8080});
