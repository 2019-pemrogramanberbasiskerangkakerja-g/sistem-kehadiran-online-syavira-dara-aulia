-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 25, 2019 at 11:53 AM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sistem absen online`
--

-- --------------------------------------------------------

--
-- Table structure for table `jadwal_kuliah`
--

CREATE TABLE `jadwal_kuliah` (
  `id_jadwal` varchar(13) NOT NULL,
  `fk_kode_mk` varchar(10) NOT NULL,
  `hari` varchar(20) NOT NULL,
  `jam_masuk` time NOT NULL,
  `jam_pulang` time NOT NULL,
  `ruang` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `jadwal_kuliah`
--

INSERT INTO `jadwal_kuliah` (`id_jadwal`, `fk_kode_mk`, `hari`, `jam_masuk`, `jam_pulang`, `ruang`) VALUES
('001', 'IF184605', 'senin', '00:09:55', '00:12:35', '107a');

-- --------------------------------------------------------

--
-- Table structure for table `log_absen`
--

CREATE TABLE `log_absen` (
  `id_absen` int(13) NOT NULL,
  `id_jadwal` varchar(13) NOT NULL,
  `nrp_mahasiswa` varchar(191) NOT NULL,
  `jam_masuk` time NOT NULL,
  `jam_keluar` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `log_absen`
--

INSERT INTO `log_absen` (`id_absen`, `id_jadwal`, `nrp_mahasiswa`, `jam_masuk`, `jam_keluar`) VALUES
(1, '001', '05111540000002', '09:55:00', '12:35:00');

-- --------------------------------------------------------

--
-- Table structure for table `mahasiswa`
--

CREATE TABLE `mahasiswa` (
  `nrp_mahasiswa` varchar(191) NOT NULL,
  `nama_mahasiswa` varchar(191) NOT NULL,
  `password` varchar(20) NOT NULL,
  `fk_kode_mk` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `mahasiswa`
--

INSERT INTO `mahasiswa` (`nrp_mahasiswa`, `nama_mahasiswa`, `password`, `fk_kode_mk`) VALUES
('05111540000002', 'Syavira Tiara Zulkarnain\r\n', '05111540000002', 'IF184605'),
('05111540000009', 'NARENDRA HARYO BISMO\r\n', '05111540000009', 'IF184605'),
('05111540000012', 'Aulia Teaku Nurur Rahmah\r\n', '05111540000012', 'IF184605'),
('05111540000021', 'Gerald Parlindungan Salomo\r\n', '05111540000021', 'IF184606'),
('05111540000022', 'Huda Fauzan Murtadho\r\n', '05111540000022', 'IF184605'),
('05111540000026', 'Galuh AAn Ramadhan\r\n', '05111540000026', 'IF184605'),
('05111540000035', 'Findryan Kurnia Pradana\r\n', '05111540000035', 'IF184605'),
('05111540000039', 'Ivan Fadhila\r\n', '05111540000039', 'IF184605'),
('05111540000045	', 'Rohana Qudus\r\n', '05111540000045	', 'IF184606'),
('05111540000046	', 'Rizaldy Primanta Putra\r\n', '05111540000046	', 'IF184606'),
('05111540000050', 'Muh. Akram Abdullah\r\n', '05111540000050', 'IF184605'),
('05111540000052', 'Faris Rahmat Hardian\r\n', '05111540000052', 'IF184606'),
('05111540000060', 'Pandito Hudiarso Abdul Rahim Setia Negara\r\n', '05111540000060', 'IF184605'),
('05111540000064', 'Racsi Beryl Wirawienta H.\r\n', '05111540000064', 'IF184605'),
('05111540000073', 'Fatimatus Zulfa\r\n', '05111540000073', 'IF184605'),
('05111540000078', 'Nuzul Ristyantika Yuliana\r\n', '05111540000078', 'IF184606'),
('05111540000088', 'ILHAM MUHAMMAD MISBAHUDDIN\r\n', '05111540000088', 'IF184606'),
('05111540000089	', 'FUAD DARY ROSYADI\r\n', '05111540000089	', 'IF184606'),
('05111540000101', 'ADITYA PRATAMA\r\n', '05111540000101', 'IF184606'),
('05111540000105', 'VICKY MAHFUDY\r\n', '05111540000105', 'IF184605'),
('05111540000108', 'ZAHRI RUSLI\r\n', '05111540000108', 'IF184605'),
('05111540000111', 'MUHAMMAD ADIB ARINANDA\r\n', '05111540000111', 'IF184605'),
('05111540000119', 'CAHYA PUTRA HIKMAWAN\r\n', '05111540000119', 'IF184606'),
('05111540000121', 'DICKY MUHAMMAD PRIANGGA\r\n', '05111540000121', 'IF184606'),
('05111540000123', 'ARIYA WILDAN DEVANTO\r\n', '05111540000123', 'IF184605'),
('05111540000132', 'REINHART CAESAR BUTAR BUTAR\r\n', '05111540000132', 'IF184605'),
('05111540000146', 'ABDURRAHMAN M. HATTAMI\r\n', '05111540000146', 'IF184606'),
('05111540000149', 'SUBHAN MAULANA\r\n', '05111540000149', 'IF184606'),
('05111540000153', 'R SIDQI TRI PRIWI\r\n', '05111540000153', 'IF184605'),
('05111540000154', 'UNGGUL WIDODO WIJAYANTO\r\n', '05111540000154', 'IF184605'),
('05111540000155', 'WAHYU IVAN SATYAGRAHA\r\n', '05111540000155', 'IF184606'),
('05111540000156', 'FAUZAN ABID RAMADHAN\r\n', '05111540000156', 'IF184605'),
('05111540000163', 'ARYA WIRANATA\r\n', '05111540000163', 'IF184605'),
('05111540000164	', 'ALFINDIO MUHAMMAD ABDALLAH\r\n', '05111540000164', 'IF184606'),
('05111540000166', 'IVAN AGUNG PANDAPOTAN\r\n', '05111540000166', 'IF184606'),
('05111540000167', 'ICHSAN SANDI DARMAWAN\r\n', '05111540000167', 'IF184605'),
('05111540000168', 'ROGO JAGAD ALIT\r\n', '05111540000168', 'IF184605'),
('05111540000172', 'JOSHUA RESAMUEL\r\n', '05111540000172', 'IF184606'),
('05111540000174', 'RONALD ANDREAN\r\n', '05111540000174', 'IF184606'),
('05111540007003', 'NIRMALA\r\n', '05111540007003', 'IF184605'),
('05111540007005', 'MOH ADAM ALFIAN\r\n', '05111540007005', 'IF184605'),
('05111540007006	', 'Yuga Mitra Hakiki\r\n', '05111540007006	', 'IF184605'),
('05111640000003', 'JOHN HARISON\r\n', '05111640000003', 'IF184606'),
('05111640000034', 'DESY NILASARI\r\n', '05111640000034', 'IF184606'),
('05111640000036', 'RIFKA ANNISA\r\n', '05111640000036', 'IF184606'),
('05111640000039', 'YASINTA ROMADHONA\r\n', '05111640000039', 'IF184606'),
('05111640000040	', 'CORNELIA NATASHA\r\n', '05111640000040	', 'IF184606'),
('05111640000040', 'CORNELIA NATASHA\r\n', '05111640000040', 'IF184606'),
('05111640000047', 'AIDIL ABDILLAH SUYUDI\r\n', '05111640000047', 'IF184606'),
('05111640000074', 'IVANDER WILLIAM\r\n', '05111640000074', 'IF184606'),
('05111640000083', 'ARIIQ FIRANDA NAUFAL\r\n', '05111640000083', 'IF184605'),
('05111640000085', 'IRHAM MUHAMMAD FADHIL\r\n', '05111640000133', 'IF184606'),
('05111640000120	', 'FAIZAL KHIILMI MUZAKKI\r\n', '05111640000120	', 'IF184605'),
('05111640000133', 'FARIZ MAULANA PURNOMO\r\n', '05111640000133', 'IF184606'),
('05111640000140', 'FARIZ PUTRA DANDI\r\n', '05111640000140', 'IF184606'),
('05111640000159	', 'RAHMAD YANUAR MURADI DARMANSYAH\r\n', '05111640000159	', 'IF184606'),
('05111640000162', 'MAHATHIR MUHAMMAD IQBAL\r\n', '05111640000162', 'IF184606'),
('05111640000164', 'HILMI RADITYA PRAKOSO', '05111640000164', 'IF184605'),
('05111640000168', 'ISMAIL SYARIEF\r\n', '05111640000168', 'IF184606'),
('05111640000187', 'KHAIRUNNISA` RAHMA MARDIYANI\r\n', '05111640000187', 'IF184606'),
('05111640000191	', 'SULTANA BALQIS HIDAYAT', '05111640000191	', 'IF184606');

