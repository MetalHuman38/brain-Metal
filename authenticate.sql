CREATE TABLE Authentication (
    UserID INT PRIMARY KEY,
    HashedPassword VARCHAR(255) NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);