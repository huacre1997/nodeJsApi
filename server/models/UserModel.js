const mongoose=require("mongoose")
const uniueValidator=require("mongoose-unique-validator")
let Schema=mongoose.Schema
let usuarioSchema=new Schema({
    name:{
        type:String,
        required:[true,"El campo nombre es obligatorio"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"El correo es necesario"]
    },
    password:{
        type:String,
        required:[true,"La contraseña es obligatoria"]
    },
    role:{
        type:String,
        default:"USER_ROLE",
        enum:{
            values:["ADMIN_ROLE","USER_ROLE"],
            message:"{VALUE} no es un rol válido."
        }
    },
    image:{
        type:String,
       required:false
    },
    status:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
})
usuarioSchema.methods.toJSON=function()
{
    let user=this
    let userObject=user.toObject()
    delete userObject.password
    return userObject
}
usuarioSchema.plugin(uniueValidator,{
    message:'{PATH} debe ser único'
})

module.exports=mongoose.model("Usuario",usuarioSchema)