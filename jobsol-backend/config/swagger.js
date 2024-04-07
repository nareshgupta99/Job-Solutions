const swaggerJsdocs=require("swagger-jsdoc");


const swaggerOptions={
    swaggerDefinition:{
        info:{
            title:"Job Solution api",
            description:"",
            constact:{
                name:""
            },
            servers:["http://localhost:4000"]
        }
    },
    apis:["./routes/*.js"]
};

const swaggerDocs=swaggerJsdocs(swaggerOptions);

module.exports =swaggerDocs;