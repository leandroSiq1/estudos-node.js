const express = require('express');
const path = require('path');
const app = express();

// definindo os arquivos estaticos
// const staticFolder = path.join(__dirname, 'views');
// const expressStatic = express.static(staticFolder);
// app.use(expressStatic);
app.use(express.static(path.join(__dirname, 'views')));

// definindo os arquivos publicos
// const publicFolder = path.join(__dirname, 'public');
// const expressPublic = express.static(publicFolder);
// app.use(expressPublic);
app.use(express.static(path.join(__dirname, 'public')));





// rotas
app.get('/', (req, res) => {
  res.render('views/index');
});

app.get('/sobre', (req, res) => {
  res.send("sobre");
});






// 404 error (not found)
app.use((req, res) => { // middleware
  res.send("Página não encontrada!")
});





// exec servidor
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Serve is listening on port ${port}`);
});