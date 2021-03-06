'use strict';

module.exports = function(app) {
    var absenonline = require('./controller');

    app.route('/login')
        .get(absenonline.login);
    app.route('/regis')
        .get(absenonline.regis);
    app.route('/registrasi')
        .post(absenonline.createUsers);

    app.route('/succeslogin')
        .get(absenonline.succeslogin);

    app.route('/failed')
        .get(absenonline.failed);
    app.route('/auth')
        .post(absenonline.authlog);

    app.route('/home')
        .get(absenonline.succlogin);

    app.route('/daftarkls')
        .get(absenonline.tambahkls);
    app.route('/daftarkls2')
        .post(absenonline.createMatkul);

    app.route('/daftarjadwal')
        .get(absenonline.tambahjdwl);
    app.route('/daftarjadwal2')
        .post(absenonline.createJadwal);   

     app.route('/daftarpeserta')
        .get(absenonline.tambahpsrt);
    app.route('/daftarpeserta2')
        .post(absenonline.createMhsKuliah);    

    app.route('/logout')
        .get(absenonline.logout);

    app.route('/')
        .get(absenonline.index);

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
};