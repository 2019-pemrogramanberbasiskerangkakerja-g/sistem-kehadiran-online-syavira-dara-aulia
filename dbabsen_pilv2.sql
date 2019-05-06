-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 06 Bulan Mei 2019 pada 07.33
-- Versi server: 10.1.33-MariaDB
-- Versi PHP: 7.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbabsen`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `jadwal_kuliah`
--

CREATE TABLE `jadwal_kuliah` (
  `fk_kode_mk` varchar(10) NOT NULL,
  `pertemuan` int(11) DEFAULT NULL,
  `hari` varchar(20) DEFAULT NULL,
  `jam_masuk` time NOT NULL,
  `jam_pulang` time NOT NULL,
  `ruang` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `jadwal_kuliah`
--

INSERT INTO `jadwal_kuliah` (`fk_kode_mk`, `pertemuan`, `hari`, `jam_masuk`, `jam_pulang`, `ruang`) VALUES
('IF184605', 1, 'senin', '00:09:55', '00:12:35', '107a'),
('IF184951', 1, NULL, '12:30:00', '15:00:00', '106');

-- --------------------------------------------------------

--
-- Struktur dari tabel `log_absen`
--

CREATE TABLE `log_absen` (
  `id_absen` int(13) NOT NULL,
  `id_jadwal` varchar(13) NOT NULL,
  `nrp_mahasiswa` varchar(191) NOT NULL,
  `jam_masuk` time NOT NULL,
  `jam_keluar` time NOT NULL,
  `ruang` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `log_absen`
--

INSERT INTO `log_absen` (`id_absen`, `id_jadwal`, `nrp_mahasiswa`, `jam_masuk`, `jam_keluar`, `ruang`) VALUES
(1, '001', '5115100002', '09:55:00', '12:35:00', '107a');

-- --------------------------------------------------------

--
-- Struktur dari tabel `mahasiswa`
--

CREATE TABLE `mahasiswa` (
  `nrp` varchar(10) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `mahasiswa`
--

INSERT INTO `mahasiswa` (`nrp`, `nama`, `password`) VALUES
('5115100002', 'Syavira Tiara Z', '123'),
('5115100005', 'Afrian Mutfiatul Chusnah', '123'),
('5115100012', 'Aulia Teaku NR', '123'),
('5115100017', 'Sirria Panah A', '123'),
('5115100032', 'Nafingatun Ngaliah', '123'),
('5115100048', 'Mutia Rahmi Dewi', '123'),
('5115100703', 'Dara Tursina', '123'),
('5115100707', 'Dara Tursina', '123');

-- --------------------------------------------------------

--
-- Struktur dari tabel `mata_kuliah`
--

CREATE TABLE `mata_kuliah` (
  `kode_mk` varchar(10) NOT NULL,
  `semester` int(2) DEFAULT NULL,
  `mata_kuliah` varchar(191) NOT NULL,
  `kelas` varchar(10) NOT NULL,
  `nama_dosen` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `mata_kuliah`
--

INSERT INTO `mata_kuliah` (`kode_mk`, `semester`, `mata_kuliah`, `kelas`, `nama_dosen`) VALUES
('IF184605', 6, 'Pemrograman Berbasis Kerangka Kerja', 'G', 'Ridho Rahman Hariadi, S.Kom., M.Sc.	'),
('IF184606', 6, 'Pemrograman Berbasis Kerangka Kerja', 'H', 'Ridho Rahman Hariadi, S.Kom., M.Sc.	'),
('IF184951', 6, 'Data Mining', 'A', 'Dr.Chastine Fatichah, M.Kom');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pertemuan`
--

CREATE TABLE `pertemuan` (
  `id_pertemuan` int(10) NOT NULL,
  `id_kelas` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur dari tabel `peserta_kelas`
--

CREATE TABLE `peserta_kelas` (
  `nrp` varchar(10) NOT NULL,
  `kode_mk` varchar(10) NOT NULL,
  `semester` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `peserta_kelas`
--

INSERT INTO `peserta_kelas` (`nrp`, `kode_mk`, `semester`) VALUES
('5115100707', 'IF184605', 6),
('5115100012', 'IF184605', 6),
('5115100707', 'IF184951', 6);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `jadwal_kuliah`
--
ALTER TABLE `jadwal_kuliah`
  ADD KEY `fk_kode_mk` (`fk_kode_mk`);

--
-- Indeks untuk tabel `log_absen`
--
ALTER TABLE `log_absen`
  ADD PRIMARY KEY (`id_absen`);

--
-- Indeks untuk tabel `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD PRIMARY KEY (`nrp`);

--
-- Indeks untuk tabel `mata_kuliah`
--
ALTER TABLE `mata_kuliah`
  ADD PRIMARY KEY (`kode_mk`),
  ADD UNIQUE KEY `kode_mk` (`kode_mk`),
  ADD UNIQUE KEY `kode_mk_2` (`kode_mk`);

--
-- Indeks untuk tabel `pertemuan`
--
ALTER TABLE `pertemuan`
  ADD PRIMARY KEY (`id_pertemuan`),
  ADD UNIQUE KEY `id_pertemuan` (`id_pertemuan`);

--
-- Indeks untuk tabel `peserta_kelas`
--
ALTER TABLE `peserta_kelas`
  ADD KEY `nrp` (`nrp`),
  ADD KEY `kode_mk` (`kode_mk`);

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `jadwal_kuliah`
--
ALTER TABLE `jadwal_kuliah`
  ADD CONSTRAINT `fk_kode_mk` FOREIGN KEY (`fk_kode_mk`) REFERENCES `mata_kuliah` (`kode_mk`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `pertemuan`
--
ALTER TABLE `pertemuan`
  ADD CONSTRAINT `idx_pertemuan` FOREIGN KEY (`id_pertemuan`) REFERENCES `pertemuan` (`id_pertemuan`);

--
-- Ketidakleluasaan untuk tabel `peserta_kelas`
--
ALTER TABLE `peserta_kelas`
  ADD CONSTRAINT `kode_mk` FOREIGN KEY (`kode_mk`) REFERENCES `mata_kuliah` (`kode_mk`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `nrp` FOREIGN KEY (`nrp`) REFERENCES `mahasiswa` (`nrp`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
