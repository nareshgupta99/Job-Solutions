const cors=require("cors");

const corsOption={
    origin:"http://localhost:3000",
    optionsSuccessStatus: 200,

}
// function corsConfig(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE,OPTIONS`);
//     res.header("Access-Control-Allow-Credentials","true")
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   }

  // module.exports=corsConfig
  module.exports=cors(corsOption)

