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
  //run function after connection to prompt questions
  connection.query('SELECT * FROM products', function (err,result) {
    if(err) throw err;
    // console.log(result);
    for(var i =0; i<result.length; i++){
      var wholeProduct = new cliTable();
      wholeProduct.push(
        ['ID', 'Product', 'Price', 'Quantity'],
        [result[i].item_id,result[i].product_name, result[0].price, result[i].stock_quantity]
      );
      console.log(wholeProduct.toString());
    }
    runSearch();
    })
});

var runSearch = function (){
  inquirer.prompt([
    {
      name:'product',
      type:'list',
      message:'What product would you like to purchase?',
      choices:['Apple Watch','Apple Iphone6','Apple Iphone6 Plus', 'Apple Iphone7', 'Apple Iphone7 Plus','Apple Iphone8',
    'Apple Iphone8 Plus','Apple Iphone X','Apple Ipad Air','Apple Mac Pro','Supreme','Champion','American Eagle']
    },
    {
      name:'quantity',
      type:'input',
      message:'How many products would you like to purchase?'
    }
  ]).then(function(answer){ 
    var query1 = 'SELECT * FROM products WHERE ?';
    connection.query(query1, {product_name: answer.product}, function(err,results){
      if(err) throw err;
      // console.log(results);
      if (results[0].stock_quantity < parseInt(answer.quantity)) {
          chalk.red(console.log("Insufficient quantity!"));
          runSearch();
        }else{
          // update DB
          connection.query(
            'UPDATE products SET ? WHERE ?',
              [{
                stock_quantity: results[0].stock_quantity - answer.quantity,
                product_sales: results[0].price*answer.quantity+results[0].product_sales,
                over_head_costs: answer.quantity * results[0].product_cost + results[0].over_head_costs,
                product_sales: results[0].price * answer.quantity + results[0].product_sales 
              },
              {
                product_name: answer.product
              }
            ],
            function (err) {
              if(err) throw err;
              // console.log('You have purchased successfully!\n');
            }
          );
          //output the result
          var table = new cliTable();
          table.push(
            ['Product','Price','Quantity','TotalCost'],
            [results[0].product_name,results[0].price,answer.quantity,results[0].price*answer.quantity]
          );
          console.log(table.toString());
          console.log(chalk.blue('Thank you for your purchase!\n'));
          runSearch();
        }
    });
  });
}
