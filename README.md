# sistem-kehadiran-online-syavira-dara-aulia
sistem-kehadiran-online-syavira-dara-aulia created by GitHub Classroom

SISTEM KEHADIRAN ONLINE MAHASISWA Menggunakan API
PBKK G

PROGRES:
1. LOGIN
2. Membuat API
3. Membuat Views

<h2> Kelompok 10 </h2>
<h4>Anggota:</h4>
<ol>
  <li>Syavira Tiara Z (5115100002)</li>
  <li>Aulia Teaku N.R (5115100012)</li>
  <li>Dara Tursina    (5115100707)</li>
</ol>

<h3>About</h3>
Menggunakan Node.js, Express, MySQL database, dan ejs sebagai View Engine-nya

<h3>Run</h3>
<ol>
  <li>Install <code>npm install express</code> </li>
  <li>Install <code>npm install mysql</code></li>
  <li>Run <code>app2.js</code></li>
</ol>

<h3>Parameter API</h3>
<ol><code>POST</code>/absen: (sent via body : nrp, id_jadwal, status [1:masuk, 0:bolos) absen</ol>
<ol><code>GET</code>/rekap/idmatakuliah: rekap kuliah per semester</ol>
<ol><code>GET</code>/rekap/idmatakuliah/pertemuanke: rekap kuliah per pertemuan</ol>
<ol><code>GET</code>/rekapmahasiswa/nrp/idmatakuliah: rekap mahasiswa per kuliah</ol>
<ol><code>GET</code>/rekapmahasiswa/nrp/idsemester: rekap mahasiswa per semester</ol>
<ol><code>GET</code>/users: menampilkan user di database</ol>
<ol><code>POST</code>/tambahmahasiswa (sent via body:nrp,nama, pass): tambah user mahasiswa baru</ol>
<ol><code>POST</code>/tambahpeserta:(sent via body: id mata kuliah, nrp) tambah user mahasiswa ke mata kuliah</ol>
<ol><code>POST</code>/tambahmatkul (sent via body:id mata kuliah, nama mata kuliah,semester):tambah mata kuliah baru</ol>
<ol><code>POST</code>/tambahjadwal (sent via body: id mata kuliah, pertemuan ke, jam masuk, jam selesai: tambah jadwal pertemuan untuk kuliah</ol>

testing : <code>localhost:5006</code>

## HASIL TESTING API

1. <code>GET</code>/users
Parameter ini digunakan untuk memperoleh daftar user e.g. : <code>localhost:5006/users</code>

![users](/image/users.PNG)

2. <code>GET</code>/rekap/idmatakuliah
Parameter ini digunakan untuk memperoleh rekap kehadiran per matakuliah e.g. : <code>localhost:5006/MK001</code>

![users](/image/rekap_matkul.PNG)

3. <code>GET</code>/rekap/idmatakuliah/pertemuanke
Parameter ini digunakan untuk memperoleh rekap kehadiran per matakuliah per pertemuan e.g. : <code>localhost:5006/MK001/1</code>

![users](/image/rekap_matkul_pertemuan.PNG)

4. <code>GET</code>/rekapmahasiswa/nrp/idmatakuliah
Parameter ini digunakan untuk memperoleh rekap kehadiran per mahasiswa pada tiap matakuliah e.g. : <code>localhost:5006/05111540000012/MK001</code>

![users](/image/rekapmahasiswa.PNG)

5. <code>GET</code>/rekapmahasiswa/nrp/idsemester
Parameter ini digunakan untuk memperoleh rekap kehadiran per mahasiswa pada semester tertentu e.g. : <code>localhost:5006/05111540000012/6</code>

![users](/image/rekapmahasiswa2.PNG)

6. <code>POST</code>/tambahmahasiswa
Parameter ini digunakan untuk menambah record mahasiswa baru

data yang di send via body adalah :

![users](/image/tambahmahasiswa.PNG)

ketika berhasil menambahkan, maka response akan OK/200

![users](/image/yestambahmahasiswa.PNG)

7. <code>POST</code>/tambahpeserta
Parameter ini digunakan untuk menambah record peserta kelas baru

data yang di send via body adalah :

![users](/image/tambahpeserta.PNG)

ketika berhasil menambahkan, maka response akan 200/OK

![users](/image/yestambahpeserta.PNG)

8. <code>POST</code>/tambahmatkul
Parameter ini digunakan untuk menambah record matakuliah baru

data yang di send via body adalah :

![users](/image/tambahmatkul.PNG)

ketika berhasil menambahkan, maka response akan 200/OK

![users](/image/yestambahmatkul.PNG)

9. <code>POST</code>/tambahjadwal
Parameter ini digunakan untuk menambah record jadwal baru

data yang di send via body adalah :

![users](/image/tambahjadwal.PNG)

ketika berhasil menambahkan, maka response akan 200/OK

![users](/image/yestambahjadwal.PNG)

10. <code>POST</code>/absen
Parameter ini digunakan untuk menambah record absen

data yang di send via body adalah :

![users](/image/absen.PNG)

ketika berhasil menambahkan, maka response akan 200/OK

![users](/image/yesabsen.PNG)
