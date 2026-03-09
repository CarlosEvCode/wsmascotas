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
//PUT   :Actualizar todo
//PATCH :Actualizacion parcial
//DELETE:Eliminar

//req (requiere, requerimiento)
//res (response,respuesta)
app.post('/mascotas',(req,res)=>{
    //Y los datos que queremos guardar? - DESERIALIZACION
    const {tipo,nombre,color,pesokg} = req.body
    //? = comodin, evita ataques por SQLinjection
    const sql = "INSERT INTO mascotas (tipo,nombre,color,pesokg) VALUES (?,?,?,?)"

    db.query(sql,[tipo,nombre,color,pesokg],(err,results) =>{
        if(err) return res.status(500).send({
            success:false,
            message: 'No se concretó el registro'
        })

        //Qué hacemos cuando logramos registrar?
        res.send({
            success: true,
            message: 'Nueva mascota registrada',
            id: results.insertId
        })
    })
})
app.get('/mascotas',(req,res)=>{
    const sql = "SELECT * FROM mascotas LIMIT 10"
    db.query(sql,(err,results)=>{
        if(err) return res.status(500).send({message: 'Error acceso a datos'})
        res.json(results)
    })
    /* res.send({'proceso': 'GET'}) */
})
//Se enviara el ID por la URL (endpoint)
//Se enviara los datos por JSON
app.put('/mascotas/:id',(req,res)=>{
    const {id} = req.params
    const {tipo,nombre,color,pesokg} =req.body
    //Podemos escribir multilinea utilizando`
    //COMODINES van en un indice
    const sql = `UPDATE mascotas SET tipo=?,nombre=?,color=?,pesokg=? WHERE id =?`
    db.query(sql, [tipo, nombre, color, pesokg, id],(err,results)=>{
        if(err){
            res.status(500).send({
                seccess: false,
                message: "No se concretó la actualizacion",
                data: err
            })
        }

        return res.send({
            seccess: true,
            message: "Registro actualizado"
        })
    })
})

//En un WS para eliminar un registro, pasamos la PK como parte de la ruta
//Ejemplo: DELETE - miwebservice.com/clientes/1
app.delete('/mascotas/:id',(req,res)=>{
    //De dónde obtenemos el ID a borrar? => ENDPOINT (URL)
    const {id} = req.params
    const sql = "DELETE FROM mascotas WHERE id = ?"
    db.query(sql,[id], (err,results)=>{
        //Clausula de GUARDA / retorno temprano
        if(err){
            res.status(500).send({
                seccess: false,
                message: 'No se puede eliminar el registro'
            })
        }
        
        if(results.affectedRows==0){
            return res.status(404).send({
            success: false,
            message: 'No existe la mascota'
            })
        }

        return res.send({
            success: true,
            message: 'Eliminado correctamente'
        })
        
    })
})

app.listen(PORT, ()=>{
    console.log("Servidor iniciado correctamente en http://localhost:3000");
})