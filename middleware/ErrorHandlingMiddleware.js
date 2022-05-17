const ApiError = require('../error/ApiError'); //импортируем класс ApiError

module.exports = function(err, req, res, next){
    if(err instanceof ApiError){ // если класс ошибки ApiError то 
        return res.status(err.status).json({message: err.message}) // на клиент возвращаем ответ со статус-кодом, который будем получать из ошибки  
    } //иначе вернем 500 ошибку
    return res.status(500).json({message: "Неизвестная ошибка!"})
} // принимает ошибку, запрос, ответ и ф-ция next