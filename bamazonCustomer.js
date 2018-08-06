const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
})

const afterConnection = function () {
    connection.query('SELECT * FROM products', function (error, response) {
        if (error) console.log(error);
        response.forEach(item => {
            console.log("Item ID: " + item.item_id + ", Name: " + item.product_name + ", Price: $" + item.price);
        })
        promptUser();
    });


}

const promptUser = function () {
    inquirer.prompt([{
            type: "prompt",
            message: "What is the ID of the product you'd like to buy?",
            name: "p_id"
        },
        {
            type: "prompt",
            message: "What quantity of the product would you like to buy?",
            name: "quantity"
        }
    ]).then(answers => {
        connection.query('SELECT * FROM products WHERE item_id = ' + answers.p_id, function (error, response) {
            if (error) console.log(error);
            let stock = response[0].stock_quantity;
            let user_quantity = parseInt(answers.quantity);
            if (stock >= user_quantity) {
                connection.query("UPDATE products SET stock_quantity = " + (stock - user_quantity) + " WHERE item_id = " + answers.p_id, function (error, response2) {
                    if (error) console.log(error);
                    console.log("Total cost: $" + (response[0].price * user_quantity));
                    connection.end();
                })
            } else {
                console.log("Insufficient quantity!");
                connection.end();
            }
        })
    })
}