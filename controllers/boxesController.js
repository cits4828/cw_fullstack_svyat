const {Boxes} = require('../models/models') // импорт модель книги
const ApiError = require('../error/ApiError') // импорт ApiError


class BoxesController {
    async create(req, res){
        const {box_size, availability, price, location} = req.body
        const boxes = await Boxes.create({box_size, availability, price, location})
        return res.json(boxes)
    }
    
    async getAll(req, res){
        const boxes = await Boxes.findAll() // вернет все существующие записи
        return res.json(boxes) //возвращаем весь массив объектов
    }

    async getOne(req, res){
        const {id} = req.params //получаем id box
        const box = await Boxes.findOne(
            {
                where: {id},
                //include: [{model: Books, as: 'quantity'}]
            },
        )
        return res.json(box)
    }
}

module.exports = new BoxesController() // экспорт объект из этого класса