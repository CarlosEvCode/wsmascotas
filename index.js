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

///* SERVICIOS WEB */
//VERBO = ACCION = INTENCION
//GET   :Leer
//POST  :Crear
//PUT   :Actualizar
//DELETE:Eliminar

//req (requiere, requerimiento)
//res (response,respuesta)
app.post('/mascotas',(req,res)=>{
    res.send({'proceso': 'POST'})
})
app.get('/mascotas',(req,res)=>{
    res.send({'proceso': 'GET'})
})
app.put('/mascotas',(req,res)=>{
    res.send({'proceso': 'PUT'})
})
app.delete('/mascotas',(req,res)=>{
    res.send({'proceso': 'DELETE'})
})

app.listen(PORT, ()=>{
    console.log("Servidor iniciado correctamente en http://localhost:3000");
})