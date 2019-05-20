'use strict';

var response = require('./res');
// var connection = require('./conn');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "absenonline",
  insecureAuth : true
});

connection.connect(function (err){
    if(err) throw err;
});



// module.exports = connection;
//untuk menampilkan seluruh daftar mahasiswa
exports.users = function(req, res) {
    connection.query('SELECT * FROM mahasiswa', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};
exports.authlog = function(req, res){

    var nrp = req.body.nrp;
    var password = req.body.password;
    if (nrp && password) {
        connection.query('SELECT * FROM mahasiswa WHERE nrp = ? AND password = ?', [nrp, password], function(error, results, fields) {
            //console.log(results);
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.nrp = nrp;
                // req.session.nama = nama;
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
};

exports.succlogin = function(req, res){
    if (req.session.loggedin) {
        res.render('home.ejs',{nama:req.session.nama});
        console.log(req.session.nama);
        } else {
            res.render('failed_login.ejs');
    }
    res.end();

};

exports.logout = function(req, res){
    req.session.loggedin=false;
    res.redirect('/login');
}
exports.index = function(req, res) {
    response.ok("Node JS RESTful side for Online Attendance!", res)
};

exports.findKuliah = function(req, res) {
    
    var kode_matkul = req.params.kode_mk;

    connection.query('SELECT DISTINCT m.nama, mk.nama_matkul, j.pertemuan_ke, l.status FROM mata_kuliah mk, mahasiswa m, jadwal_kelas j, log_absen l, peserta p where m.nrp=l.nrp and j.kode_matkul=mk.kode_matkul and l.id_jadwal=j.id_jadwal and mk.kode_matkul = ?',
    [ kode_matkul ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.findKuliahPert = function(req, res) {
    
    var fk_kode_mk = req.params.fk_kode_mk;
    var id_pertemuan = req.params.id_pertemuan;

    connection.query('SELECT DISTINCT mk.nama_matkul, m.nama, l.status FROM jadwal_kelas j, mahasiswa m, log_absen l, peserta p, mata_kuliah mk where j.kode_matkul=mk.kode_matkul and m.nrp=l.nrp and l.id_jadwal=j.id_jadwal and p.nrp=m.nrp and mk.kode_matkul=? and j.pertemuan_ke=?',
    [ fk_kode_mk, id_pertemuan ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.findKuliahKode = function(req, res) {
    
    var nrp = req.params.nrp;
    var kode_mk = req.params.kode_mk;

    connection.query('SELECT DISTINCT m.nama, mk.nama_matkul, j.pertemuan_ke, l.status FROM jadwal_kelas j, mahasiswa m, log_absen l, peserta p, mata_kuliah mk where j.kode_matkul=mk.kode_matkul and m.nrp=l.nrp and l.id_jadwal=j.id_jadwal and p.nrp=m.nrp and m.nrp=? and mk.kode_matkul=?',
    [ nrp, kode_mk ], 
    function (error, rows, fields){
        console.log(rows)
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.findKuliahSmtr = function(req, res) {
    
    var nrp = req.params.nrp;
    var semester = req.params.semester;

    connection.query('SELECT DISTINCT m.nama, mk.nama_matkul, j.pertemuan_ke, l.status FROM jadwal_kelas j, mahasiswa m, log_absen l, peserta p, mata_kuliah mk where j.kode_matkul=mk.kode_matkul and m.nrp=p.nrp and mk.kode_matkul = p.kode_matkul and m.nrp=l.nrp and l.id_jadwal=j.id_jadwal and p.nrp=m.nrp and m.nrp=? and mk.semester=?',
    [ nrp, semester ], 
    function (error, rows, fields){
        //console.log(nrp);
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};


// root.post('/mahasiswa/absensi', function(request, response) {
//   var id = request.body.id_user;
//   var matkul = request.body.id_tran_matkul;
//   var status = request.body.status;
//   var date = new Date();

//   db.query('INSERT INTO transaksi_user (id_user,id_tran_matkul,waktu,status) values (?,?,?,?)',
//    [id,matkul,date,status], function (error, results, fields) {
//     if (error){
//       console.log(error);
//     }
//     response.redirect('/mahasiswa');
//   });
// });


// root.post('/absen/:ruang/:nrp', function(request, response) {
//   var ruangan = request.params.ruang;
//   var nrp_nip = request.params.nrp;
//   var status = "2";
//   var date = new Date();

//   db.query('SELECT u.nrp_nip, tm.ruangan,tm.id_tran_matkul FROM daftar_peserta d, matkul m, transaksi_matkul tm, user u WHERE m.id_matkul = d.id_matkul AND u.id_user=d.id_user AND tm.id_matkul = m.id_matkul AND u.nrp_nip=? AND tm.ruangan=?',
//    [nrp_nip,ruangan], function (error, results, fields) {
//     if (error){
//       console.log(error);
//       response.status(500).json({ error: 'Internal Server Error' });
//     }
//     if (results.length == 0 ){
//       response.status(404).json({ error: 'Peserta tidak terdaftar dalam kelas' });
//     }else{
//       console.log(results);
//       var matkul = results[0].id_tran_matkul;
//       db.query('INSERT INTO transaksi_user (id_user,id_tran_matkul,waktu,status) values (?,?,?,?)',
//        [nrp_nip,matkul,date,status], function (error, results, fields) {
//         if (error){
//           console.log(error);
//           res.status(500).json({ error: 'Internal Server Error' });
//         }else{
//           res.status(200).json({ OK: 'Berhasil melakukan absensi' });
//         }
//       });
//     }
//   });
// });

exports.createUsers = function(req, res) {
    
    var nrp = req.body.nrp;
    var nama = req.body.nama;
    var password = req.body.password;

    connection.query('INSERT INTO mahasiswa (nrp,nama,password) values (?,?,?)',
    [ nrp, nama, password ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menambahkan Mahasiswa!", res)
            //res.redirect('/daftarkls');
            //console.log("Berhasil menambahkan " + nama_matkul + " pada database");
        }           
            //res.end();
    });
    
};

exports.createMatkul = function(req, res) {
    
    var kode_matkul = req.body.kode_matkul;
    var nama_matkul = req.body.nama_matkul;
    var semester = req.body.semester;
    connection.query('INSERT INTO mata_kuliah (kode_matkul, nama_matkul, semester) values (?,?,?)',
    [ kode_matkul, nama_matkul, semester ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menambahkan Matkul!", res)
            //res.redirect('/daftarkls');
            //console.log("Berhasil menambahkan " + nama_matkul + " pada database");
        }
    });
};

exports.createJadwal = function(req, res) {
    
    var kode_matkul = req.body.kode_matkul;
    var pertemuan_ke = req.body.pertemuan_ke;
    var start = req.body.start;
    var end = req.body.end;
    // var ruang = req.body.ruang;

    connection.query('INSERT INTO jadwal_kelas (kode_matkul,pertemuan_ke, start, end) values (?,?,?,?)',
    [ kode_matkul,pertemuan_ke, start, end],
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menambahkan Jadwal!", res)
            //res.redirect('/daftarjadwal');
            //console.log("Berhasil menambahkan " + kode_matkul + " pada database");
        }
    });
};

exports.createMhsKuliah = function(req, res) {
    
    var kode_matkul = req.body.kode_matkul;
    var nrp= req.body.nrp;

    connection.query('INSERT INTO peserta(nrp, kode_matkul) values (?,?)',
    [ nrp, kode_matkul],
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menambahkan Mahasiswa Kuliah!", res)
            //res.redirect('/daftarpeserta');
            //console.log("Berhasil menambahkan " + kode_matkul + " pada database");
        }
    });
};

exports.absen = function(req, res) {
    var nrp = req.body.nrp;
    var id_jadwal = req.body.id_jadwal;
    var jam_masuk = new Date();
    var status = req.body.status;

    connection.query('INSERT INTO log_absen(nrp, id_jadwal, jam_masuk, status) values (?,?,?,?)',
    [nrp, id_jadwal, jam_masuk, status],
    function (error, rows, fields){
        if (error) {
            console.log(error)
        } else {
            console.log(nrp + " Berhasil Absen!")
            response.ok("Berhasil menambahkan Absen Kuliah!", res)
        }
    });
};

