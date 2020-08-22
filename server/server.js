require("./config/config")

const express=require("express")
const mongoose=require("mongoose")

const app=express()



const  bodyParser=require("body-parser")
app.use(bodyParser.urlencoded({extended:false})) 
app.use(bodyParser.json())
app.use(require("./routes/index"))


mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.urldB,{ useNewUrlParser: true ,useCreateIndex: true}, (err, res) => {

    if (err) throw err;

    console.log('Base de datos ONLINE');

})

app.listen(process.env.PORT,()=>{
    console.log("Escuchando a tu viejita")
})