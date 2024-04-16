CREATE TABLE NewPosts (
    PostID INT AUTO_INCREMENT PRIMARY KEY,
    CreatorID INT,
    Caption VARCHAR(255),
    ImageURL VARCHAR(255),
    Tags TEXT,
    Location VARCHAR(255),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (CreatorID) REFERENCES Users(UserID)
) ENGINE = InnoDB;

SELECT constraint_name
FROM information_schema.table_constraints
WHERE constraint_type = 'FOREIGN KEY'
  AND table_name = 'Posts'
  AND constraint_name LIKE 'FK_%CreatorID%';