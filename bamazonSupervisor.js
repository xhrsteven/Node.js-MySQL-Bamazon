var mysql = require("mysql");
var inquirer = require("inquirer");
var cliTable = require("cli-table");
var chalk = require('chalk');

//connect mysql
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: "3306",
    password: "Raining2301",
    database: "bAmazon"
});

connection.connect(function (err) {
    if(err) throw err;
    runSearch();
  })

var runSearch = function () {
    inquirer.prompt({
        name:'action',
        type:'list',
        message:'Show me details',
        choices:['View Product Sales by Department', 'Create New Department']
    })
    .then(function (answer) {
        switch (answer.action) {
            case "View Product Sales by Department":
            productSales();
            break;
            case 'Create New Department':
            newDepartment();
            break;
        }
      });
  }

var productSales = function () {
    var query = "SELECT department_name, SUM(product_sales) AS Total_Sales, SUM(over_head_costs) AS Total_Cost, (SUM(product_sales)-SUM(over_head_costs)) as Total_profit from products as p GROUP BY department_name  ";
    connection.query(query,function (err,results) {
        if(err) throw err;
        // console.log(results);
        for(var i = 0; i<results.length; i++){
            var table = new cliTable();
            table.push(
                ['Department', 'Total_Sales', 'Total_Cost', 'Total_profit'],
                [results[i].department_name, results[i].Total_Sales, results[i].Total_Cost, results[i].Total_profit]
            );
            console.log(table.toString());
            console.log(chalk.red("--------------------------------------------------------"));
        }
        runSearch();
      }); 
  }

var newDepartment = function () {
    console.log(">>>>>>Creating New Department<<<<<<");
    inquirer.prompt([
        {
            type: "input",
            name: "deptName",
            message: "Department Name: "
        }])
        .then(function (answer) {
            connection.query(
                'INSERT INTO departments SET ?',
                {
                    department_name: answer.deptName,
                },
                function (err) {
                    if(err) throw err;
                    console.log(chalk.yellow("Another department has been added!"));
                    runSearch();
                }
            )
          })

  }
