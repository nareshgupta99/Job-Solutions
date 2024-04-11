function corsConfig(req, res, next) {
    console.log("i am in cors middleware")
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
    res.header("Access-Control-Allow-Credentials","true")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  }

  module.exports=corsConfig