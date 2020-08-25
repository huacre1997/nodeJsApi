const express = require('express');
const fileUpload = require('express-fileupload');
const Usuario=require("../models/UserModel")
const Producto=require("../models/ProductModel")
const path=require("path")
const fs=require("fs")
const app = express();

// default options
app.use(fileUpload());

app.put('/uploads/:tipo/:id', function(req, res) {
    let tipo=req.params.tipo
    let id=req.params.id

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  let tiposValidos=["productos","usuarios"]
  if(tiposValidos.indexOf(tipo)<0){
      return res.status(400).json({
          ok:false,
          err:{
              message:"Los tipos permitidos son "+tiposValidos.join(", ")
          }
      })
  }
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.archivo;
  let extensiones=["png","jpg","gif","jpeg"]
  let nombreCortado=sampleFile.name.split('.')
  let extension=nombreCortado[nombreCortado.length-1]
  if(extensiones.indexOf(extension)<0){
      return res.status(400).json({
          ok:false,
          err:{
              message:"La extensiones permitidas son "+extensiones.join(', ')
          }
      })
  }
  let nombrerchivo=`${id}-${new Date().getMilliseconds()}.${extension}`
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(`uploads/${tipo}/${nombrerchivo}`, function(err) {
    if (err)
      return res.status(500).json({
          ok:false,
          err
      });
      if(tipo=="ususarios"){
   imagenUsuario(id,res,nombrerchivo)
    }else{
   imagenProducto(id,res,nombrerchivo)}
  });
});
function imagenUsuario(id,res,nombrerchivo){
    Usuario.findById(id,(err,usuarioDB)=>{
        if(err){
            borrarImagen(nombreImage,"usuarios")
            return res.status(500).json({
                ok:false,
                err
            })
        }
        if(!usuarioDB){
            borrarImagen(nombreImage,"usuarios")

            return res.status(400).json({
                ok:false,
                err:{
                    message:"Usuario no existe"
                }
            })
        }
        // let pathImage=path.resolve(__dirname,`../../uploads/usuarios/${usuarioDB.image}`)
        // if(fs.existsSync(pathImage)){
        //     fs.unlinkSync(pathImage)
        // }
        borrarImagen(usuarioDB.image,"usuarios")
        usuarioDB.image=nombrerchivo
        usuarioDB.save((err,usuarioSaved)=>{
            res.json({
                ok:true, 
                usuario:usuarioSaved,
                img:nombrerchivo
            })
        })
    })
}
function imagenProducto(id,res,nombreArchivo){
    Producto.findById(id,(err,productoDB)=>{
        if(err){
            borrarImagen(nombreImage,"productos")
            return res.status(500).json({
                ok:false,
                err
            })
        }
        if(!productoDB){
            borrarImagen(nombreImage,"productos")

            return res.status(400).json({
                ok:false,
                err:{
                    message:"Usuario no existe"
                }
            })
        }
        // let pathImage=path.resolve(__dirname,`../../uploads/usuarios/${usuarioDB.image}`)
        // if(fs.existsSync(pathImage)){
        //     fs.unlinkSync(pathImage)
        // }
        borrarImagen(productoDB.image,"productos")
        productoDB.image=nombreArchivo
        productoDB.save((err,productoSaved)=>{
            res.json({
                ok:true, 
                producto:productoSaved,
                img:nombreArchivo
            })
        })
    })
}
function borrarImagen(nombreImage,tipo){
    let pathImage=path.resolve(__dirname,`../../uploads/${tipo}/${nombreImage}`)
    if(fs.existsSync(pathImage)){
        fs.unlinkSync(pathImage)
    }
}
module.exports=app