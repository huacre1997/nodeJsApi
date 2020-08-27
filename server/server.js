require("./config/config")

const express=require("express")
const mongoose=require("mongoose")
const path=require("path")
const app=express()



const  bodyParser=require("body-parser")
app.use(bodyParser.urlencoded({extended:false})) 
app.use(bodyParser.json())

app.use( express.static(path.resolve(__dirname ,"../public")))
app.use(require("./routes/index"))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.urldB,{ useNewUrlParser: true ,useCreateIndex: true}, (err, res) => {

    if (err) throw err;

    console.log('Base de datos ONLINE');

})

app.listen(process.env.PORT,()=>{
    console.log("Escuchando a tu viejita")
})