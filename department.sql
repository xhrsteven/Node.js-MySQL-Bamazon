USE bAmazon;
SELECT * FROM departments;
DROP TABLE IF EXISTS departments;

CREATE TABLE departments(
    department_id int auto_increment,
    department_name VARCHAR(100),
    over_head_costs INT default 0,
    product_sales INT DEFAULT 0 ,
    total_profit INT default 0,
    PRIMARY KEY(department_id)
)

USE bAmazon;
INSERT INTO departments (department_id, department_name,over_head_costs,product_sales,total_profit)
VALUES(01, 'Electronic',0,0,0);

INSERT INTO departments
    (department_id, department_name,over_head_costs,product_sales,total_profit)
VALUES(02, 'Clothing',0,0,0);
