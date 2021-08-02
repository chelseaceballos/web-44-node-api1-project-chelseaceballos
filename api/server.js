// BUILD YOUR SERVER HERE
const express = require('express') // same as import xyz from xyz
const server = express()

server.use('*', (req, res) => {
    res.status(404).json({ message: 'not found'})
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
