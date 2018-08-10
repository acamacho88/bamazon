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
                viewLow();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                addProduct();
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
    connection.query('SELECT * FROM products WHERE stock_quantity < 5', function (error, response) {
        if (error) console.log(error);
        response.forEach(item => {
            console.log("Item ID: " + item.item_id + ", Name: " + item.product_name + ", Price: $" + item.price);
        })
        connection.end();
    });
}

const addInventory = function () {
    inquirer.prompt([{
            type: "input",
            message: "Enter the ID of the item you'd like to add to",
            name: "id"
        },
        {
            type: "input",
            message: "Enter the amount of items you're adding to the current inventory",
            name: "quantity"
        }
    ]).then(answer => {
        let id = parseInt(answer.id);
        let quantity = parseInt(answer.quantity);
        if (id !== NaN && quantity !== NaN) {
            connection.query("SELECT stock_quantity FROM products WHERE item_id = " + id, function (error, response) {
                let currStock = parseInt(response[0].stock_quantity);
                currStock += quantity;
                connection.query("UPDATE products SET stock_quantity = ? WHERE item_id = ?", [currStock, id], function (error, response) {
                    console.log("Item added!");
                    connection.end();
                })
            })
        } else {
            console.log("Invalid entries!");
        }
    })
}


const addProduct = function () {
    inquirer.prompt([{
            type: "input",
            message: "Enter the product name",
            name: "name"
        },
        {
            type: "input",
            message: "Enter the department name",
            name: "department"
        },
        {
            type: "input",
            message: "Enter the price (with no $)",
            name: "price"
        },
        {
            type: "input",
            message: "Enter the number of items we're adding",
            name: "stock"
        }
    ]).then(answer => {
        let name = answer.name;
        let department = answer.department;
        let price = parseFloat(answer.price);
        let stock = parseInt(answer.stock);
        if (price !== NaN && stock !== NaN) {
            let prod = {
                product_name: name,
                department_name: department,
                price: price,
                stock_quantity: stock
            };
            connection.query("INSERT INTO products SET ?", prod, function (error, results) {
                if (error) console.log(error);
                console.log("Item entered!");
                connection.end();
            })
        } else {
            console.log("Invalid price/stock!");
        }
    })
}