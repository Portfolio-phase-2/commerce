const User = require('../models/User')
const hash = require('bycjwt')

module.exports      = {

    signup: (req, res) => {
        let objUser = {
            name    : req.body.name,
            email   : req.body.email,
            password: req.body.password
        }
        User.create(objUser)
        .then( response => res.status(201).json({response}))
        .catch( err => {
            res.status(500).json(err)
        })
    },

    signin : (req, res) => {
        let email           = req.body.email
        let password        = req.body.password

        User.findOne({email: email})
        .then( user => {
            if(hash.bcdecode(password, user.password)) { 
                res.status(200).json({
                    err:false,
                    name: user.name,
                    token:hash.jwtencode({
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    })
                })
            } else {
                res.status(400).json({message:"Password is wrong"})
            }
        })
        .catch(err => {
            res.status(500).json({err:true})
        })
    },

    getOne: (req, res) => {
        User.findById({_id: req.decoded.id})
        .populate('cart')
        .then( response => res.status(200).json(response))
        .catch( err => res.status(500).json(err))
    }
}
// By Asrul Harahap - 2018