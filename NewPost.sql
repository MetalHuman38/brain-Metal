CREATE TABLE NewPosts (
    `NewPostID` INT AUTO_INCREMENT PRIMARY KEY,
    `PostID` INT,
    `CreatorID` INT,
    `Caption` VARCHAR(255),
    `ImageURL` VARCHAR(255),
    `Tags` TEXT,
    `Location` VARCHAR(255),
    `CreatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (PostID) REFERENCES Posts(PostID),
    FOREIGN KEY (CreatorID) REFERENCES Users(UserID)
<<<<<<< HEAD
)ENGINE = InnoDB;
=======
) ENGINE = InnoDB;

SELECT constraint_name
FROM information_schema.table_constraints
WHERE constraint_type = 'FOREIGN KEY'
  AND table_name = 'Posts'
  AND constraint_name LIKE 'FK_%CreatorID%';
>>>>>>> 58fd192 (FileUpload-Complete)
