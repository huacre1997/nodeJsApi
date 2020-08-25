const mongoose=require("mongoose")
const Schema=mongoose.Schema

let productoSchema=new Schema({
    name:{type:String,required:[true,"El nombre es obligatorio."]},
    precioUni:{type:Number,required:[true,"El precio unitario es obligatorio"]},
    descripcion:{type:String,required:false},
    image:{type:String,required:false},
    stock:{type:Number,required:true},
    estado:{type:Boolean,default:true},
    categoria:{type:Schema.Types.ObjectId,ref:"Category"},
    usuario:{type:Schema.Types.ObjectId,ref:"Usuario"}
})

module.exports=mongoose.model("Products",productoSchema)