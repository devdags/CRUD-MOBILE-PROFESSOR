//Express
const express = require("express");
const app = express();
//Handlebars
const handlebars = require("express-handlebars");
//Body-Parser
const bodyParser = require("body-parser");
//Pegando o modulo post
const Post = require("./models/Post.js");

//Config
    // Template Engine
        app.engine("handlebars", handlebars.engine({defautLayout: "main"}));
        app.set("view engine", "handlebars");
    //Body-parser
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());




//Rotas

//Rota para chamar imprmir os bagui na tela
app.get("/", function(req, res){
    Post.findAll({order: [["id","DESC"]]}).then(function(posts){
        res.render("home", {posts: posts});
    });
});

//rota para acessar o cadastro
app.get("/cad", function(req, res){
    res.render("formulario");
});


//Rota pra deletar o post
app.get("/deletar/:id", function(req, res){
    Post.destroy({where: {"id": req.params.id}}).then(function(){
            res.redirect("/");
        }).catch(function(erro){
            res.send("Esta Postagem não existe!");
        });
});

/*app.get('/deletar/:id', (req, res) => {
    Post.destroy({ where: {'id': req.params.id}}).then((){
        Post.findAll({order: [["id","DESC"]]}).then(function(posts){
            res.render("home", {posts: posts});
        });
    }).catch((erro) => {
        res.send('Esta postagem na existe!' + erro)
    })
})*/

//Rota para dar update no post

app.get('/editar/:id/update', function(req, res) {
    const id = req.params.id;
  
    Post.findOne({ where: { id: id } }).then(function(post) {
      res.render('editar', { post: post });
    }).catch(function(erro) {
      res.send("Postagem não encontrada: " + erro);
    });
  });
  
  app.post("/editar/:id/update", function(req, res){
    const id = req.params.id;
    const titulo = req.body.titulo;
    const conteudo = req.body.conteudo;

    Post.update(
        {titulo: titulo, conteudo: conteudo},
        {where: {"id": id}}
    ).then(function(){
        console.log(err);
        res.redirect("/");
    }).catch(function(erro){
        res.send("Erro ao atualizar postagem: " + erro);
    });
});


//Rota para pegar os dados
app.post("/add", function(req, res){
    //Pra pegar algo do formulario basta escrever "REQ.BODY.NomeDoCampo"
    //req.body.conteudo
    //res.send("Texto: "+req.body.titulo+" Conteudo: "+req.body.conteudo);
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }).then(function(){
        res.redirect("/");
    }).catch(function(){
        res.send("Falha ao criar o Post! O erro foi: "+erro);
    });
});


//Express
app.listen(9000, function(){
    console.log("Servidor rodando na url http://localhost:9000");
});