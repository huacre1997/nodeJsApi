const express = require("express")
const {
    verificaToken
} = require("../middlewares/authentication")

let app = express()
let Producto = require("../models/ProductModel")
app.get("/products", verificaToken, (req, res) => { 
    let desde=req.query.desde||0
    desde =Number(desde)
    Producto.find({})
        .skip(desde)
        .limit(5)
        .populate("categoria","descripcion")
        .populate("usuario","name email")
        .exec((err, productoDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            res.json({
                ok: true,
                producto: productoDB

            })
        })

})
app.get("/products/:id", (req, res) => {
    let id=req.params.id
    Producto.findById(id) 
    .populate("categoria","descripcion")
    .populate("usuario","name email")
    .exec((err,productoDB)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err:{
                    message:"No existe Producto"
                }
            })
        }
        res.json({
            ok: true,
            producto: productoDB

        })
    })

})
app.post("/products", verificaToken, (req, res) => {
    let body = req.body;
    let producto = new Producto({
        name: body.name,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        stock: body.stock,
        usuario: req.usuario._id,
        categoria: body.categoria

    });

    producto.save((err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        } else {
            console.log("aea")
        }

        res.json({
            ok: true,
            producto: productoDB
        });

    });
})
app.put("/products/:id", (req, res) => {
    let id = req.params.id
    let body = req.body

    Producto.findById(id, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "El producto no existe"
                }
            });
        }


        productoDB.name = body.name
        productoDB.precioUni = body.precioUni
        productoDB.stock = body.stock
        productoDB.categoria = body.categoria
        productoDB.descripcion = body.descripcion

        productoDB.save((err, productoSaved) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                producto: productoSaved
            })
        })

    })
})
app.delete("/products/:id",verificaToken,(req,res)=>{
    let id = req.params.id;

    Producto.findById(id, (err, productoDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'ID no existe'
                }
            });
        }

        productoDB.estado = false;

        productoDB.save((err, productoBorrado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoBorrado,
                mensaje: 'Producto borrado'
            });

        })

    })

})
app.get("/products/search/:termino",verificaToken,(req,res)=>{
    let termino=req.params.termino
    let regex=new RegExp(termino,"i")
    Producto.find({name:regex})
    .populate("categoria","descripcion")
    .exec((err,productoDB)=>{
        
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }   
        res.json({
            ok:true,
            producto:productoDB
        })
    })
})
module.exports = app