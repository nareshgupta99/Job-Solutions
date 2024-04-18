const express=require("express");
const dotenv=require("dotenv");
const morgan=require("morgan")
const swaggerDocs =require("./config/swagger");
const swaggerUiExpress=require("swagger-ui-express");
const cors=require("./utils/cors")
const errorMiddleware=require("./middleware/ErrorMiddleware");
const sequelize = require("./config/db");
const User = require("./models/User");
const {Role,addRole} = require("./models/Role");
const EmployerProfile = require("./models/EmployerProfile");
const SeekerProfile = require("./models/SeekerProfile");
const UserRole = require("./models/UserRole");
const Job = require("./models/Job");
const Application = require("./models/Application");
const Category = require("./models/Category");
const JobCategory=require("./models/JobCategory");
const { isAuthenticated } = require("./utils/Auth");



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
app.use("/api/auth",require("./routes/authRoutes"));
app.use("/api-docs",swaggerUiExpress.serve,swaggerUiExpress.setup(swaggerDocs));
app.use("/api",require('./routes/jobRoutes'));
app.use("/api",require("./routes/categoryRoute"));


User.belongsToMany(Role,{ through: UserRole });
Role.belongsToMany(User,{ through: UserRole });
Job.belongsTo(User, { foreignKey: 'EmployerID' });
Application.belongsTo(User, { foreignKey: 'SeekerID' });
Application.belongsTo(Job, { foreignKey: 'JobID' });
SeekerProfile.belongsTo(User, { foreignKey: 'UserID', primaryKey: true });
EmployerProfile.belongsTo(User, { foreignKey: 'UserID', primaryKey: true });
Job.belongsTo(Category,{through: JobCategory})
Category.belongsToMany(Job,{through:JobCategory})



sequelize.sync({force:true}).then(() => {
    addRole();
    console.log("All models were synchronized successfully.")
}).catch((error) => {
    console.log(error)
})




app.use(errorMiddleware)



sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
    app.listen(PORT,()=>{
        console.log(`server is running ${PORT}`)
    })
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
})