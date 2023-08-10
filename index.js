import  express  from "express";

function main(){
  const app = express()
  app.use(express.json())
  app.use(express.urlencoded({ extended: false}))
  app.listen(3000)
  console.log("server listening on port 3000")
}

main();