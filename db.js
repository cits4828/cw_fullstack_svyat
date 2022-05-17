const {Sequelize} = require('sequelize') // берем класс Sequelize

module.exports = new Sequelize( // экспортируем объект, который берем из этого класса
    process.env.DB_NAME, //название бд
    process.env.DB_USER, //имя пользователя
    process.env.DB_PASSWORD, //ПАРОЛЬ
    {
        dialect: 'postgres',
        host: process.env.DB_HOST, 
        port: process.env.DB_PORT
    }
)