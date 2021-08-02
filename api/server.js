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
server.post('/api/user', async(req, res)=>{
    try{
        const newUserData = req.body
        if(!newUserData.name || !newUserData.bio){
            res.status(422).json({
                message: "Please provide name and bio for the user"
            })
        }else{
            const newUser = await User.insert(newUserData)
            res.status(201).json(newUser)
        }
    }catch(err){
        res.status(500).json({
            error: "There was an error while saving the user to the database",
            message: err.message,
            stack: err.stack
        })
    }
})
	
//PUT /api/users/:id
server.put('/api/users/:id', (req,res) => {
    const { id } = req.params
    const { name, bio } = req.body
    // res.json({message: `PUT user with id of ${id}`})
    User.update(id, { name, bio })
   .then(updatedUser => {
       res.json(updatedUser)
       if(!updatedUser) {
           res.status(404).json({ message: "The user with the specified ID does not exist" })    
       } else {
           res.status(200).json(updatedUser) //defaults to status 200
       }
   })
   .catch(err => {
    res.status(500).json({message: err.message})
})
})

//DELETE /api/users/:id	
server.delete('/api/user/:id', (req,res)=>{
    User.remove(req.params.id)
    .then(data =>{
        console.log("deleted", data)
        res.json(data)
    })
    .catch(err => {
    res.status(500).json({
        error: 'The user could not be removed',
        message: err.message,
        stack: err.stack
    })})

})

	

// a catch all if all fails
server.use('*', (req, res) => {
    res.status(404).json({
         message: 'not found'
    })
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
