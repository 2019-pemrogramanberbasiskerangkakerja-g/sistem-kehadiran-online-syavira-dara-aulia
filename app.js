const express = require('express')
const app = express()
var path = require('path');
const port = 5005
//app.use(express.static('public'));
var mysql = require('mysql');
var session = require('express-session');
var bodyParser = require('body-parser');

app.get('/login', function(req, res) {
	res.render('login.ejs');
});
app.get('/regis', function(req, res) {
	res.render('registrasi');
});
app.get('/succeslogin', function(req, res){
	res.render('home');
});
app.get('/failed', function(req, res){
	res.render('failed_login');
});

app.set('view engine', 'ejs');
app.set('public', './public');
//app.set('public', __dirname + '/public');
app.use(express.static(path.join(__dirname, 'public')));

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'dbabsen'
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//INPUT NRP AND PASSWORD TO LOGIN

//REGISTRASI
app.post('/registrasi', function(request, response) {
	var nrp = request.body.nrp;
	var nama = request.body.nama;
	var password = request.body.password;
	//var job = request.body.job;
		connection.query('INSERT INTO mahasiswa VALUES (?, ?, ?)', [nrp, nama, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.nama = nama;
				response.redirect('/home');
			} else {
				request.session.loggedin = true;
				response.redirect('/home');
				console.log("Berhasil menambahkan " + nama + " pada database");
			}			
			response.end();
		});
});

//AUTHENTIKASI UNTUK LOGIN
app.post('/auth', function(req, res) {
	var nrp = req.body.nrp;
	//var nama = req.body.nama;
	var password = req.body.password;
	if (nrp && password) {
		connection.query('SELECT * FROM mahasiswa WHERE nrp = ? AND password = ?', [nrp, password], function(error, results, fields) {
			//console.log(results);
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.nrp = nrp;
				Object.keys(results).forEach(function(key) {
      				var row = results[key];
      				req.session.nama = row.nama;
      				console.log(row.nama + " berhasil login")
    			});
				//console.log(results);

				res.redirect('/home');
			} else {
				res.send('NRP atau Password salah!');
			}			
			res.end();
		});
	} else {
		res.send('Mohon masukkan NRP dan password anda!');
		res.end();
	}
});

//SUCCESS LOGIN
app.get('/home', function(req, res) {
	if (req.session.loggedin) {
		//connection.query('SELECT * FROM mahasiswa WHERE nrp = ?', [req.session.nrp], function(error, results, fields){
			//console.log(results);
			//if (error) {
			//	res.send(error);
			//}
			res.render('home.ejs');
		//});
		
		//res.send('Selamat Datang, ' + req.session.nama + '!');
		//res.redirect('/succeslogin');
		
		//console.log(results);
	} else {
		//res.send('Login terlebih dahulu untuk melihat halaman ini!');
		res.render('failed_login.ejs');
	}
	res.end();
});

app.get('/logout', function(req, res) {
	req.session.loggedin=false;
	res.redirect('/login');
});

app.listen(port, () => console.log(`Listening on port ${port}!`))