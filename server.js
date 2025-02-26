//requirements
require('dotenv').config()
const exp = require('express')
const dbHandler = require('./dbhandler')

//variables
const server = exp()
const PORT = process.env.PORT

//uses
server.use(exp.static('public'))
server.use(exp.json())

//database sync
dbHandler.Users.sync({alter:true})
dbHandler.Products.sync({alter:true})

//basic routes

const JWT = require('jsonwebtoken')

function auth(){
    return (req,res,next) =>{

        const autheader = req.headers.authorization
        console.log(autheader)
        if(autheader.split(' ')[0] != 'Bearer'){
            res.json({'message':'hiba'})
        }
        else{
            const encryptedtoken = autheader.split(' ')[1]
            try{
                const token = JWT.verify(encryptedtoken,process.env.SECRETKEY)
                req.username = token.username
                req.email = token.email
                next()
            }
            catch(error){
                res.json({'message': error})
            }
        }
        res.end()
    }
}

server.get('/profil', auth(), async(req,res) =>{
    res.json({'message': req.username + req.email})
    res.end()
})

//login
server.post('/loginRequest', async (req,res) =>{
    const oneUser = await dbHandler.Users.findOne({
        where: {
            email: req.body.lemail,
            password: req.body.lpassword
        }
    })
    if(oneUser){
        const token = JWT.sign({'email': oneUser.email, 'username': oneUser.username},process.env.SECRETKEY,{expiresIn:'3h'})
        res.json({'token': token, 'message': 'Sikeres bejelentkezés!'})
    }
    else{
        res.json({'message': 'Sikertelen belépés'})
    }
    console.log('login request, történt valami')
    res.end()
})

//registration
server.post('/registerRequest', async (req,res) =>{
    const userExists = await dbHandler.Users.findOne({
        where: {
            username: req.body.rusername,
            password: req.body.rpassword
        }
    })
    if(userExists){
        res.json({'message': "Már létezik ilyen felhasználó!"})
    }
    else{
        dbHandler.Users.create({
            email: req.body.remail,
            username: req.body.rusername,
            password: req.body.rpassword
        })
        res.json({'message': 'Sikeres regisztrálás!'})  
    }
    res.end()
})

//update
server.put('updateRequest', async (req,res) =>{
    const oneProduct = await dbHandler.Users.findOne({
        where:{
            name: req.body.name
        }
    })
    if(oneProduct){
        dbHandler.Users.update({
            'name': req.body.name,
            'quantity': req.body.amount,
            'type': req.body.type,
            'size': req.body.size,
            'color': req.body.color
        })
        res.json({'message': 'Sikeres módosítás!'})
    }
    else{
        res.json({'message': 'Sikertelen módosítás!'})
    }
    res.end()
})

//delete
server.delete('deleteRequest', async (req,res) =>{
    const one = await dbHandler.Users.findOne({
        where: {
            name: req.body.name
        }
    })
    if(one){
        await dbHandler.Users.destroy({
            where:{
                name: req.body.name
            }
        })
        res.json({'message': 'Sikeres törlés!'}).end()
    }
    else{
        res.status(400)
        res.json({'message': 'Sikertelen törlés!'}).end()
    }
})

//listen
server.listen(PORT, ()=> {console.log("A szerver fut: localhost:5555")})