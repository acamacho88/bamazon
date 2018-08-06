const mysql = require('mysql');

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
    });

    connection.end();
}