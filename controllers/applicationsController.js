const {Applications} = require('../models/models') // импорт модель книги
const ApiError = require('../error/ApiError') // импорт ApiError

class ApplicationsController {
    async create(req, res){
        const {fio, email, boxId, completed} = req.body
        const application = await Applications.create({fio, email, boxId, completed})
        return res.json(application)
    }
    
    async getAll(req, res){
        const applications = await Applications.findAll() // вернет все существующие записи
        return res.json(applications) //возвращаем весь массив объектов
    }
}

module.exports = new ApplicationsController() // экспорт объект из этого класса