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

// Habilita o server para receber dados via post (formulário)
app.use(express.urlencoded({ extended: true }));

// rotas
app.get('/', (req, res) => {
  res.render('index', {
    title: "Atalan | Home"
  });
});

app.get('/posts', (req, res) => {
  fs.readFile('./store/posts.json', (error, content) => {
    if (error) {
      res.end(error);
      console.log("Error:", error);
    } else {
      res.render('posts', {
        title: "Atalan | Posts",
        posts: JSON.parse(content)
      });
    }
  });
});


app.get('/cadastro-posts', (req, res) => {
  const { c } = req.query;

  res.render('cadastro-posts', {
    title: "Atalan | Cadastrar Post",
    cadastrado: c
  });
});

app.post('/salvar-post', (req, res) => {
  const { title, text } = req.body;

  const data = fs.readFileSync('./store/posts.json');
  const posts = JSON.parse(data);
  posts.push({
    title,
    text
  });

  const postsString = JSON.stringify(posts);
  fs.writeFileSync('./store/posts.json', postsString)
  
  res.redirect('/cadastro-posts?c=1');
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