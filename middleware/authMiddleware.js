const jwt = require('jsonwebtoken')

module.exports = function(req, res, next){//если токен не валидный возвращаем ошибку о том, что пользователь не авторизован
    if(req.method === "OPTIONS"){
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1] // отрезаем сам токен
        if(!token){ // если токена нет то ошибка
            return res.status(401).json({message: "Не авторизован"})
        } // иначе раскодируем его
        const decoded = jwt.verify(token, process.env.SECRET_KEY) //проверяем токен на валидность
        req.user = decoded //забираем даныне, которые вытащили
        next()
    } catch (error) {
        res.status(401).json({message: "Не авторизован"})
    }
} 