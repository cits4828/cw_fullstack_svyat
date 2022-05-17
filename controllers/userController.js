const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt') // импорт bcrypt
const jwt = require('jsonwebtoken') // импорт bcrypt
const {User, Basket} = require('../models/models') // подключаем модели 
const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next){
        const {email, password, role} = req.body
        if(!email || !password){//если в теле запроса email || password пустые
            return next(ApiError.badRequest('Некорректный E-mail или пароль!')) // возвращаем ошибку на клиент
        } //иначе проверяем существует ли пользователь в системе
        const candidate = await User.findOne({where: {email}})
        if(candidate){
            return next(ApiError.badRequest('Пользователь с таким E-mail уже существует!'))
        } //иначе создаем пользователя
        const hashPassword = await bcrypt.hash(password, 5) // хешируем пароль
        const user = await User.create({email, role, password: hashPassword}) //создаем пользователя
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }
    
    async login(req, res, next){
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user){
            return next(ApiError.internal('Пользователь не найден!'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password) // проверяем пароли
        if(!comparePassword){ // если пароли не совпадают
            return next(ApiError.internal('Указан неверный пароль!')) //возвращаем ошибку
        }
        const token = generateJwt(user.id, user.email, user.role) // и генерируем токен
        return res.json({token})
    }

    async check(req, res, next){ // функция проверки, генерация нового токена и отправка на клиент
        const token = generateJwt(req.user.id, req.user.email, req.user.role) //передаем все параметры в функцию generateJwt
        return res.json({token}) // возвращает токен на клиент
    }
}

module.exports = new UserController() // экспорт объект из этого класса