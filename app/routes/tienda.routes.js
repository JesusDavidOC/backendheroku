module.exports = (app) => {
    const tiendas = require('../controllers/tienda.controller.js');
    // Create a new Product
    app.post('/tiendas/:token', tiendas.create);
    // List all Products
    app.get('/tiendas', tiendas.findAll);
    // encontramos usuario segun su token actual.    
    //login with mail an pass    
    // Get a single Product by id
    app.get('/tiendas/:token', tiendas.findOne);

    // Update a Product by id

    app.put('/tiendas/', tiendas.addParam);
    // Delete a Product by id
    app.delete('/tiendas/:id', tiendas.delete);
}