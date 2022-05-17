require('dotenv').config()
const express = require('express') //импортируем express
const sequelize = require('./db') // импортируем файл db
const models = require('./models/models') // импортируем модели
const cors = require('cors') // импортируем cors для возможности отправлять запросы
const fileUpload = require('express-fileupload')
const router = require('./routes/index') //импортируемо основной роутер, который связывает все остальные
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()//создаем объект, вызвав функцию express, с него начинается запуск приложения
app.use(cors()) // для работы с запросами
app.use(express.json()) // для парсинга json формата
app.use(express.static(path.resolve(__dirname, 'static'))) // для статических файлов
app.use(fileUpload({})) // для загрузки файлов
app.use('/api', router) // url по которому обрабатывает роутер и роутер

app.use(errorHandler) // обработка ошибок

const start = async () => { // старт работы с бд
    try{
        await sequelize.authenticate() // установка подключения к бд
        await sequelize.sync() // сверяет состояние бд со схемой
        app.listen(PORT, () => console.log(`Server startup on port ${PORT}`))
    } catch(e) {
        console.log(e)
    }
}

start()

