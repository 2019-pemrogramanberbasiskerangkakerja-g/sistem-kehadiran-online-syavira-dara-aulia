-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 20, 2019 at 12:43 AM
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
-- Database: `kehadiran`
--

-- --------------------------------------------------------

--
-- Table structure for table `jadwal_kelas`
--

CREATE TABLE `jadwal_kelas` (
  `id_jadwal` int(10) NOT NULL,
  `kode_matkul` int(10) NOT NULL,
  `pertemuan_ke` int(10) NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `jadwal_kelas`
--

INSERT INTO `jadwal_kelas` (`id_jadwal`, `kode_matkul`, `pertemuan_ke`, `start`, `end`) VALUES
(1, 1, 1, '2019-05-21 09:30:00', '2019-05-21 11:00:00'),
(2, 1, 2, '2019-05-22 11:00:00', '2019-05-22 14:00:00'),
(3, 2, 1, '2019-05-16 08:00:00', '2019-05-16 16:00:00'),
(4, 5, 1, '2019-05-21 09:30:00', '2019-05-21 12:30:00');

-- --------------------------------------------------------

--
-- Table structure for table `log_absen`
--

CREATE TABLE `log_absen` (
  `id_log` int(10) NOT NULL,
  `nrp` int(10) NOT NULL,
  `id_jadwal` int(10) NOT NULL,
  `jam_masuk` datetime NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `log_absen`
--

INSERT INTO `log_absen` (`id_log`, `nrp`, `id_jadwal`, `jam_masuk`, `status`) VALUES
(1, 1, 1, '2019-05-21 10:00:00', 1),
(2, 5, 1, '2019-05-21 10:00:00', 1),
(3, 1, 2, '2019-05-22 12:00:00', 1),
(4, 1, 3, '2019-05-16 16:00:00', 1);

-- --------------------------------------------------------

--
-- Table structure for table `mahasiswa`
--

CREATE TABLE `mahasiswa` (
  `nrp` int(10) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `mahasiswa`
--

INSERT INTO `mahasiswa` (`nrp`, `nama`, `password`) VALUES
(0, 'Aulia', '1234'),
(1, 'Mawar', '123'),
(2, 'Merah', '123'),
(3, 'Melati', '123'),
(4, 'Putih', '123'),
(5, 'Anggrek', '123'),
(6, 'Ungu', '123');

-- --------------------------------------------------------

--
-- Table structure for table `mata_kuliah`
--

CREATE TABLE `mata_kuliah` (
  `kode_matkul` int(10) NOT NULL,
  `nama_matkul` varchar(100) NOT NULL,
  `semester` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `mata_kuliah`
--

INSERT INTO `mata_kuliah` (`kode_matkul`, `nama_matkul`, `semester`) VALUES
(1, 'PBKK G', 6),
(2, 'APSI C', 6),
(3, 'KOMNUM', 5),
(4, 'PWEB', 5),
(5, 'PAA A', 4);

-- --------------------------------------------------------

--
-- Table structure for table `peserta`
--

CREATE TABLE `peserta` (
  `id_peserta` int(11) NOT NULL,
  `nrp` int(11) NOT NULL,
  `kode_matkul` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `peserta`
--

INSERT INTO `peserta` (`id_peserta`, `nrp`, `kode_matkul`) VALUES
(1, 1, 1),
(2, 5, 1),
(3, 1, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `jadwal_kelas`
--
ALTER TABLE `jadwal_kelas`
  ADD PRIMARY KEY (`id_jadwal`),
  ADD KEY `fk_jawal_kelas1` (`kode_matkul`);

--
-- Indexes for table `log_absen`
--
ALTER TABLE `log_absen`
  ADD PRIMARY KEY (`id_log`),
  ADD KEY `fk_log_absen1` (`nrp`),
  ADD KEY `fk_log_absen2` (`id_jadwal`);

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
  MODIFY `id_jadwal` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `log_absen`
--
ALTER TABLE `log_absen`
  MODIFY `id_log` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `mata_kuliah`
--
ALTER TABLE `mata_kuliah`
  MODIFY `kode_matkul` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `peserta`
--
ALTER TABLE `peserta`
  MODIFY `id_peserta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `jadwal_kelas`
--
ALTER TABLE `jadwal_kelas`
  ADD CONSTRAINT `fk_jawal_kelas1` FOREIGN KEY (`kode_matkul`) REFERENCES `mata_kuliah` (`kode_matkul`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `log_absen`
--
ALTER TABLE `log_absen`
  ADD CONSTRAINT `fk_log_absen1` FOREIGN KEY (`nrp`) REFERENCES `mahasiswa` (`nrp`) ON DELETE CASCADE ON UPDATE CASCADE,
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
