const image=['.jpeg','.jpg','.png','.webp']
const file=['.pdf','.docx','.doc']
const allowedImageExtension=(extName)=>{
   return image.includes(extName);
}

const allowedDocumentExtension=(extName)=>{
    return file.includes(extName);
}

module.exports={allowedImageExtension,allowedDocumentExtension}