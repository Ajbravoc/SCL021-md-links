#!/usr/bin/env node

const path = require('path');
let fs = require('fs'); /*En NodeJS todas las operaciones de acceso al 
sistema de archivos están englobadas dentro del módulo "fs" (File System).
 Si queremos leer un archivo de texto que tenemos en local simplemte 
 usaremos ese módulo para extraer el contenido del fichero, indicando 
 su ruta y otra serie de parámetros que ahora describiremos.*/
const userRoute = process.argv[2]; //node documento.js laruta.com
                                    //[0]    [1]          [2]
const formatOk = ".md";
let colors = require ('colors');
let expReg = /(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gi;
const https = require ("https");
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
    console.log( "La extensión del archivo es .md?".rainbow  + (extension === formatOk))

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

//Lectura del archivo, links CON PROMESASSSSSS
/* Método accede a un fichero para su lectura */


//resolve y reject desde donde comienzo 
//then catch como continuará
//ESTE SI FUNCIONA (Muestra links y cantidad de links)
function readLinks (){
    return new Promise ((resolve, reject) => {
       let count = [];      
              fs.readFile(userRoute, 'utf-8', (err, data) => {
         if(err) {
      //console.log('error: ', err);
      reject (err);
       } else {
      count = data.match(expReg);
      console.log('El total de links encontrados es: '.bgYellow, count.length);
      resolve (data.match(expReg));
    }
  }); 
  })
}
//hay que pasarla en el then de readlinks, pq ese es el caso de exito al revisar links
const uniqueLinks = (infoLinks) => {
  let unique = 0;
  infoLinks.forEach((link, index) => {
      if(infoLinks.indexOf(link) === index) {
          unique++
      }
  }) 
  return console.log('El total de links únicos encontrados es: '.bgMagenta, unique);
};
//Validar promesa True
const validLinksWithPetition = (count) => {
     return count.map(link => {
        return new Promise((resolve, reject) => {
            https.get(link, res => {
                if(res.statusCode === 200) {
                    resolve({count: process.argv[2], url: link, code: res.statusCode, message: "OK"})
                } else {
                  reject({count: process.argv[2], url: link, code: res.statusCode, message: "FAIL"})
                }
              })
        })
    })
};

readLinks()
  .then((result) => {
    console.log(result);
    uniqueLinks(result); //llamamos la funcion de abajo
    const linkPromises = validLinksWithPetition(result);
    //console.log(validLinks(result));

    return Promise.allSettled(linkPromises);
  })
  .then((resPromises) => {
    console.log('Verificando el estado de los links:'.red)
    console.log(resPromises);
  })
  .catch((error) => {
    console.log(error);
  });