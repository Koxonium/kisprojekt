require('dotenv').config()
const {Sequelize,DataTypes} = require('sequelize')
const USERNAME = process.env.USERNAME
const PASSWORD = process.env.PASSWORD
const DATABASE = process.env.DATABASE
const HOST = process.env.HOST
const handler = new Sequelize("data","root","",{dialect:'mysql',host:"localhost"})
const Users = handler.define('users',{
    'id':{
        type:DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true,
        allowNull:false
    },
    'username':{
        type:DataTypes.STRING,
        allowNull:false
    },
    'email':{
        type:DataTypes.STRING,
        allowNull:false
    },
    'password':{
        type:DataTypes.STRING,
        allowNull:false
    }
})

const Products = handler.define('products',{
    'id':{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    'name':{
        type:DataTypes.STRING,
        allowNull:false,
    },
    'quantity':{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    'type':{
        type:DataTypes.STRING,
        allowNull:false

    },
    'size':{
        type:DataTypes.STRING,
        allowNull:false
    },
    'color':{
        type:DataTypes.STRING,
        allowNull:false
    },
    'price':{
        type:DataTypes.INTEGER,
        allowNull:false
    }
})

exports.Users = Users
exports.Products = Products