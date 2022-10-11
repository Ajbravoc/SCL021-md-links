#!/usr/bin/env node

const path = require('path');
let fs = require('fs');
const { extname } = require('path');
const userRoute = process.argv[2]; //node documento.js laruta.com
                                    //[0]    [1]          [2]
const formatOk = ".md";

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
    console.log("Archivo inválido");
}


/* Subtring method devuelve un subconjunto de un objeto string
cadena.substring(indiceA[, indiceB'])
indexOf: Método que devuelve la posición en la cadena de la primera ocurrencia del valor
/*------------------------------------------------------------------------------------ */

//Lectura del archivo
// Método accede a un fichero para su lectura 

fs.readFile(userRoute, 'utf-8', (err, data) => {
    if(err) {
      console.log('error: ', err);
    } else {
      console.log(data);
    }
  });


// Lectura de documentos
const searchURL = (userRoute) => {
    return new Promise((resolve, reject) => {
        const linksData = [];
          fs.readFile(source, 'utf8', (err, data) => {
            if(err) {
                reject(err)
            } else if (data.match(url) === null) {
                reject(`
---------------------------------------------------` +
`
${path.parse(userRoute).base}: No hay links en este documento :(` +

`
---------------------------------------------------`)
            } else if (data) {
                data.match(url).forEach(link => {
                linksData.push(link)
                })
            resolve(linksData) 
            }
        })
    })
}

/*------------------------------------------------------------------------------------ */

