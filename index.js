const app = require('express')();
const port=8080
const swaggerUI = require('swagger-ui-express')
const swaggerDocument= require('./docs/swagger.json');

app.get('/theaters',(req,res)=>{res .send (["The poidgeon","Kunda Kino","Paladins:Champions of the Realm ","Super Mario Bros. Wonder"])})
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`)
})