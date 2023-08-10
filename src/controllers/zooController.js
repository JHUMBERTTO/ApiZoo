import { Zoo } from "../models/Zoo.js"

export const getAllZoo = async (req,res) =>{
  let response;
  try{
    response = await Zoo.findAll();
    res.status(200).json(response)
  }catch(e){
    res.status(500).json({"Error": e.message})
  }
  
}