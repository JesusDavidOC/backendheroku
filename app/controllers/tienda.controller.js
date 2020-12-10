const Tienda = require('../models/tienda.model.js');
const User = require('../models/usuario.model.js');
// Create and save a new Product
exports.create = async (req, res) => {
    // Validate if the request's body is empty
    // (does not include required data)    
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "Store data can not be empty"
        });
    }
    try {
        const tienda = (req.body)
        const token = req.params.token
        var status = await Tienda.guardar(tienda, token)
        console.log(status)
        res.status(201).send({ status })
    } catch (error) {
        res.status(400).send(error)
    }
};
// Retrieve and list all Products
exports.findAll = async (req, res) => {
    try {
        const tiendas = await Tienda.find({})
        res.status(200).send(tiendas)
    } catch (err) {

    }
};
// Get a single Product by its id
exports.findOne = async (req, res) => {
    try {
        const tienda = await Tienda.findByAdmin(req.params.token)
        res.status(200).send(tienda)
    } catch (error) {
        res.status(400).send(error)
    }
};

exports.addParam = async (req, res) => {
    try {
        if (req.body.addProducto) {
            var productos = await Tienda.getProductos(req.body.token)
            productos.push(req.body.producto)            
            const tienda = await Tienda.updateProductos(productos, req.body.token)
            console.log(tienda)
            res.status(200).send(tienda)
        } else if (req.body.venderProducto) {
            const tienda = await Tienda.venderProducto(req.body.name, req.body.namep, req.body.cantidad)
            const user = await User.requestPayByToken(req.body.token, req.body.monto)
            res.status(200).send(user)
        }
    } catch (error) {
        res.status(400).send(error)
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