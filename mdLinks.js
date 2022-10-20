const path = require("path"); //Provides utilities for working with file and directory paths//

let fs = require("fs"); /*En NodeJS todas las operaciones de acceso al sistema de archivos están englobadas dentro del módulo "fs" (File System).
Si queremos leer un archivo de texto que tenemos en local simplemete usaremos ese módulo para extraer el contenido del fichero, indicando su ruta y otra serie de parámetros.*/

const userRoute = process.argv[2]; //node documento.js laruta.com
//[0]    [1]          [2]
/*Interfaz de programación de aplicaciones incorporada del módulo de proceso que se utiliza para pasar los argumentos al proceso node.js 
cuando se ejecuta en la línea de comandos.*/
/*This property returns an array containing the arguments passed to the process when run it in the command line*/

//Módulo: “El módulo divide la base de código en pequeñas unidades, que se pueden usar en cualquier parte de la aplicación”

const formatOk = ".md";
//test ('formato -> .md', () => {
//  expect(formatOk.toBe(".md"));
//} );

let colors = require("colors"); //Dependencia
let expresionRegular =
  /(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gi;
const https = require("https"); //La función require hace una solicitud HTTPS

/*------------------------------------------------------------------------------------ */

// Lectura de ruta (Transforma la ruta relativa a absoluta)

const getAbsoluteLink = () => {
  if (path.isAbsolute(userRoute) === false) {
    return path.resolve(userRoute);
    //lo entrega, con console.log se puede comprobar
  }
  return getAbsoluteLink;
};
console.log("De ruta relativa a ruta absoluta: " + path.resolve(userRoute));

/*------------------------------------------------------------------------------------ */

//Obtener formato de archivo

let filename = userRoute;
let ext = filename.substring(filename.indexOf("."));

if (ext === formatOk) {
  console.log("La extensión del archivo es .md? ".rainbow + (ext === formatOk));

  //Convertir la ruta ingresada en la terminal un array

  let linksArray = filename.split(); //Método split sin parámetro para obtener el mismo string pero en array
  console.log(linksArray);
} else {
  console.log("Archivo inválido".rainbow);
}

/* Subtring method devuelve un subconjunto de un objeto string cadena.substring(indiceA[,indiceB'])
indexOf: Método que devuelve la posición en la cadena de la primera ocurrencia del valor
/*------------------------------------------------------------------------------------ */
//Muestra links y cantidad de links encontrados en total

function readLinks() {
  return new Promise((resolve, reject) => {
    //Con la nueva promesa mencionamos como vamos a leer los links
    let dataMatch = []; //Podemos dejar esto acá para que sea parte de la función?
    fs.readFile(userRoute, "utf-8", (error, data) => { //la data alude a la data que se encuentra dentro de archivo tipeado por el user(userRoute)
      if (data) {
        dataMatch = data.match(expresionRegular); //Método match retorna un array con los match de un objeto/string
        console.log(
          "El total de links encontrados es: ".bgYellow,
          dataMatch.length //Muestra la cantidad de links
        );
        resolve(data.match(expresionRegular)); //Muestra todos los links
      } else {
        reject(console.log("No hay links en este archivo".bgRed));
      }
    });
  });
}
//Acá hay callback? pq un callback supuestamente llama como argumento a otra función
//Promesas ayudan a simplicar los callbacks

/*------------------------------------------------------------------------------------ */
//Identificar links únicos No se como se conectan lo entiendo bien =( )
// link vendria siendo el link, pero como lo reconoce?
const uniqueLinks = (infoLinks) => {
  let unique = 0;
  infoLinks.forEach((link, index) => {
    if (infoLinks.indexOf(link) === index) {
      unique++;
    }
  });
  return console.log(
    "El total de links únicos encontrados es: ".bgMagenta,
    unique
  );
};

//Consolidamos la promesa y callback para validar/mostrar status de los links de los uniqueLinks
readLinks() //Callback porque llamamos a otra función que ya fue creada y la pasamos como argumento
  .then((result) => { //lo que yo espero que la promesa me retorne
    console.log(result);
    uniqueLinks(result);

    /*------------------------------------------------------------------------------------ */
    //  Validar links encontrados con petición HTTP (True)

    const validLinksWithPetition = (dataMatch) => {
      return dataMatch.map((link) => {
        return new Promise((resolve, reject) => {
          https.get(link, (res) => {
            if (res.statusCode === 200) {
              resolve({
                RouteText: process.argv[2],
                FileUrl: link,
                Code: res.statusCode,
                Message: "OK",
              });
            } else {
              reject({
                RouteText: process.argv[2],
                FileUrl: link,
                Code: res.statusCode,
                Message: "FAIL",
              });
            }
          });
        });
      });
    };

    // Muestra el estado de los links encontrados con petición HTTP
    const linkPromises = validLinksWithPetition(result);
    //console.log(validLinks(result));

    //Se describe el resultado de cada promesa
    return Promise.allSettled(linkPromises); //Pasamos como parámetro una constante y Mostramos el status a través de un array
  })
  .then((resPromises) => {
    console.log(" Estado de los links: ".red);
    console.log(resPromises);
  })
  .catch((error) => {
    console.log(error);
  });

/* El método promise.allSettled() devuelve una promesa que es resuelta después de que todas las promesas dadas hayan
   sido concluidas, sin importar si fueron resueltas o rechazadas. El resultado va a ser una serie de objetos describiendo
    el resultado de cada promesa*/