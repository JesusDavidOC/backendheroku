module.exports = (app) => {
    const producto = require('../controllers/producto.controller.js');
    // Create a new Product
    app.post('/productos', producto.create);
    // List all Products
    app.get('/productos', producto.findAll);
    // Get a single Product by id
    app.get('/productos/:nombreTienda/:nombreProducto', producto.findOne);
    // Update a Product by id
    app.put('/productos/:id', producto.update);
    // Delete a Product by id
    app.delete('/productos/:id', producto.delete);
}