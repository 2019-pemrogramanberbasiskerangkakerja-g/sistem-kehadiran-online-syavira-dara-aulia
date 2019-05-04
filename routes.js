'use strict';

module.exports = function(app) {
    var absenonline = require('./controller');

    app.route('/')
        .get(absenonline.index);

    app.route('/users')
        .get(absenonline.users);

    app.route('/rekap/:kode_mk')
        .get(absenonline.findKuliah);

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