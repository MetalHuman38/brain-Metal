CREATE TABLE User (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100)
);

INSERT INTO User (id, name, email)
VALUES
    (1, 'John Doe', 'johndoe@example.com'),
    (2, 'Jane Smith', 'janesmith@example.com'),
    (3, 'Mike Johnson', 'mikejohnson@example.com');