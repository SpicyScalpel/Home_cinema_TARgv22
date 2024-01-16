const {db} = require('../db');
const Film = db.films

exports.getAll = async (req, res) => {
    const Films = await Film.findAll({attributes:["name"]})
    res.send(Films)
}

exports.getById = async (req,res) => {
    const Films = await Film.findByPk(req.params.id)
    res.send(Films)
    if (Films == null) {
        res.status(404).send({"error":"Service not found"})
        return
    }
    res.send(Films)
}

exports.createNew = async (req, res) => {
    console.log(req.body)
    //const Service = await Service.create(req.body)
    let film
    try {
        film = await Film.create(req.body)
    } catch (error) {
        if(error instanceof db.Sequelize.ValidationError) {
            console.log(error)
            res.status(400).send({"error":"Invalid Input"})
        } else {
            console.log("FilmCreate", error)
            res.status(500).send({"error":"Server error, try again later"})
        }
        return
    }
    res
        .status(201)
        .location(`${getBaseUrl(req)}/films/${film.id}`)
        .json(film)
}

exports.updateById = async(req,res)=>{
    let result
    delete(req.body.id)
    try{
        result = await Film.update(req.body,{where:{id:req.params.id}})
    }catch(error){
        console.log("FilmUpdate:",error)
        res.status(500).send({"error":"server error,try again later"})
        return
    }

    if(result===0||result===undefined){
        res.status(404).send({"error":"Film not found"})
        return
    }

    const Film= await Film.findByPk(res.params.id)
    res.status(200)
    .location('${getBaseUrl(req)}/films/${film.id}')
    .json(film)

    
}

exports.deleteById = async(req,res)=>{
    let result 
    try {
        result= await Film.destroy({where:{id: req.params.id}})
    } catch (error) {
        
            console.log("FilmsCreateDelete",error)
            res.status(500).send({"error":"server error,try again later"})
    
        return
    }

    if(result === 0 || result === undefined){
        res.status(404).send({"error":"Film not found"})
        return
    }

    res.status(204).send()
}


getBaseUrl = (request) => {
    return (
        (request.connection && request.connection.encrypted ? "https" : "http" ) +
        `://${request.headers.host}`
    )
}