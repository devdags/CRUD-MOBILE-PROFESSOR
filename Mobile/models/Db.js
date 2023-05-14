//Sequelize
const Sequelize = require("sequelize");
//Conexão Com o Banco
const sequelize = new Sequelize("postapp","root","123456*",{
    host:"localhost",
    dialect:"mysql"
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}