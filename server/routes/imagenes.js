const express=require("express")
const fs=require("fs")
const {verificaTokenImg}=require("../middlewares/authentication")
const path=require("path")
let app=express()
app.get("/image/:tipo/:img",verificaTokenImg,(req,res)=>{
    let tipo=req.params.tipo
    let img=req.params.img
    let pathImagen=path.resolve(__dirname,`../../uploads/${tipo}/${img}`)
    if(fs.existsSync(pathImagen)){
        res.sendFile(pathImagen)
    }else{
    let noimg=path.resolve(__dirname,`../assets/noimage.jpg`)

    res.sendFile(noimg)}
})

module.exports=app