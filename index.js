#!/usr/bin/env node

//Imports

const { routeType, getAbsoluteLink } = require ('./fileReader.js');
const path = require ('path');
const fs = require ('fs');


//Variables globales
const userInput = process.argv [2] //Ruta entregada por el usuario
const absoluteLink = getAbsoluteLink(userInput) //Devuelve ruta absoluta
const inputType = fs.statSync(absoluteLink) // Devuelve true si es archivo y false si es carpeta


//Función principal
const mdLinks = ( route, options) => {
  return new Promise ((resolve, reject => {
    const linksArr = [];
    //Primero verifica si la ruta es a un archivo
    if (routeType (inputType)){
      //De ser así, comprobamos que la extensión del archivo sea .md
      if (extValidator (fileExt, validExt) == false){
        //Si el archivo no es .md, se rechaza
        reject (' Este no es un archivo .md')
      }
    }
  }))
}

module.exports = {mdLinks, absoluteLink}
 

//const { hola } = require("./mdLinks.js")
//estamos requiriendo un modulo, importandolo

//console.log(saludo.nombreModulo("freeCodeCamp"));
// Tenemos un objeto "saludo", que tiene una propiedad "saludar" 
// la cual está asociada a una función
// Le pasamos el argumento que necesita la función en ""

//console.log(hola());
// Acá llamo al nombre del modulo