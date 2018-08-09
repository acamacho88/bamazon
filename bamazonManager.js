const mysql = require('mysql');
const inquirer = require('inquirer');

inquirer.prompt([{
    type: "list",
    message: "Please select a menu item",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
    name: "choice"
}]).then(answer => {
    console.log(answer.choice);
})

/* const connection = mysql.createConnection({
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
    connection.query();
} */