const {Books} = require('../models/models') // импорт модель книги
const ApiError = require('../error/ApiError') // импорт ApiError
const uuid = require('uuid') // для рандомных айдишников 
const path = require('path')

class BookController {
    async create(req, res, next){
        try{
            const {title, quantity, price} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName)) // перемещение изображения в папку static
            // const {title} = req.body
            // const book = await Books.create({title})
            // return res.json(book)
            const book = await Books.create({title, quantity, price, img: fileName}) // отправляем данные

            return res.json(book) // возвращаем информацию обратно на клиент
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async updateBook(req, res, next){
        try{
            const {id} = req.params //получаем id книги
            const {title, quantity, price} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const book = await Books.update({title, quantity, price, img: fileName}, {
                    where: {id}
                },
            ) // отправляем данные
            return res.json(book) // возвращаем информацию обратно на клиент
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async deleteBook(req, res, next){
        try{
            const {id} = req.params //получаем id книги
            const book = await Books.destroy(
                {
                    where: {id}
                },
            )
            return res.send("book removed")
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    
    async getAll(req, res){
        let {limit, page} = req.query
        page = page || 1
        limit = limit || 6
        let offset = page * limit - limit 
        let books = await Books.findAndCountAll({limit, offset}) // вернет все существующие записи
        return res.json(books) //возвращаем весь массив объектов
    }

    async getOne(req, res){
        const {id} = req.params //получаем id книги
        const book = await Books.findOne(
            {
                where: {id}
                //include: [{model: Books, as: 'quantity'}]
            },
        )
        return res.json(book)
    }
}

module.exports = new BookController() // экспорт объект из этого класса