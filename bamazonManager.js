const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

inquirer.prompt([{
    type: "list",
    message: "Please select a menu item",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
    name: "choice"
}]).then(answer => {
    connection.connect(function (err) {
        if (err) throw err;
        console.log("connected as id " + connection.threadId);
        switch (answer.choice) {
            case "View Products for Sale":
                viewProds();
                break;
            case "View Low Inventory":
                break;
            case "Add to Inventory":
                break;
            case "Add New Product":
                break;
        }
    })
})

const viewProds = function () {
    connection.query('SELECT * FROM products', function (error, response) {
        if (error) console.log(error);
        response.forEach(item => {
            console.log("Item ID: " + item.item_id + ", Name: " + item.product_name + ", Price: $" + item.price);
        })
        connection.end();
    });
}

const viewLow = function () {

}

const addInventory = function () {

}

const addProduct = function () {

}