CREATE TABLE `brainmetal`.`Users` (
    `UserID` INT NOT NULL AUTO_INCREMENT,
    `MemberName` VARCHAR(255) NOT NULL,
    `Username` VARCHAR(255) NULL,
    `Email` VARCHAR (255) NOT,
    `hashedPassword` INT(64) NULL,
    `Profile_PIc` VARCHAR(255) NOT NULL,
    `Bio` VARCHAR(255) NOT NULL,
    `updated_at` DATETIME NOT NULL,
    PRIMARY KEY (`UserID`),
    UNIQUE (`Username`),
    UNIQUE (`Email`) 
) ENGINE = InnoDB;

-- Path: Users.sql
ALTER TABLE `brainmetal`.`Users`
MODIFY COLUMN `UserID` INT(11) NOT NULL AUTO_INCREMENT,
MODIFY COLUMN `MemberName` VARCHAR(50) NOT NULL,
MODIFY COLUMN `Username` VARCHAR(50),
MODIFY COLUMN `Email` VARCHAR(255),
MODIFY COLUMN `hashedPassword` VARCHAR(64) NOT NULL,
MODIFY COLUMN `Profile_PIc` VARCHAR(100) NOT NULL,
MODIFY COLUMN `Bio` VARCHAR(255) NOT NULL,
MODIFY COLUMN `updated_at` DATETIME NOT NULL,
ADD UNIQUE (`Username`),
ADD UNIQUE (`Email`);

ALTER TABLE `brainmetal`.`Users`
ADD COLUMN `status` ENUM('verified', 'unverified') NOT NULL DEFAULT 'unverified' AFTER `Bio`;

ALTER TABLE `brainmetal`.`Users`
ADD COLUMN `status` ENUM('verified', 'unverified') NOT NULL DEFAULT 'unverified' AFTER `Bio`,
ADD COLUMN `join` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER `status`,
ADD COLUMN `label` VARCHAR(50) AFTER `join`,
ADD COLUMN `last_activity` DATETIME AFTER `label`;

SELECT
    TABLE_NAME,
    COLUMN_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM
    INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE
    REFERENCED_TABLE_SCHEMA = 'your_database_name' AND
    TABLE_NAME = 'table_name';


