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
