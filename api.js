'use strict';

const bodyParser = require('body-parser')
const express = require('express')
const session = require('express-session')
const agent = require('superagent')

const app = express()
var request = require('request');

// const apiHost = 'https://pbkk-online-absen-api.herokuapp.com'
const host = 'http://localhost:5006'
var path = require("path");

//let Users = []
// app.use('/static', express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(
    session({
        secret: "user session"
    })
)

app.set('view engine', 'ejs')

app.get('/', checkSignIn, (req, res) => {
    //console.log(Users)
    agent.get(host)
        .then(
            (response) => {
                request(host, function (error, response1, body) {
                    if (!error && response1.statusCode == 200) {
                        var info = JSON.parse(body)
                        var size = Object.keys(info.user).length
                        var i;
                        var nama;
                        for (i = 0; i < size; i++) {
                            if (info.mahasiswa[i].nrp == req.session.mahasiswa.nrp) {
                                nama = info.mahasiswa[i].nama;
                                console.log(nama);
                                break;
                            }

                        }
                        //console.log(response.body.matkul)
                        res.render('home.ejs', { nrp: req.session.mahasiswa.nrp, nama: nama })
                    }
                })
            }
        )
})

app.get('/login', (req, res) => {
    if (req.session.error != null) {
        // console.log(req.session.error);
        req.session.error = null;
        res.render('login.ejs', { message: "hai" })

    }
    else {
        res.render('login.ejs', { message: "" })
    }

})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.post('/register', (req, res) => {
    let nrp = req.body['nrp']
    let nama = req.body['nama']
    let password = req.body['password']

    agent.post(apiHost + '/tambahmahasiswa')
        .send({
            nrp: nrp,
            nama: nama,
            password: password
        })
        .then(
            (response) => {
                if (response.status == 201) {
                    res.redirect('/login')
                }
            }
        )
        .catch(
            (err) => {
                console.log(err)
            }
        )
})

app.post('/login', (req, res) => {
    let nrp = req.body['nrp']
    let password = req.body['password']
    console.log(nrp)
    agent.post(apiHost + '/user')
        .send({
            nrp: nrp,
            password: password
        })
        .then(
            (response) => {
                console.log(response.status)
                if (response.status == 200) {
                    let newUser = { nrp: nrp, password: password };
                    Users.push(newUser);
                    req.session.user = newUser;
                    res.redirect('/')
                }
            }
        )
        .catch(
            (err) => {
                console.log(err)
                req.session.error = 'Incorrect username or password';
                res.redirect('/login');
            }
        )
})

app.post('/absen', (req, res) => {
    let ruang = req.body['ruang']
    let nrp = req.body['nrp']
    let time = req.body['time']

    agent.post(apiHost + '/absen')
        .send({
            ruang: ruang,
            nrp: nrp,
            time: time
        })
        .then(
            (response) => {
                if (response.status == 200) {
                    // req.flash('msg', 'some msg');
                    res.redirect('/')
                }
            }
        )
        .catch(
            (err) => {
                console.log(err)
            }
        )
})
app.get('/jadwal', (req, res) => {
    if (req.session.user == null) {
        req.session.error = "Login";
        res.redirect('/login');
    }
    else {
        request(apiHost, function (error, response1, body) {
            if (!error && response1.statusCode == 200) {
                var info = JSON.parse(body)
                var size = Object.keys(info.user).length
                var i;
                var nama;
                for (i = 0; i < size; i++) {
                    if (info.user[i].nrp == req.session.user.nrp) {
                        nama = info.user[i].nama;
                        console.log(nama);
                        break;
                    }
                }
                res.render('jadwal.ejs', { nrp: req.session.user.nrp, nama: nama })
            }
        })
    }

})

app.post('/jadwal', (req, res) => {
    let id = req.body['idMatkul']
    let pertemuan = req.body['pertemuan']
    let kelas = req.body['kelas']
    let masuk = req.body['masuk']
    let selesai = req.body['selesai']

    console.log(masuk)
    console.log(selesai)

    let angka = parseInt(pertemuan, 10)

    agent.post(apiHost + '/tambahjadwal')
        .send({
            idmatkul: id,
            pertemuanke: angka,
            ruangkelas: kelas,
            jammasuk: masuk,
            jamselesai: selesai
        })
        .then(
            (response) => {

                if (response.status == 201) {
                    res.redirect('/jadwal');
                }
            }
        )
        .catch(
            (err) => {
                console.log(err)
                res.redirect('/jadwal');
            }
        )
})
app.get('/tambahmatkul', (req, res) => {
    if (req.session.user == null) {
        req.session.error = "Login";
        res.redirect('/login');
    }
    else {
        request(apiHost, function (error, response1, body) {
            if (!error && response1.statusCode == 200) {
                var info = JSON.parse(body)
                var size = Object.keys(info.user).length
                var i;
                var nama;
                for (i = 0; i < size; i++) {
                    if (info.user[i].nrp == req.session.user.nrp) {
                        nama = info.user[i].nama;

                        break;
                    }
                }
                res.render('tambahmatkul.ejs', { nrp: req.session.user.nrp, nama: nama })
            }
        })
    }

})
app.post('/tambahmatkul', (req, res) => {
    let idMatkul = req.body['idMatkul']
    let namaMatkul = req.body['namaMatkul']
    let kelas = req.body['kelas']
    agent.post(apiHost + '/tambahmatkul')
        .send({
            idmatkul: idMatkul,
            namamatkul: namaMatkul,
            kelas: kelas
        })
        .then(
            (response) => {
                if (response.status == 201) {
                    res.redirect('/')
                }
            }
        )
        .catch(
            (err) => {
                console.log(err)
            }
        )
})
app.post('/tambahpeserta', (req, res) => {
    let idmatkul = req.body['idmatkul']
    let smt = req.body['smt']
    let nrp = req.body['nrp']

    agent.post(apiHost + '/tambahpeserta')
        .send({
            idmatkul: idmatkul,
            smt: smt,
            nrp: nrp
        })
        .then(
            (response) => {
                if (response.status == 201) {
                    res.redirect('/')
                }
            }
        )
        .catch(
            (err) => {
                console.log(err)
            }
        )
})
app.post('/rekap', (req, res) => {
    let idmatkul = req.body['idmatkul']
    agent.get(apiHost + '/rekap/' + idmatkul)
        .then(
            (response) => {

                if (response.status == 200) {
                    console.log(response.body)
                    res.render('rekapsemeter.ejs', { isi: response.body, nrp: req.session.user.nrp })
                }
            }
        )
        .catch(
            (err) => {
                console.log(err)
            }
        )
})

app.post('/rekapsemua', (req, res) => {
    let nrp = req.body['nrp']
    let semester = req.body['semester']
    agent.get(apiHost + '/rekapmahasiswa/' + nrp + '/' + semester)
        .then(
            (response) => {

                if (response.status == 200) {
                    console.log(response.body)
                    res.render('rekaptotal.ejs', { isi: response.body })
                }
            }
        )
        .catch(
            (err) => {
                console.log(err)
            }
        )
})

app.get('/keluar', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
})
app.listen(3000, () => {
    console.log("Start")
})

function checkSignIn(req, res, next) {
    if (req.session.user) {
        return next();
    }
    else {
        res.redirect('/login')
    }
}
//https://pbkk-online-absen-api.herokuapp.com