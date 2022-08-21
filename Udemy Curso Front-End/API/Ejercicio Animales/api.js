const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Animal = require('./animal.controller')
//Se hace asi porque se hace a partir de una estructura de objeto
const {Auth, isAuthenticated } = require("./auth.controller");
const port = 3000

mongoose.connect('mongodb+srv://jon:jon@cluster0.7ucbwyy.mongodb.net/AnimalesApp?retryWrites=true&w=majority')

app.use(express.json())

//Para añadir seguridad y que nadie pueda acceder a estos endpoints sin estar loggeado
//solo tenemos que pasarle el middleware isAuthenticated 
app.get('/animals', isAuthenticated, Animal.list)
app.post('/animals', isAuthenticated, Animal.create)
app.put('/animals/:id', isAuthenticated, Animal.update)
app.patch('/animals/:id', isAuthenticated, Animal.update)
app.delete('/animals/:id', isAuthenticated, Animal.destroy)


app.post('/login', Auth.login)
app.post('/register', Auth.register)

app.use(express.static('app'))

app.get('/', (req, res) => {
	res.sendFile(`${__dirname}/index.html`)
})
app.get('*', (req, res) => {
	res.status(404).send('Esta página no existe :(')
})

app.listen(port, () => {
	console.log('Arrancando la aplicación!')
})
