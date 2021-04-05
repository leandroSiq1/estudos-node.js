const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// definindo o template engine
app.set('view engine', 'ejs');

{
  // definindo os arquivos estaticos
// const staticFolder = path.join(__dirname, 'views');
// const expressStatic = express.static(staticFolder);
// app.use(expressStatic);
// usar apenas se nao tiver o template engine, o template engine
// ja faz a definição de arquivos estaticos
// app.use(express.static(path.join(__dirname, 'views')));

// definindo os arquivos publicos
// const publicFolder = path.join(__dirname, 'public');
// const expressPublic = express.static(publicFolder);
// app.use(expressPublic);
}

app.use(express.static(path.join(__dirname, 'public')));

// rotas
app.get('/', (req, res) => {
  res.render('index', {
    title: "Atalan | Home"
  });
});

app.get('/posts', (req, res) => {
  fs.readFile('posts.json', (error, content) => {
    if (error) {
      res.end(error);
      console.lof("Error:", error);
    } else {
      res.render('posts', {
        title: "Atalan | Posts",
        posts: JSON.parse(content)
      });
    }
  });
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