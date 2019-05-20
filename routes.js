'use strict';

module.exports = function(app) {
    var absenonline = require('./controller');

    app.route('/')
        .get(absenonline.index);
    app.route('/login')
        .get(absenonline.login);
    app.route('/registrasi')
        .get(absenonline.registrasi);
    app.route('/users')
        .get(absenonline.users);

    app.route('/rekap/:kode_mk')
        .get(absenonline.findKuliah);
//user yg hadir di masing" pertemuan
    app.route('/rekap/:fk_kode_mk/:id_pertemuan')
        .get(absenonline.findKuliahPert);
//hadir di pertemuan ke berapa aja
    app.route('/rekapmahasiswa/:nrp/:kode_mk')
        .get(absenonline.findKuliahKode);        
//per semester matkulnya apa aja
    app.route('/rekapmahasiswa/:nrp/:semester')
        .get(absenonline.findKuliahSmtr);

    app.route('/tambahmahasiswa')
        .post(absenonline.createUsers);

    app.route('/tambahmatkul')
        .post(absenonline.createMatkul);

    app.route('/tambahjadwal')
        .post(absenonline.createJadwal);

    app.route('/tambahpeserta/:nrp/:kode_mk')
        .post(absenonline.createMhsKuliah);
    app.route('/absen')
        .post(absenonline.absen);
};