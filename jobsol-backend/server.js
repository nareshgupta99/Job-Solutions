const express=require("express");
const dotenv=require("dotenv");
const morgan=require("morgan")
const mysqlpool = require("./config/db");
const swaggerDocs =require("./config/swagger");
const swaggerUiExpress=require("swagger-ui-express");
const cors=require("./utils/cors")
const errorMiddleware=require("./middleware/ErrorMiddleware");

const app=express();




//configure dotenv file

dotenv.config();

const PORT=process.env.PORT || 4000

//middleware
app.use(morgan("dev"));

//to receive json data from client 
app.use(express.json());



//to recive data in request
app.use(express.urlencoded({extended:true}))



app.use(cors)
app.use("/api",require('./routes/jobRoutes'));
app.use("/api/auth",require("./routes/authRoutes"));
app.use("/api-docs",swaggerUiExpress.serve,swaggerUiExpress.setup(swaggerDocs));











app.use(errorMiddleware)



mysqlpool.query("select 1").then(()=>{
    console.log("database connection success")
    app.listen(PORT,()=>{
        console.log(`server is running ${PORT}`)
    })
}).catch((error)=>{
    console.log(error)
})

