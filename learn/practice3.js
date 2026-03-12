const e = require("express")

// Objeto
const lenguajes = {
    compilados: ["JAVA","C","C++"],
    interpretados: ["Python", "PHP","JS"]
}

const body = {
    apellidos: "Magallanes",
    nombres: "Carlos",
    edad: 22,
    estaCasado: false

}

//Deserializacion (descomposicion)
const {apellidos, nombres, edad, estaCasado} = body

/* const apellidos = body.apellidos
const nombres = body.nombres
const edad = body.edad
const estaCasado = body.estaCasado */

console.log(apellidos,nombres,edad,estaCasado);

/* console.log(lenguajes.compilados[0]) */
