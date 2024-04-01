const express=require("express");
const dotenv=require("dotenv");
const morgan=require("morgan")
const mysqlpool = require("./config/db");
const cors=require("cors");
const app=express();
const swaggerDocs =require("./config/swagger");
const swaggerUiExpress=require("swagger-ui-express");   
// const sequelize=require("./config/db")




//configure dotenv file

dotenv.config();

const PORT=process.env.PORT || 4000

//middleware
app.use(morgan("dev"));

//to receive json data from client 
app.use(express.json());


app.use("/api/users",require('./routes/userRoutes'));
app.use("/api/auth",require("./routes/authRoutes"));


app.use("/api-docs",swaggerUiExpress.serve,swaggerUiExpress.setup(swaggerDocs));



//to recive data in request
app.use(express.urlencoded({extended:true}))

//cors configuration
app.use(cors({
    origin:process.env.CORS_ORIGIN
}))

app.get("/",(req,res)=>{
    res.send({message:"hello"})
})



mysqlpool.query("select 1").then(()=>{
    console.log("database connection success")
    app.listen(PORT,()=>{
        console.log(`server is running ${PORT}`)
    })
}).catch((error)=>{
    console.log(error)
})




//      sequelize.authenticate().then(()=>{
//          console.log('Connection has been established successfully.');
//      }).catch ((error)=> {
//     console.error('Unable to connect to the database:', error);
//   })
