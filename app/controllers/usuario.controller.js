const usuario = require('../models/usuario.model.js');
const bcrypt = require('bcryptjs')
    // Create and save a new Product
exports.create = async(req, res) => {
    // Validate if the request's body is empty
    // (does not include required data)
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "User data can not be empty"
        });
    }
    try {
        const user = new usuario(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error)
    }
};
// Retrieve and list all Products
exports.findAll = (req, res) => {
    console.log("find all coming soon...")
};
// Get a single Product by its id
exports.findOne = (req, res) => {
    const user = usuario.find({
        mail: req.body.mail
    })
    try {
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
};


exports.findWhitToken = async(req, res) => {
    try {
        const user = await usuario.findByToken(req.params.token)
        res.status(200).send({ nombre: user[0].name, correo: user[0].mail })
    } catch (error) {
        res.status(400).send(error)
    }
};

exports.login = async(req, res) => {

    try {
        const { mail, pass } = req.body
        const user = await usuario.findByCredentials(mail, pass)        
        if (!user) {
            return res.status(401).send({ error: 'Login failed! Check authentication credentials' })
        }
        const token = await user.generateAuthToken()
        res.status(200).send({ token })
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