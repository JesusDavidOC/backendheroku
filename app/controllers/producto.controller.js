const Product = require('../models/producto.model.js');
// Create and save a new Product
exports.create = async (req, res) => {
    // Validate if the request's body is empty
    // (does not include required data)
    console.log(req.body);
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "Product data can not be empty"
        });
    }
    // Create a new Product with request's data
    const product = new Product({
        name: req.body.name,
        price: req.body.price || 0,
        expiration: req.body.expiration || null
    });
    // Save the Product in the database
    product.save()
        .then(data => {
            res.status(200).send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong occurred while creating the record."
            });
        });
};
// Retrieve and list all Products
exports.findAll = (req, res) => {
    console.log("Listing all products ... soon!");
};
// Get a single Product by its id
exports.findOne = async (req, res) => {
    try {
        const producto = await Product.buscarProducto(req.params.nombreTienda, req.params.nombreProducto)        
        res.status(200).send(producto)
    } catch (err) {
        res.status(400).send({
            message: err.message || "Not found."
        });
    }
};
// Update a Product by its id
exports.update = (req, res) => {
    console.log("Updating a particular product ... soon!");
};
// Delete a Product by its id
exports.delete = (req, res) => {
    console.log("Deleting a particular product ... soon!");
};