const express = require('express') //Framework
const mysql = require('mysql2') // Acceso BD
const bodyParser = require('body-parser') //Interactuar con JSON

const app = express()
app.use(bodyParser.json())

//Configuracion de acceso - .env
const db = mysql.createConnection({
    host:       'localhost',
    user:       'root',
    password:   '',
    database:   'dbmascotas'
})

//Aperturar la conexion
db.connect((err) =>{
    if(err) throw err;
    console.log("Conectado a la DB de mascotas")
})

//Iniciar el servidor
const PORT = 3000


app.listen(PORT, ()=>{
    console.log("Servidor iniciado correctamente en http://localhost:3000");
})