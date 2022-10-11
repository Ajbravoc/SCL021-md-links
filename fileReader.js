#!/usr/bin/env node

//Imports 

const path = require('path');
const fs = require('fs');


// FUNCIONES DE LECTURA

// Transforma input de ruta de relativos a absolutos
const getAbsoluteLink = (source) => {
    if(path.isAbsolute(source) === false){
        return path.resolve(source)
    } return source
}

/*
// Verifica si la ruta es un archivo, si es un directorio retorna false
const routeType = (source) => {
    if(source.isFile() === true) {
        return true
    } return false
}*/

module.exports = {getAbsoluteLink};