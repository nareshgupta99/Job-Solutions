const DataUriParser=require("datauri/parser.js");
const path=require("path");



const getDataUri=(file)=>{

    const parser=new DataUriParser()
    // get the extension name
    // const extName=path.extname(file.originalname).toString();
    const extName=getExtensionName(file);
    
   return parser.format(extName,file.buffer);

}

const getExtensionName=(file)=>{
    return  extName=path.extname(file.originalname).toString();
}

module.exports={getDataUri,getExtensionName};