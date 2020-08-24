const express = require("express")

const { verificaToken,checkRole } =require("../middlewares/authentication")
const app = express()
const Categoria = require("../models/CategoryModel")

app.get("/category",[verificaToken],(req,res)=>{
Categoria.find({})
.populate('usuario')
.exec((err,categoriaDB)=>{
    if(err){
        return res.status(400).json({
            ok:false,
            err
        })
    }
        res.json({
            ok :true,
            categoria:categoriaDB

        })

})
      
   
})
app.get("/categoria/:id",verificaToken,(req,res)=>{
    let id = req.params.id
    console.log(id)

    Categoria.findById(id,(err,categoriaDB)=>{
        if (err) {
            return res.status(400).json({
                ok: false, 
                err
            })
        }
        
        if (!categoriaDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto'
                }
            });
        }
        res.json({
            ok: true,
            category: categoriaDB
        })
    })
})

app.post('/categoria', [verificaToken,checkRole], function(req, res) {
    // regresa la nueva categoria
    // req.usuario._id
    let body = req.body;
    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        else{
            console.log("aea")
        }
        
        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });


});
app.put('/category/:id',verificaToken,(req,res)=>{
    let id = req.params.id
    let body = req.body
    Categoria.findByIdAndUpdate(id,body,{new:true}, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false, 
                err
            })
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        })
    })
})
app.delete('/category/:id', [verificaToken, checkRole],(req,res)=>{
   // Categoria.findByIdAndRemove
   let id = req.params.id;

   Categoria.findByIdAndRemove(id, (err, categoriaDB) => {

       if (err) {
           return res.status(500).json({
               ok: false,
               err
           });
       }

       if (!categoriaDB) {
           return res.status(400).json({
               ok: false,
               err: {
                   message: 'El id no existe'
               }
           });
       }

       res.json({
           ok: true,
           message: 'Categoria Borrada'
       });

   });


})
module.exports=app;
