const fs = require('fs');

fs.readFile('./clients.json', (error, content) => {
  if (error) {
    console.log("Opps!, Aconteceu um erro inesperado :(");
  } else {
    console.log(JSON.parse(content));
  }
});