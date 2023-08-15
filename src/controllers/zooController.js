import { Zoo } from "../models/zoos.js"
import { Op } from "sequelize";
import { City } from "../models/cities.js"
import { Country } from "../models/countries.js";
import { Continent } from "../models/continents.js";
import { Animal } from "../models/animals.js";
import { Specie } from "../models/species.js";

export const getAllZoo = async (req,res) =>{
  let response;
  try{    
      response = await Zoo.findAll({
          include:[
              {
                  model:City,
                  attributes: ['city_name'],
                  include:{
                      model: Country,
                      attributes: ['country_name'],
                      include:{
                          model:Continent,
                          attributes: ['continent_name'],
                          include:{model:Animal}
                      }
                  }
              },

          ]
      });
    res.status(200).json(response)
  }catch(e){
    res.status(500).json({"Error": e.stack  })
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

export const getRefuge = async (req, res) => {
  let response;
  try{    
      response = await Refuge.findAll({
          include:[
              {model:Zoo},
              {
                  model:Specie,
                  include:{
                      model:Animal,
                      include:{model:Continent}
                  }
              }
          ]
      });

  }catch(e){
      res.status(500).json({"Error": e.message});
  }

  res.status(200).json(response);
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