// BUILD YOUR SERVER HERE
const express = require('express') // same as import xyz from xyz
const server = express()
server.use(express.json())

//POST /api/users
server.post('/api/users', (req, res) => {
    const { name, bio } = req.body
   res.json({message: 'POST: creates a new user'})
})

//GET /api/users
server.get('/api/users', (req, res) => {
    res.json({message: 'GET All Users'})
})
//GET /api/users/:id
server.get('/api/users/:id', (req,res) => {
    const { id } = req.params
    res.json({message: `GET user with id of ${id}`})
})	

//DELETE /api/users/:id	
server.delete('/api/users/:id', (req,res) => {
    const { id } = req.params
    res.json({message: `DELETE user with id of ${id}`})
})

//PUT /api/users/:id
server.put('/api/users/:id', (req,res) => {
    const { id } = req.params
    res.json({message: `PUT user with id of ${id}`})
})	

// a catch all if all fails
server.use('*', (req, res) => {
    res.status(404).json({
         message: 'not found'
    })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