-- --------------------------------------------------------

--
-- Table structure for table `mata_kuliah`
--

CREATE TABLE `mata_kuliah` (
  `kode_mk` varchar(10) NOT NULL,
  `mata_kuliah` varchar(191) DEFAULT NULL,
  `kelas` varchar(10) NOT NULL,
  `nama_dosen` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `mata_kuliah`
--

INSERT INTO `mata_kuliah` (`kode_mk`, `mata_kuliah`, `kelas`, `nama_dosen`) VALUES
('IF184605', 'Pemrograman Berbasis Kerangka Kerja', 'G', 'Ridho Rahman Hariadi, S.Kom., M.Sc.	'),
('IF184606', 'Pemrograman Berbasis Kerangka Kerja', 'H', 'Ridho Rahman Hariadi, S.Kom., M.Sc.	');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `jadwal_kuliah`
--
ALTER TABLE `jadwal_kuliah`
  ADD PRIMARY KEY (`id_jadwal`),
  ADD KEY `fk_kode_mk` (`fk_kode_mk`);

--
-- Indexes for table `log_absen`
--
ALTER TABLE `log_absen`
  ADD PRIMARY KEY (`id_absen`);

--
-- Indexes for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD PRIMARY KEY (`nrp_mahasiswa`),
  ADD UNIQUE KEY `nrp` (`nrp_mahasiswa`),
  ADD KEY `fk_kode_mk_2` (`fk_kode_mk`);

--
-- Indexes for table `mata_kuliah`
--
ALTER TABLE `mata_kuliah`
  ADD PRIMARY KEY (`kode_mk`),
  ADD UNIQUE KEY `kode_mk` (`kode_mk`),
  ADD UNIQUE KEY `kode_mk_2` (`kode_mk`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `jadwal_kuliah`
--
ALTER TABLE `jadwal_kuliah`
  ADD CONSTRAINT `fk_kode_mk` FOREIGN KEY (`fk_kode_mk`) REFERENCES `mata_kuliah` (`kode_mk`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `mahasiswa`
--
ALTER TABLE `mahasiswa`
  ADD CONSTRAINT `fk_kode_mk_2` FOREIGN KEY (`fk_kode_mk`) REFERENCES `mata_kuliah` (`kode_mk`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
