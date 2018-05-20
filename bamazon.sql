-- DROP DATABASE IF EXISTS bAmazon;

-- CREATE DATABASE bAmazon;

-- CREATE TABLE products (
--     item_id int AUTO_INCREMENT,
--     product_name VARCHAR(100),
--     department_name VARCHAR(100),
--     price DECIMAL(10,4),
--     stock_quantity int,
--     PRIMARY KEY(item_id)
-- )
USE bAmazon;
ALTER TABLE products 
-- ADD COLUMN `product_sales` INT NOT NULL AFTER `stock_quantity`;
-- ADD COLUMN `product_cost` INT NOT NULL AFTER `price`;
ADD COLUMN `over_head_costs` INT NOT NULL AFTER `product_sales`;


USE bAmazon;
SELECT * FROM products;

USE bAmazon;
UPDATE products SET product_cost = 100 WHERE item_id = 1;

UPDATE products SET product_cost = 400 WHERE item_id = 2;

UPDATE products SET product_cost = 500 WHERE item_id = 3;

UPDATE products SET product_cost = 600 WHERE item_id = 4;

UPDATE products SET product_cost = 700 WHERE item_id = 5;

UPDATE products SET product_cost = 700 WHERE item_id = 6;

UPDATE products SET product_cost = 800 WHERE item_id = 7;

UPDATE products SET product_cost = 700 WHERE item_id = 8;

UPDATE products SET product_cost = 500 WHERE item_id = 9;

UPDATE products SET product_cost = 1500 WHERE item_id = 10;

UPDATE products SET product_cost = 50 WHERE item_id = 11;

UPDATE products SET product_cost = 50 WHERE item_id = 12;

UPDATE products SET product_cost = 50 WHERE item_id = 13;

UPDATE products SET product_cost = 200 WHERE item_id = 14;


-- INSERT INTO products
--     (item_id,product_name,department_name,price,stock_quantity)
-- VALUES(1, 'Apple Watch', 'Electronic', 125, 120);
-- INSERT INTO products
--     (item_id,product_name,department_name,price,stock_quantity)
-- VALUES(2, 'Apple Iphone6', 'Electronic', 599, 100);
-- INSERT INTO products
--     (item_id,product_name,department_name,price,stock_quantity)
-- VALUES(3, 'Apple Iphone6 Plus', 'Electronic', 699, 200);
-- INSERT INTO products
--     (item_id,product_name,department_name,price,stock_quantity)
-- VALUES(4, 'Apple Iphone7', 'Electronic', 799, 180);
-- INSERT INTO products
--     (item_id,product_name,department_name,price,stock_quantity)
-- VALUES(5, 'Apple Iphone7 Plus', 'Electronic', 899, 250);
-- INSERT INTO products
--     (item_id,product_name,department_name,price,stock_quantity)
-- VALUES(6, 'Apple Iphone8', 'Electronic', 899, 300);
-- INSERT INTO products
--     (item_id,product_name,department_name,price,stock_quantity)
-- VALUES(7, 'Apple Iphone8 Plus', 'Electronic', 999, 500);
-- INSERT INTO products
--     (item_id,product_name,department_name,price,stock_quantity)
-- VALUES(8, 'Apple Iphone X', 'Electronic', 899, 400);
-- INSERT INTO products
--     (item_id,product_name,department_name,price,stock_quantity)
-- VALUES(9, 'Apple Ipad Air', 'Electronic', 699, 350);
-- INSERT INTO products
--     (item_id,product_name,department_name,price,stock_quantity)
-- VALUES(10, 'Apple Mac Pro', 'Electronic', 1899, 280);
