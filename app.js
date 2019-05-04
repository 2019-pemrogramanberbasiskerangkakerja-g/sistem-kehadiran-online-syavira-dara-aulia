const express = require('express')
const app = express()
var path = require('path');
const port = 5005
var response = require('./res');
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
app.use(bodyParser.json());
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
// app.use(bodyParser.urlencoded({extended : true}));


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

//API//
app.get('/users',(req, res) => {
  let sql = "SELECT * FROM mahasiswa";
  let query = connection.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify(results));
  });
});

app.get('/rekap/:fk_kode_mk/:id_pertemuan',(req, res) => {
	var fk_kode_mk = req.params.fk_kode_mk;
	var id_pertemuan = req.params.id_pertemuan;
    connection.query('SELECT * FROM jadwal_kuliah where fk_kode_mk = ? AND id_pertemuan= ?',
    [ fk_kode_mk, id_pertemuan ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
});

app.get('/rekap/:kode_mk',(req, res) => {
	var kode_mk = req.params.kode_mk;

    connection.query('SELECT * FROM mata_kuliah where kode_mk = ?',
    [ kode_mk ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
});

app.get('/rekapmahasiswa/:nrp/:kode_mk',(req, res) => {
	var kode_mk = req.params.kode_mk;
	var nrp = req.params.nrp;

    connection.query('SELECT * FROM peserta_kelas where nrp = ? AND kode_mk = ?',
    [ nrp , kode_mk ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
});

app.get('/rekapmahasiswa/:nrp/:semester',(req, res) => {
	
	var nrp = req.params.nrp;
	var semester = req.params.semester;
    connection.query('SELECT * FROM peserta_kelas where nrp = ? AND semester = ?',
    [ nrp , semester ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
});

// app.get('/rekapmahasiswa/:nrp/:semester',(req, res) => {
	
// 	var nrp = req.params.nrp;
// 	var semester = req.params.semester;
// 	// SELECT peserta_kelas.nrp, peserta_kelas.kode_mk
// 	// FROM peserta_kelas
// 	// INNER JOIN mata_kuliah ON peserta_kelas.kode_mk=mata_kuliah.kode_mk where nrp = ? AND semester = ?
//     connection.query('SELECT peserta_kelas.nrp,peserta_kelas.kode_mk FROM peserta_kelas INNER JOIN mata_kuliah ON peserta_kelas.kode_mk=mata_kuliah.kode_mk where peserta_kelas.nrp = ? AND mata_kuliah.semester = ?',
//     [ nrp , semester ], 
//     function (error, rows, fields){
//         if(error){
//             console.log(error)
//         } else{
//             response.ok(rows, res)
//         }
//     });
// });


/////INI MASIH BINGUNG DI DB ADA JAM. PASSINGNYA DATA GIMANA LEWAT API NYA//
// app.post('/absen/:ruang/:nrp_mahasiswa',(req, res) => {
// 	var nrp_mahasiswa = req.params.nrp_mahasiswa;
//     var ruang = req.params.ruang;
//     var date = new Date();
// 	var current_hour = date.getHours();

//     connection.query('INSERT INTO log_absen (ruang, nrp_mahasiswa) values (?,?)',
//     [ ruang, nrp_mahasiswa ], 
//     function (error, rows, fields){
//         if(error){
//             console.log(error)
//         } else{
//             response.ok("Berhasil absen!", res)
//         }
//     });
// });

app.post('/tambahmahasiswa',(req, res) => {
  let data = {nrp: req.body.nrp, nama: req.body.nama, password: req.body.password};
  let sql = "INSERT INTO mahasiswa SET ?";
  let query = connection.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify(results));
  });
});

app.post('/tambahmatkul',(req, res) => {
	var kode_mk = req.body.kode_mk;
    var mata_kuliah = req.body.mata_kuliah;
    var kelas = req.body.kelas;
    connection.query('INSERT INTO mata_kuliah (kode_mk, mata_kuliah,kelas) values (?,?,?)',
    [ kode_mk, mata_kuliah,kelas ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menambahkan mata kuliah!", res)
        }
    });
});

app.post('/tambahpeserta/:nrp/:kode_mk',(req, res) => {
	var kode_mk = req.params.kode_mk;
    var nrp= req.params.nrp;
    connection.query('INSERT INTO peserta_kelas (nrp, kode_mk) values (?,?)',
    [ nrp, kode_mk ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menambahkan mahasiswa ke peserta kelas!", res)
        }
    });
});

app.post('/tambahjadwal',(req, res) => {
	var fk_kode_mk = req.body.fk_kode_mk;
    var id_pertemuan = req.body.id_pertemuan;
    var jam_masuk = req.body.jam_masuk;
    var jam_pulang = req.body.jam_pulang;
    var ruang = req.body.ruang;
    connection.query('INSERT INTO jadwal_kuliah (id_pertemuan,fk_kode_mk, jam_masuk, jam_pulang, ruang) values (?,?,?,?,?)',
    [ id_pertemuan, fk_kode_mk, jam_masuk, jam_pulang, ruang ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menambahkan mata kuliah!", res)
        }
    });
});

app.get('/logout', function(req, res) {
	req.session.loggedin=false;
	res.redirect('/login');
});

app.listen(port, () => console.log(`Listening on port ${port}!`))