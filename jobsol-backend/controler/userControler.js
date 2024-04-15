const mysqlpool = require("../config/db");
const {checkJwt} = require("../utils/checkAuth");



    const UploadPicture = async (req, res) => {
        // try {
        //     // const filename = req.file.filename;
        //     console.log(req.file)
        //     // const filePath = req.file.path;
        //     // const [result] = await mysqlpool.query('INSERT INTO profile_pics (filename, path) VALUES (?, ?)', [filename, filePath]);
        //     // connection.release();
        //     // res.status(200).send('Profile picture uploaded successfully');
        // } catch (error) {
        //     console.error(error);
        //     res.status(500).send('Error uploading profile picture');
        // }
        try {
            console.log(req.file); // Check if file is received in the request
            res.status(200).send('Profile picture uploaded successfully');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error uploading profile picture');
        }
    };
    
    

    const updateUserProfile=async (req,res)=>{

    }

    const uploadResume=async (req,res)=>{

        
    }

    const getLoggedUser=async (req,res)=>{
        const decodedToken = getCredentialFromToken();
        const [[employer]] = await loadUserByUserName(decodedToken.username, "employer");
        
    }


module.exports={UploadPicture,updateUserProfile,uploadResume,getLoggedUser};