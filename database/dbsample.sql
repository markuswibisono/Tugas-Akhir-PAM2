-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Aug 04, 2015 at 03:15 AM
-- Server version: 5.6.16
-- PHP Version: 5.5.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `dbsample`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbboneka`
--

CREATE TABLE IF NOT EXISTS `tbboneka` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `NamaBoneka` varchar(200) DEFAULT NULL,
  `Ukuran` varchar(200) DEFAULT NULL,
  `Harga` varchar(200) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `tbboneka`
--

INSERT INTO `tbboneka` (`id`, `NamaBoneka`, `Ukuran`, `Harga`, `img`) VALUES
(1, 'Doraemon', '5Cm', 'Rp.5000', 'http://localhost/TR.PAM2/pictures/doraemon.JPG'),
(4, 'testwilly', 'tesst', 'ere', 'http://localhost/TR.PAM2/pictures/sd.jpg'),
(5, 'Pokemon', '4Cm', 'Rp. 90000', 'http://localhost/TR.PAM2/pictures/none.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tb_toko`
--

CREATE TABLE IF NOT EXISTS `tb_toko` (
  `username` varchar(99) NOT NULL,
  `password` varchar(99) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tb_toko`
--

INSERT INTO `tb_toko` (`username`, `password`) VALUES
('test', 'test');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
