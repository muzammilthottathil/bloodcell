create database bloodcell;

CREATE TABLE `users` (
  `user_name` varchar(20) NOT NULL,
  `password` varchar(200) NOT NULL,
  `admin` tinyint NOT NULL,
  PRIMARY KEY (`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `hospital` (
  `name` varchar(50) NOT NULL,
  `street_address` varchar(100) DEFAULT NULL,
  `landmark` varchar(100) DEFAULT NULL,
  `contact_no` int DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `donor` (
  `university_reg_no` varchar(15) NOT NULL,
  `name` varchar(45) NOT NULL,
  `year_of_admission` int NOT NULL,
  `dept` varchar(45) NOT NULL,
  `phone_no` int NOT NULL,
  `blood_group` varchar(10) NOT NULL,
  `height` int NOT NULL,
  `weight` int NOT NULL,
  `mail_id` varchar(45) NOT NULL,
  `last_donation` date NOT NULL,
  PRIMARY KEY (`university_reg_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `requirement` (
  `requirment_id` int NOT NULL AUTO_INCREMENT,
  `patient_name` varchar(45) NOT NULL,
  `by_stander` varchar(45) NOT NULL,
  `blood_group` varchar(5) NOT NULL,
  `quantity` int NOT NULL,
  `type_of_requirement` varchar(20) NOT NULL,
  `hospital` varchar(50) NOT NULL,
  PRIMARY KEY (`requirment_id`),
  KEY `requirement_hospital_idx` (`hospital`),
  CONSTRAINT `requirement_hospital` FOREIGN KEY (`hospital`) REFERENCES `hospital` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `donations` (
  `requirement_id` int NOT NULL,
  `donor_id` varchar(45) NOT NULL,
  `date_of_donation` date NOT NULL,
  PRIMARY KEY (`requirement_id`,`donor_id`),
  KEY `fk_donations_1_idx` (`donor_id`),
  CONSTRAINT `donation_donor` FOREIGN KEY (`requirement_id`) REFERENCES `requirement` (`requirment_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `donation_requirement` FOREIGN KEY (`donor_id`) REFERENCES `donor` (`university_reg_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;




