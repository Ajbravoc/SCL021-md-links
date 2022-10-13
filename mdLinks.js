#!/usr/bin/env node

const path = require('path');
let fs = require('fs');
const { extname } = require('path');
const userRoute = process.argv[2]; //node documento.js laruta.com
                                    //[0]    [1]          [2]
const formatOk = ".md";
let colors = require ('colors');


let expReg = /(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gi




/*------------------------------------------------------------------------------------ */

// Lectura de ruta (Transforma la ruta relativa a absoluta)

const getAbsoluteLink = () => {
    if(path.isAbsolute(userRoute) === false){
        return path.resolve(userRoute)
        //lo entrega, con console.log se puede comprobar
    } 
    return getAbsoluteLink;
}
console.log("De ruta relativa a ruta absoluta: " + path.resolve(userRoute))


/*------------------------------------------------------------------------------------ */

// Verifica si el archivo es un archivo 

  let stats = fs.statSync(userRoute);
console.log("¿La ruta corresponde a un archivo? " + stats.isFile());

/*------------------------------------------------------------------------------------ */

//Obtener formato de archivo 
let filename = userRoute; 
let ext = filename.substring(filename.indexOf('.'));

let extension = ext
if (extension === formatOk){
    console.log( "La extensión del archivo es .md? " + (extension === formatOk))

    let arr = filename.split(",");
    console.log (arr); //Ruta en un array
}
else { 
    console.log("Archivo inválido".rainbow);
}


/* Subtring method devuelve un subconjunto de un objeto string
cadena.substring(indiceA[, indiceB'])
indexOf: Método que devuelve la posición en la cadena de la primera ocurrencia del valor
/*------------------------------------------------------------------------------------ */

//Lectura del archivo, links.
// Método accede a un fichero para su lectura 

const links = [];
fs.readFile(userRoute, 'utf-8', (err, data) => {
    if(err) {
      console.log('error: ', err);
    } else {
      console.log(data.match(expReg));
    }
  });


/*------------------------------------------------------------------------------------ */
