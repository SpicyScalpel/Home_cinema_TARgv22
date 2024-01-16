const {db} = require('../db');
const Theatre = db.theatres

exports.getAll = async (req, res) => {
    const Theatres = await Theatre.findAll({attributes:["name"]})
    res.send(Theatres)
}

exports.getById = async (req,res) => {
    const Theatres = await Theatre.findByPk(req.params.id)
    res.send(Theatres)
    if (Theatres == null) {
        res.status(404).send({"error":"Service not found"})
        return
    }
    res.send(Theatres)
}

exports.createNew = async (req, res) => {
    console.log(req.body)
    //const Service = await Service.create(req.body)
    let theatre
    try {
        theatre = await Theatre.create(req.body)
    } catch (error) {
        if(error instanceof db.Sequelize.ValidationError) {
            console.log(error)
            res.status(400).send({"error":"Invalid Input"})
        } else {
            console.log("TheatreCretae", error)
            res.status(500).send({"error":"Server error, try again later"})
        }
        return
    }
    res
        .status(201)
        .location(`${getBaseUrl(req)}/theaters/${theatre.id}`)
        .json(theatre)
}

exports.updateById = async(req,res)=>{
    let result
    delete(req.body.id)
    try{
        result = await Theatre.update(req.body,{where:{id:req.params.id}})
    }catch(error){
        console.log("TheatreUpdate:",error)
        res.status(500).send({"error":"server error,try again later"})
        return
    }

    if(result===0||result===undefined){
        res.status(404).send({"error":"Theatre not found"})
        return
    }

    const Theatre= await Theatre.findByPk(res.params.id)
    res.status(200)
    .location('${getBaseUrl(req)}/theaters/${theatre.id}')
    .json(theatre)

    
}

exports.deleteById = async(req,res)=>{
    let result 
    try {
        result= await Theatre.destroy({where:{id: req.params.id}})
    } catch (error) {
        
            console.log("TheatresCreateDelete",error)
            res.status(500).send({"error":"server error,try again later"})
    
        return
    }

    if(result === 0 || result === undefined){
        res.status(404).send({"error":"Theatre not found"})
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