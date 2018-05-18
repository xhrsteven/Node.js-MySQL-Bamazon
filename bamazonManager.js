var mysql = require('mysql');
var inquirer = require('inquirer');
var cliTable = require('cli-table');
var chalk = require('chalk');

//connect mysql
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: "3306",
  password: "Raining2301",
  database: "bAmazon"
});

connection.connect(function(err) {
  if (err) throw err;
  //run function after connection to prompt question
  runSearch();
});

var runSearch = function () { 
    inquirer.prompt([
        {
            name:'action',
            type:'list',
            message:'What would you looking for?',
            choices:['View Products for Sales', 'View Low Inventory','Add to Inventory','Add New Product']
        }
    ]).then(function(answer){
        switch (answer.action) {
            case "View Products for Sales":
            viewSales();
            break;
            case 'View Low Inventory':
            viewLowInventory();
            break;
            case 'Add to Inventory':
            addInventory();
            break;
            case 'Add New Product':
            addNewProduct();
            break;
        }
    });
 }

 var viewSales = function () {
     connection.query('SELECT item_id AS ID, product_name AS PRODUCT, price AS PRICE, stock_quantity AS QUANTITY FROM products', function (err, results) { 
         if(err) throw err;
        //  console.log(results);
         for(var i=0; i<results.length; i++){
            var table = new cliTable();
            table.push(
                ['ID','PRODUCT','PRICE','QUANTITY'], 
                [results[i].ID, results[i].PRODUCT,results[i].PRICE,results[i].QUANTITY]
            );
            console.log(table.toString());
            console.log(chalk.yellow('Cong!\n'));
         }
         runSearch();
      });
   };

var viewLowInventory = function () {
    inquirer.prompt({
        name:'lowInv',
        type:'input',
        message:'View Low Inventory under the number'
    }).then(function (answer) {
        var query = "SELECT item_id AS ID, product_name AS PRODUCT, price AS PRICE, stock_quantity AS QUANTITY FROM products WHERE stock_quantity <="+answer.lowInv;
        connection.query(query,function (err,results) {
            if(err) throw err;
             for (var i = 0; i < results.length; i++) {
               var table = new cliTable();
               table.push(["ID", "PRODUCT", "PRICE", "QUANTITY"], 
               [results[i].ID, results[i].PRODUCT, results[i].PRICE, results[i].QUANTITY]);
               console.log(table.toString());
             }
             runSearch();
          });
      });
  };

var addInventory = function () {
    inquirer.prompt([
        {
            name:'addInv',
            type:'list',
            message:'What kind of product would you like to add?',
            choices:['Apple Watch','Apple Iphone6','Apple Iphone6 Plus', 'Apple Iphone7', 'Apple Iphone7 Plus','Apple Iphone8',
    'Apple Iphone8 Plus','Apple Iphone X','Apple Ipad Air','Apple Mac Pro','Supreme','Champion','American Eagle']
        },
        {
            name:'quantity',
            type:'input',
            message:'How many product would you like to add?'
        }
    ]).then(function (answer) {
        connection.query('SELECT * FROM products WHERE ?', {product_name: answer.addInv}, function (err,results) {
            if(err) throw err;
            // console.log(results[0]);
            //update DB
            connection.query(
                'UPDATE products SET ? WHERE ?',
                [{
                    stock_quantity: results[0].stock_quantity + parseInt(answer.quantity)
                },
                {
                    product_name: answer.addInv
                }
            ],
            function (err) {
                if(err) throw err;
                console.log('You have added successfully!\n');
                runSearch();
              }
            )
        });
      });
  }
  
  var addNewProduct = function () {
      inquirer.prompt([
          {
          name:'product',
          type:'input',
          message:'What\'s product would you like to add?'
        },
        {
            name:'department',
            type:'input',
            message:'What\'s new product department?',
            choices:['Electronic','Clothing']
        },
        {
            name:'price',
            type:'input',
            message:'How much of new product?',
            validate: function (value) {
                if(isNaN(value)===false){
                    return true;
                }else{
                    return false;
                }
              }
        },
        {
            name:'quantity',
            type:'input',
            message:'How many of new product',
            validate: function (value) {
                if(isNaN(value) ===false){
                    return true;
                }else{
                    return false;
                }
              }
        }
      ]).then(function (answer) {
          connection.query(
              'INSERT INTO products SET ?',
              {
                product_name: answer.product,
                department_name: answer.department,
                price: answer.price,
                stock_quantity: answer.quantity
              },
              function (err,results) {
                  if(err) throw err;
                  console.log(results.affectedRows + ' product inserted!\n ');
                  runSearch();
                }
          )
      });
    }