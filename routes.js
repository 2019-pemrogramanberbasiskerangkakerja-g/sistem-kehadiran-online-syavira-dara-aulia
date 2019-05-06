'use strict';

module.exports = function(app) {
    var absenonline = require('./controller');

    app.route('/')
        .get(absenonline.index);

    app.route('/users')
        .get(absenonline.users);

    app.route('/rekap/:kode_mk')
        .get(absenonline.findKuliah);

    app.route('/rekap/:fk_kode_mk/:id_pertemuan')
        .get(absenonline.findKuliahPert);

    app.route('/rekapmahasiswa/:nrp/:kode_mk')
        .get(absenonline.findKuliahKode);        

    app.route('/rekapmahasiswa/:nrp/:semester')
        .get(absenonline.findKuliahSmt);

    app.route('/tambahmahasiswa')
        .post(absenonline.createUsers);

    app.route('/tambahmatkul')
        .post(absenonline.createMatkul);

    app.route('/tambahjadwal')
        .post(absenonline.createJadwal);

    app.route('/tambahpeserta/:nrp/:kode_mk')
        .post(absenonline.createMhsKuliah);
};