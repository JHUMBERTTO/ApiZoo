import  express  from "express";
import zooRoutes from './routes/zooRoutes.js';
import { sequelize } from "./database/database.js";

async function main(){

  try{
    await sequelize.sync({force:false})
    await sequelize.authenticate();
  }catch(e){
    console.log(e);
  }
  const app = express()
  app.use(express.json())
  app.use(express.urlencoded({ extended: false}))
  app.use(zooRoutes)
  app.listen(3000)
  console.log("server listening on port 3000")
}

main();