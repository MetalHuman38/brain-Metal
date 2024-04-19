CREATE TABLE ImageStorage (
    `ImageID` INT PRIMARY KEY AUTO_INCREMENT,
    `ImageUrl` VARCHAR(255),
    `UserID` INT,
    `NewPostID` INT,
     FOREIGN KEY (UserID) REFERENCES Users(UserID),
     FOREIGN KEY (NewPostID) REFERENCES NewPosts(NewPostID)
) ENGINE = InnoDB;