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
)ENGINE = InnoDB;