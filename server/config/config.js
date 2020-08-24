process.env.PORT=process.env.PORT || 3001
process.env.NODE_ENV=process.env.NODE_ENV || "dev"
process.env.CADUCIDAD_TOKEN=60*60*24*30
process.env.SEED=process.env.SEED|| "seed de desarrollo"

let urldB
if(process.env.NODE_ENV==="dev"){
    urldB="mongodb://localhost:27017/bdprueba"    
}
else{
    urldB=process.env.MONGO_URI
}
process.env.urldB=urldB

process.env.CLIENT_ID=process.env.CLIENT_ID || '2997967704-vl3pstl0pj24ho6rr1g4v391o81mf039.apps.googleusercontent.com'