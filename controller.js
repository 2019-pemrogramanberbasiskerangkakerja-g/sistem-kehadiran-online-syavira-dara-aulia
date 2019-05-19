'use strict';

var response = require('./res');
// var connection = require('./conn');
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "kehadiran"
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

exports.index = function(req, res) {
    response.ok("Node JS RESTful side for Online Attendance!", res)
};

exports.findKuliah = function(req, res) {
    
    var kode_matkul = req.params.kode_mk;

    connection.query('SELECT m.nama, mk.nama_matkul, l.status FROM mata_kuliah mk, mahasiswa m, jadwal_kelas j, log_absen l, peserta p where m.nrp=l.nrp and j.kode_matkul=mk.kode_matkul and l.id_jadwal=j.id_jadwal and mk.kode_matkul = ?',
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

    connection.query('SELECT mk.nama_matkul, j.pertemuan_ke, m.nama FROM jadwal_kelas j, mahasiswa m, log_absen l, peserta p, mata_kuliah mk where j.kode_matkul=mk.kode_matkul and m.nrp=l.nrp and l.id_jadwal=j.id_jadwal and p.nrp=m.nrp and mk.kode_matkul=? and j.pertemuan_ke=?',
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

    connection.query('SELECT m.nama, mk.nama_matkul, j.pertemuan_ke, l.status FROM jadwal_kelas j, mahasiswa m, log_absen l, peserta p, mata_kuliah mk where j.kode_matkul=mk.kode_matkul and m.nrp=l.nrp and l.id_jadwal=j.id_jadwal and p.nrp=m.nrp and m.nrp=? and mk.kode_matkul=?',
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

    connection.query('SELECT m.nama, mk.nama_matkul, j.pertemuan_ke, l.status FROM jadwal_kelas j, mahasiswa m, log_absen l, peserta p, mata_kuliah mk where j.kode_matkul=mk.kode_matkul and m.nrp=l.nrp and l.id_jadwal=j.id_jadwal and p.nrp=m.nrp and m.nrp=? and mk.semester=?',
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
    
    // var kode_matkul = req.body.kode_mk;
    var nama_matkul = req.body.nama_matkul;
    var semester = req.body.semester;

    connection.query('INSERT INTO mata_kuliah (nama_matkul, semester) values (?,?)',
    [ nama_matkul,semester ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menambahkan Matkul!", res)
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
        }
    });
};


