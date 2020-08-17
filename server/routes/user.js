const express = require("express")
const bcrypt = require("bcrypt")
const _ =require("underscore")
const Usuario = require("../models/UserModel")
const app = express()


app.get("/usuario", function (req, res) {
    let desde=req.query.desde || 0
    let limite=req.query.limite || 5
    desde=Number(desde)
    limite=Number(limite)

    Usuario.find({},"name email").skip(desde).limit(limite).exec((err,usuarios)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                err
            })
        }
        Usuario.count({},(err,conteo)=>{
            res.json({
                ok :true,
                usuarios,
                cuantos:conteo
    
            })
        })
     
    })

})
app.post("/usuario", function (req, res) {
    let body = req.body
    let usuario = new Usuario({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })



})
app.put("/usuario/:id", function (req, res) {
    let id = req.params.id
    let body = _.pick(req.body, ['name', 'email', 'image', 'role', 'status']);
    Usuario.findByIdAndUpdate(id,body,{new:true}, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false, 
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
})
app.delete("/usuario/:id", function (req, res) {
    let id = req.params.id
   
    
    Usuario.findByIdAndUpdate(id,{status:false},{new:true}, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false, 
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
})
module.exports = app