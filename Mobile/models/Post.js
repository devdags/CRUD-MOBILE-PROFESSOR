const db = require("./Db.js");


const Post = db.sequelize.define("postagens", {
    titulo: {
        type: db.Sequelize.STRING
    },
    conteudo: {
        type: db.Sequelize.TEXT
    }
});

module.exports = Post;

//SÓ EXECUTA ESSA LINHA UMA VEZ
//Post.sync({force: true});