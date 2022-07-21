CREATE TABLE users (
id int(11) AUTO_INCREMENT PRIMARY KEY,
name varchar(90) NOT NULL,
email varchar(255) NOT NULL UNIQUE,
password varchar(255) NOT NULL
);

CREATE TABLE books (
id int(11) AUTO_INCREMENT PRIMARY KEY,
 userid int(11),
name varchar(200) NOT NULL,
author varchar(200) NOT NULL,
price int(11) NOT NULL,
image varchar(100) DEFAULT NULL,
FOREIGN KEY (userid) REFERENCES users (id)
);



