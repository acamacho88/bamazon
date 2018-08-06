CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INTEGER AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(30) NOT NULL,
  department_name VARCHAR(30),
  price FLOAT(5,2),
  stock_quantity INTEGER,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES
('iPhone 7','Electronics',199.99,5),
('Lego Pirate set','Toys',54.99,2),
('Garden hoe','Outdoors',12.99,10),
('Advil','Pharmacy',14.99,7),
('White T-Shirt','Clothing',30.54,8),
('Wii U','Electronics',210.99,4),
('The Hate U Give','Books',14.99,3),
('Blue jeans','Clothing',50.99,10),
('Superunknown','Music',13.99,10),
('Toothpaste','Pharmacy',12.99,5);