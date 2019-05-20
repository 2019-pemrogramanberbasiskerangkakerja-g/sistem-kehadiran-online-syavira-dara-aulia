-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 20, 2019 at 03:19 PM
-- Server version: 10.1.28-MariaDB
-- PHP Version: 7.1.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `absenonline`
--

-- --------------------------------------------------------

--
-- Table structure for table `jadwal_kelas`
--

CREATE TABLE `jadwal_kelas` (
  `id_jadwal` int(11) NOT NULL,
  `kode_matkul` varchar(10) NOT NULL,
  `pertemuan_ke` int(11) NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `jadwal_kelas`
--

INSERT INTO `jadwal_kelas` (`id_jadwal`, `kode_matkul`, `pertemuan_ke`, `start`, `end`) VALUES
(1, 'MK001', 1, '2019-05-21 08:00:00', '2019-05-21 13:00:00'),
(2, 'MK001', 2, '2019-05-22 12:00:00', '2019-05-22 13:00:00'),
(3, 'MK002', 1, '2019-05-21 09:00:00', '2019-05-21 10:00:00'),
(4, 'MK002', 2, '2019-05-23 04:00:00', '2019-05-23 10:00:00'),
(5, 'MK003', 1, '2019-05-24 10:00:00', '2019-05-24 14:00:00'),
(6, 'MK003', 2, '2019-05-25 10:00:00', '2019-05-25 14:00:00'),
(7, 'MK004', 1, '2019-05-20 11:00:00', '2019-05-20 15:00:00'),
(8, 'MK004', 2, '2019-05-31 06:00:00', '2019-05-31 09:00:00'),
(9, 'MK005', 1, '2019-05-28 06:00:00', '2019-05-28 10:00:00'),
(10, 'MK005', 2, '2019-05-29 08:00:00', '2019-05-29 13:00:00'),
(11, 'MK006', 1, '2019-05-20 09:00:00', '2019-05-20 12:00:00'),
(12, 'MK006', 2, '2019-05-23 14:00:00', '2019-05-23 17:00:00'),
(13, 'MK007', 1, '2019-05-21 08:00:00', '2019-05-21 10:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `log_absen`
--

CREATE TABLE `log_absen` (
  `id_log` int(11) NOT NULL,
  `id_jadwal` int(11) NOT NULL,
  `nrp` varchar(14) NOT NULL,
  `jam_masuk` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `log_absen`
--

INSERT INTO `log_absen` (`id_log`, `id_jadwal`, `nrp`, `jam_masuk`, `status`) VALUES
(1, 1, '05111540000002', '2019-05-20 12:10:13', 1),
(2, 1, '05111540000012', '2019-05-20 12:10:13', 1),
(3, 1, '05111540000001', '2019-05-20 12:46:33', 1),
(4, 7, '05111540000005', '2019-05-20 12:48:03', 1);

-- --------------------------------------------------------

--
-- Table structure for table `mahasiswa`
--

CREATE TABLE `mahasiswa` (
  `nrp` varchar(14) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `mahasiswa`
--

INSERT INTO `mahasiswa` (`nrp`, `nama`, `password`) VALUES
('05111540000001', 'Bento is good', '123'),
('05111540000002', 'Syavira Tiara ZK', '123'),
('05111540000005', 'Mawar Merah Melati', '123'),
('05111540000012', 'Aulia Teaku Nurur Rahmah', '123'),
('05111540007007', 'Dara Tursina', '123');

-- --------------------------------------------------------

--
-- Table structure for table `mata_kuliah`
--

CREATE TABLE `mata_kuliah` (
  `kode_matkul` varchar(10) NOT NULL,
  `nama_matkul` varchar(100) NOT NULL,
  `semester` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `mata_kuliah`
--

INSERT INTO `mata_kuliah` (`kode_matkul`, `nama_matkul`, `semester`) VALUES
('MK001', 'PBKK A', 6),
('MK002', 'APSI A', 4),
('MK003', 'KOMNUM A', 2),
('MK004', 'JARKOM A', 6),
('MK005', 'DASPROG A', 1),
('MK006', 'PROGJAR A', 6),
('MK007', 'TK KBJ', 8);

-- --------------------------------------------------------

--
-- Table structure for table `peserta`
--

CREATE TABLE `peserta` (
  `id_peserta` int(11) NOT NULL,
  `nrp` varchar(14) NOT NULL,
  `kode_matkul` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `peserta`
--

INSERT INTO `peserta` (`id_peserta`, `nrp`, `kode_matkul`) VALUES
(1, '05111540000002', 'MK001'),
(2, '05111540000002', 'MK006'),
(3, '05111540000005', 'MK004'),
(4, '05111540000005', 'MK003'),
(5, '05111540000012', 'MK001'),
(6, '05111540000012', 'MK006'),
(7, '05111540007007', 'MK004'),
(8, '05111540007007', 'MK005'),
(9, '05111540000001', 'MK001');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `jadwal_kelas`
--
ALTER TABLE `jadwal_kelas`
  ADD PRIMARY KEY (`id_jadwal`),
  ADD KEY `fk_jadwal_kelas1` (`kode_matkul`);

--
-- Indexes for table `log_absen`
--
ALTER TABLE `log_absen`
  ADD PRIMARY KEY (`id_log`),
  ADD KEY `fk_log_absen2` (`id_jadwal`),
  ADD KEY `fk_log_absen1` (`nrp`);

--
-- Indexes for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD PRIMARY KEY (`nrp`);

--
-- Indexes for table `mata_kuliah`
--
ALTER TABLE `mata_kuliah`
  ADD PRIMARY KEY (`kode_matkul`);

--
-- Indexes for table `peserta`
--
ALTER TABLE `peserta`
  ADD PRIMARY KEY (`id_peserta`),
  ADD KEY `fk_peserta1` (`nrp`),
  ADD KEY `fk_peserta2` (`kode_matkul`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `jadwal_kelas`
--
ALTER TABLE `jadwal_kelas`
  MODIFY `id_jadwal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `log_absen`
--
ALTER TABLE `log_absen`
  MODIFY `id_log` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `peserta`
--
ALTER TABLE `peserta`
  MODIFY `id_peserta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `jadwal_kelas`
--
ALTER TABLE `jadwal_kelas`
  ADD CONSTRAINT `fk_jadwal_kelas1` FOREIGN KEY (`kode_matkul`) REFERENCES `mata_kuliah` (`kode_matkul`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `log_absen`
--
ALTER TABLE `log_absen`
  ADD CONSTRAINT `fk_log_absen1` FOREIGN KEY (`nrp`) REFERENCES `peserta` (`nrp`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_log_absen2` FOREIGN KEY (`id_jadwal`) REFERENCES `jadwal_kelas` (`id_jadwal`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `peserta`
--
ALTER TABLE `peserta`
  ADD CONSTRAINT `fk_peserta1` FOREIGN KEY (`nrp`) REFERENCES `mahasiswa` (`nrp`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_peserta2` FOREIGN KEY (`kode_matkul`) REFERENCES `mata_kuliah` (`kode_matkul`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
