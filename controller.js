'use strict';

var response = require('./res');
// var connection = require('./conn');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dbabsen"
});

connection.connect(function (err){
    if(err) throw err;
});

// module.exports = connection;

exports.users = function(req, res) {
    connection.query('SELECT * FROM mahasiswa', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.index = function(req, res) {
    response.ok("Node JS RESTful side for Online Attendance!", res)
};

exports.findKuliah = function(req, res) {
    
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
};

exports.findKuliahSmt = function(req, res) {
    
    var nrp = req.params.nrp;
    var semester = req.params.semester;

    connection.query('SELECT * FROM peserta_kelas where nrp = ? AND semester = ?',
    [ nrp,semester ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

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
        }
    });
};

exports.createMatkul = function(req, res) {
    
    var kode_mk = req.body.kode_mk;
    var mata_kuliah = req.body.mata_kuliah;
    var kelas = req.body.kelas;

    connection.query('INSERT INTO mata_kuliah (kode_mk, mata_kuliah,kelas) values (?,?,?)',
    [ kode_mk, mata_kuliah,kelas ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menambahkan Matkul!", res)
        }
    });
};

exports.createJadwal = function(req, res) {
    
    var fk_kode_mk = req.body.fk_kode_mk;
    var pertemuan = req.body.pertemuan;
    var jam_masuk = req.body.jam_masuk;
    var jam_pulang = req.body.jam_pulang;
    var ruang = req.body.ruang;

    connection.query('INSERT INTO jadwal_kuliah (fk_kode_mk,pertemuan,jam_masuk, jam_pulang, ruang) values (?,?,?,?,?)',
    [ fk_kode_mk,pertemuan, jam_masuk, jam_pulang, ruang ],
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menambahkan Jadwal!", res)
        }
    });
};

exports.createMhsKuliah = function(req, res) {
    
    var kode_mk = req.body.kode_mk;
    var nrp= req.body.nrp;

    connection.query('INSERT INTO peserta_kelas (nrp, kode_mk) values (?,?)',
    [ nrp, kode_mk ],
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menambahkan Mahasiswa Kuliah!", res)
        }
    });
};


