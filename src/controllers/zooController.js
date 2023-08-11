import { Zoo } from "../models/zoos.js"
import { Op } from "sequelize";

export const getAllZoo = async (req,res) =>{
  let response;
  try{
    response = await Zoo.findAll();
    res.status(200).json(response)
  }catch(e){
    res.status(500).json({"Error": e.message})
  }
};

export const getOneZoo = async (req,res) =>{
  const {id} = req.params;
  let response;
  try {
    response = await Zoo.findByPk(id);
    res.status(200).json(response)
  } catch (e) {
    res.status(500).json({"Error": e.message})
    return;
  }
  if(response === null){
    res.status(404).json({
      "error": "Tu registro no se encuentra en la base de datos"
    })
    return;
  }
}

export const getZooBudget = async (req,res) =>{
  let response;

  try {
    response = await Zoo.findAll({
      attributes:['zoo_name', 'budget'], order:[['budget', 'DESC']]
    });
    res.status(200).json(response)
  } catch (e) {
    res.status(500).json({"Error": e.message})
    return;
  }
}

export const getZooNombre = async (req,res) =>{
  const {nombre} =  req.body;
  let response;
  let sentenciaLike = "%"+nombre.toLowerCase()+"%"
  try {
    response = await Zoo.findAll({
      where: {
        'zoo_name': {[Op.iLike]:sentenciaLike}
      }
    });
    res.status(200).json(response)
  } catch (e) {
    res.status(500).json({"Error": e.message})
    return;
  }
  if(response.length === 0){
    res.status(404).json({
      "error": "Tu registro no se encuentra en la base de datos"
    })
    return;
  }
}

export const createZoo = async (req,res) =>{
  const {zoo_name, city_id, zoo_size, budget} =  req.body;
  let response; 
  try {
    response = await Zoo.create({
      zoo_name,
      city_id,
      zoo_size,
      budget
    });
    res.status(200).json({"Succesful Register": response.dataValues})
  } catch (e) {
    res.status(500).json({"Error": e.message})
    return;
  }
}

export const deleteZoo = async (req, res)=>{
  const{id_zoo} = req.params
  let response;
  try {
    response = await Zoo.destroy({
      where:{id_zoo}
    })
    res.status(200).json({"Estado Transaccion": response})
  } catch (e) {
    res.status(500).json({"Error": e.message})
    return;
  }
}