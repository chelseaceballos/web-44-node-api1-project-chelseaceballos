// BUILD YOUR SERVER HERE
const express = require('express') // same as import xyz from xyz
const User = require('./users/model')
const server = express()
server.use(express.json())

//GET /api/users
server.get('/api/users', (req, res) => {
    // res.json({message: 'GET All Users'})
    User.find()
    .then(users => {
        res.status(200).json(users)
        // OR // res.json(users)
    })
    .catch(err => {
        res.status(500).json({
            message: 'error getting users',
            err: err.message, 
        })
    })
})

//GET /api/users/:id
server.get('/api/users/:id', (req,res) => {
    const { id } = req.params
    // res.json({message: `GET user with id of ${id}`})
    User.findById(id)
    .then(user => {
        //if id doesn't exist
        if (!user) {
            res.status(404).json({message: `The user with the specified ID does not exist`})
        } else {
            //successful response
            res.status(200).json(user)
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'error getting user by id',
            err: err.message, 
        })
    })
})

//POST /api/users
server.post('/api/users', (req, res) => {
    const { name, bio } = req.body
//    res.json({message: 'POST: creates a new user'})
    User.insert({ name, bio })
    .then(user =>{
        if (!user) {
            res.status(400).json({ message: "Please provide name and bio for the user" })
        } else {
            res.status(201).json(user)
        }
    })
    .catch(err => {
        res.status(500).json({ message: "There was an error while saving the user to the database" })
    })
})
	
//PUT /api/users/:id
server.put('/api/users/:id', (req,res) => {
    const { id } = req.params
    res.json({message: `PUT user with id of ${id}`})
})

//DELETE /api/users/:id	
server.delete('/api/users/:id', (req,res) => {
    const { id } = req.params
    res.json({message: `DELETE user with id of ${id}`})
})

	

// a catch all if all fails
server.use('*', (req, res) => {
    res.status(404).json({
         message: 'not found'
    })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
