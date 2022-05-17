const Router = require('express') // получаем Router из express
const router = new Router // создаем объект роутера
// импортируем созданные роутеры
const applicationsRouter = require('./applicationsRouter')
const bookRouter = require('./bookRouter')
const boxesRouter = require('./boxesRouter')
const userRouter = require('./userRouter')

// сопаставляет маршруты с конкретным роутером
router.use('/user', userRouter)
router.use('/applications', applicationsRouter)
router.use('/book', bookRouter)
router.use('/boxes', boxesRouter)

module.exports = router // экспортируем роутер