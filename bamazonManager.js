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
    switch (answer.choice) {
        case "View Products for Sale":
            break;
        case "View Low Inventory":
            break;
        case "Add to Inventory":
            break;
        case "Add New Product":
            break;
    }
})

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    afterConnection();
})

const afterConnection = function () {
    connection.query();
}