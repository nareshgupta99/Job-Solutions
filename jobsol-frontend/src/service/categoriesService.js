const { PublicAxios } = require("./axiosConfig")

const getAllCategires=async()=>{
    try{
        console.log("servicing category")
      const categories =await PublicAxios.get("/categories");
      console.log(categories)
    }catch(err){
        console.log(err)
    }
}

export {getAllCategires}