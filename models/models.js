// описание моделей данных

const sequelize = require('../db') //импорт объекта sequelize
const {DataTypes} = require('sequelize') // импорт класса DataTypes из пакета

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Applications = sequelize.define('applications', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    fio: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    boxId: {type: DataTypes.INTEGER, allowNull: false},
    completed: {type: DataTypes.STRING, defaultValue: 'NO'},
})

const Boxes = sequelize.define('boxes', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    box_size: {type: DataTypes.STRING, allowNull: false},
    availability: {type: DataTypes.STRING, defaultValue: "NO"},
    price: {type: DataTypes.STRING, allowNull: false},
    location: {type: DataTypes.STRING, allowNull: false},
})

const Books = sequelize.define('books', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    quantity: {type: DataTypes.INTEGER, defaultValue: 0},
    price: {type: DataTypes.STRING, allowNull: false},
    img: {type: DataTypes.STRING, allowNull: false},
})

Applications.hasOne(Boxes);
Boxes.belongsTo(Applications)
// Boxes.belongsTo(Applications,
//     {
//         foreignKey: {name: 'boxId'},
//         onUpdate: 'CASCADE',
//         onDelete: 'CASCADE',
//     }
// );

User.hasMany(Applications)
Applications.belongsTo(User)

User.hasMany(Books)
Books.belongsTo(User)

// Applications.hasOne(Boxes)
// Boxes.belongsTo(Applications)

// экспорт созданных моделей
module.exports = {
    User, 
    Applications,
    Boxes,
    Books
}