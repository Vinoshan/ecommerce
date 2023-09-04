-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;

-- Create the Category table
CREATE TABLE Category (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_name VARCHAR(255) NOT NULL
);

-- Create the Product table
CREATE TABLE Product (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL DEFAULT 10,
  category_id INT,
  FOREIGN KEY (category_id) REFERENCES Category(id)
);

-- Create the Tag table
CREATE TABLE Tag (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tag_name VARCHAR(255)
);

-- Create the ProductTag table for the many-to-many relationship
CREATE TABLE ProductTag (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT,
  tag_id INT,
  FOREIGN KEY (product_id) REFERENCES Product(id),
  FOREIGN KEY (tag_id) REFERENCES Tag(id)
);
