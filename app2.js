// var http = require("http");
// var express = require('express');
// var app = express();
// var mysql      = require('mysql');
// const port = 5006
// var bodyParser = require('body-parser');

// var connection = mysql.createConnection({
//   host     : 'localhost', //mysql database host name
//   user     : 'root', //mysql database user name
//   password : '', //mysql database password
//   database : 'dbabsen' //mysql database name
// });

// connection.connect(function(err) {
//   if (err) throw err
//   console.log('You are now connected with mysql database...')
// })

// app.use( bodyParser.json() );       // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//   extended: true
// }));

// app.get('/user', function (req, res) {
//    connection.query('select * from mahasiswa', function (error, results, fields) {
// 	  if (error) throw error;
// 	  res.end(JSON.stringify(results));
// 	});
// });

// app.post('/tambahmahasiswa', function (req, res) {
//   var nrp = req.body.nrp;
// 	var nama = req.body.nama;
// 	var password = req.body.password;
//    // console.log(params);
//    connection.query('INSERT INTO mahasiswa VALUES (?,?,?)', [nrp, nama, password], function (error, results, fields) {
// 	  if (error) throw error;
// 	  res.end(JSON.stringify(results));
// 	});
// });
// app.get('/rekap/')

// app.listen(port, () => console.log(`Listening on port ${port}!`))

var express = require('express'),
    app = express(),
    port = process.env.PORT || 5006,
    bodyParser = require('body-parser'),
    controller = require('./controller');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes');
routes(app);

app.listen(port);
console.log('Listening on port ' + port);