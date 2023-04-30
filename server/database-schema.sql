-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 26, 2023 at 10:14 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `timetocode`
--

-- --------------------------------------------------------

--
-- Table structure for table `stage_progress`
--

CREATE TABLE `stage_progress` (
  `user_id` int(11) NOT NULL,
  `stage_number` int(11) NOT NULL,
  `stage_star` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `stage_progress`
--

INSERT INTO `stage_progress` (`user_id`, `stage_number`, `stage_star`) VALUES
(2, 1, 3),
(2, 2, 3),
(5, 2, 3),
(5, 1, 2),
(2, 3, 3),
(2, 4, 3),
(2, 5, 3),
(2, 6, 2),
(2, 7, 1),
(2, 8, 1),
(2, 9, 3),
(2, 10, 3),
(2, 11, 2),
(2, 12, 3),
(2, 13, 3),
(2, 14, 1),
(2, 14, 3),
(2, 15, 3),
(2, 16, 3),
(2, 17, 3),
(2, 18, 2),
(2, 19, 3),
(2, 20, 3),
(2, 21, 3),
(2, 22, 1),
(2, 23, 3),
(2, 24, 2),
(2, 25, 3),
(2, 26, 3),
(2, 27, 3),
(2, 27, 2),
(2, 28, 3),
(2, 29, 3),
(2, 30, 2),
(2, 31, 3),
(2, 32, 2),
(2, 33, 2),
(2, 34, 2),
(2, 35, 3),
(10, 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `tutorial_progress`
--

CREATE TABLE `tutorial_progress` (
  `user_id` int(11) NOT NULL,
  `chapter_number` int(11) NOT NULL,
  `section_number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tutorial_progress`
--

INSERT INTO `tutorial_progress` (`user_id`, `chapter_number`, `section_number`) VALUES
(1, 0, 1),
(2, 0, 1),
(2, 1, 1),
(2, 1, 3),
(2, 2, 1),
(2, 2, 2),
(3, 0, 1),
(2, 2, 3),
(2, 3, 1),
(2, 3, 2),
(2, 1, 2),
(2, 3, 3),
(4, 1, 3),
(4, 0, 1),
(4, 2, 3),
(4, 3, 3),
(4, 4, 1),
(4, 4, 2),
(2, 4, 3),
(2, 4, 1),
(2, 4, 2),
(5, 0, 1),
(5, 1, 3),
(5, 1, 1),
(5, 1, 2),
(10, 0, 1),
(10, 1, 1),
(10, 1, 2),
(10, 1, 3),
(10, 2, 1),
(10, 2, 2),
(10, 2, 3),
(10, 3, 1),
(10, 3, 2),
(10, 3, 3),
(10, 4, 1),
(10, 4, 2),
(10, 4, 3);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `ctime` int(11) NOT NULL,
  `utime` int(11) NOT NULL,
  `first_name` varchar(40) NOT NULL,
  `last_name` varchar(40) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `ctime`, `utime`, `first_name`, `last_name`, `username`, `password`) VALUES
(1, 1678471704, 1678471704, 'testingFirst', 'testingLast', 'testingDB', 'password'),
(2, 1678956670, 1678956670, 'admin', 'admin', 'admin', 'admin'),
(3, 1678957787, 1678957787, 'first2', 'last2', 'username1', 'password'),
(4, 1678958075, 1678958075, 'first', 'last', 'username2', 'password'),
(5, 1678963124, 1678963124, 'ddd', 'ddd', 'username3', 'password'),
(6, 1679045256, 1679045256, 'last', 'first', 'testing', 'password'),
(7, 1679299460, 1679299460, 'first', 'last ', 'username-', 'password'),
(8, 1681660568, 1681660568, 'testgg', 'testigg', 'user', 'password'),
(9, 1681660623, 1681660623, 'firstt', 'lastt', 'user1', 'password'),
(10, 1682454502, 1682454502, 'qwe', 'qwe', 'testing1', 'password');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;