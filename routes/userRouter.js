const Router = require('express') // получаем Router из express
const router = new Router // создаем объект роутера
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware') //импортируем authMiddleware

router.post('/registration', userController.registration) // регистрация пользователя
router.post('/login', userController.login) // авторизация пользователя
router.get('/auth', authMiddleware, userController.check) // проверка авторизации пользователя

module.exports = router // экспортируем роутер