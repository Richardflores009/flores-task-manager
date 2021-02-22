const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/tasks')

const app = express()
const port = process.env.port || 3000

// * Automatically parse requests as an object
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

//? 
//?  Without middleware: new request -> run route handler
//? 
//? With middleware:     new request -> do something -> run route handler
//?  


app.listen(port, () => {
    console.log('Server is up and running on port ' + port)
})


// const pet = {
//     name: 'Hal'
// }

// pet.toJSON = function() {
//     console.log(this)
//     return this
// }

// console.log(JSON.stringify(pet))



// !json web token practice
// var jwt = require('jsonwebtoken');

// const myFunction = async () => {
//     //  create web token 
//     const token = jwt.sign({ _id: 'abc123' }, 'anyseriesofcharacterswillwork', { expiresIn: '7 days' })
//     console.log(token)

//     // checks whether the user is authenticated correctly
//     const data = jwt.verify(token, 'anyseriesofcharacterswillwork')

//     console.log(data)
// }

// myFunction()


//! bcrypt practice
// const bcrypt = require('bcryptjs')

// const myFunction = async () => {
//     const password = 'red12345!'
//     const hashedPassword = await bcrypt.hash(password, 8)

//     console.log(password)
//     console.log(hashedPassword)

//     const isMatch = await bcrypt.compare('red12345!', hashedPassword)
//     console.log(isMatch)
// }

// myFunction()