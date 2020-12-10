const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const tienda = require('./tienda.model.js');

const cuentaSchema = mongoose.Schema({ credit: { type: Number, required: true } });

const UsuarioSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    count: cuentaSchema,
    mail: {
        type: String,
        index: true,
        unique: true,
        required: true,
        trim: true,
        minlength: 8
    },
    pass: {
        type: String,
        min: 10,
        required: true,
    },
    country: {
        type: String,
        min: 4,
        required: true,
    },
    phone: {
        type: Number,
        unique: true,
        required: true,
    },
    token: {
        type: String,
        //required:true       
    }
}, {
    timestamps: true
});

UsuarioSchema.pre('save', async function(next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('pass')) {
        user.pass = await bcrypt.hash(user.pass, 8)
    }
    next()
});

UsuarioSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({ _id: user._id }, "WinterIsComingGOT2019")
    user.token = token
    try {
        await require('./tienda.model.js').updateAdminWithMail(user.mail, token)
    } catch (err) {
        console.log(err)
    }
    await user.save()
    return token
}

UsuarioSchema.statics.findByCredentials = async(mail, pass) => {
    // Search for a user by email and password.        
    try {
        const user = await User.findOne({ 'mail': mail })
        if (!user) {
            throw new Error({ error: 'Invalid login credentials' })
        }
        const isPasswordMatch = await bcrypt.compare(pass, user.pass)
        if (!isPasswordMatch) {
            throw new Error({ error: 'Invalid login credentials' })
        }
        return user
    } catch (error) {
        console.log(error)
    }
}

UsuarioSchema.statics.findByToken = async(token) => {
    // Search for a user by email and password.       
    try {
        const user = await User.find({
            'token': token
        })
        return user;
    } catch (error) {
        console.log(error)
    }
}

UsuarioSchema.statics.requestPayByToken = async(token, monto) => {
    // Search for a user by email and password.       
    try {
        var user = await User.findOne({
            'token': token
        })
        console.log(user)
        monto = user.count.credit - monto
        user = await User.findOneAndUpdate({ "token": token }, {
            "$set": {
                'count.credit': monto
            }
        })
        return user;
    } catch (error) {
        console.log(error)
    }
}

const User = mongoose.model('Usuario', UsuarioSchema);

module.exports = User