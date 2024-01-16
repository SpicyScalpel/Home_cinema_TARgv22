require("dotenv").config();
const express = require('express')

const app = express()

const port = process.env.APP_PORT; //|| 8080;
const mariadb = require("mariadb")
const cors = require('cors')
const swaggerUI = require('swagger-ui-express');
const yamljs = require('yamljs');
//const swaggerDocument = require('./docs/swagger.json');
const swaggerDocument = yamljs.load('./docs/swagger.yaml');
app.use(express.json())
app.use(cors())

require("./routes/app_routes")(app)

// app.getAll('/theatres', (req, res) => {
//     res.send(theatres)
// })


app.get('/theaters/:id', (req, res) =>{
    if(typeof theaters[req.params.id - 1] === 'undefined')
    {
        return res.status(404).send({error: "theatre not found"})
    }
    res.send(theaters[req.params.id - 1])
})

app.post('/theaters', (req, res) =>{
if (!req.body.name || !req.body.price || !req.body.rating) {
    return res.status(400).send({error: "One or all parameters are missing"})
}
let theatre = {
    id: theatres.length +1,
    name: req.body.name,
    price: req.body.price,
    rating: req.body.rating 
}
    theaters.push(theatre)

    res.status(201)
    .location(`${getBaseUrl(req)}/theaters/${theaters.length}`)
    .send(theatre)
})



app.delete('/theaters/:id', (req, res) =>{

    if(typeof theaters[req.params.id - 1] === 'undefined')
    {
        return res.status(404).send({error: "Theatre not found"})
    }
    theaters.splice(req.params.id -1, 1)
    res.status(204).send({error: "No Content"})
})

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(port, () => {console.log(`API up at: http://localhost:${port}`)})

function getBaseUrl(req) {
    return req.connection && req.connection.encrypted ? 'https' : 'http' + `://${req.headers.host}`
}