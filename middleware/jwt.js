const jwt = require("jsonwebtoken");

const jwtAuthMiddlwware =(req,res,next)=>{

    // extract the jwt token from the request header 
    const token = req.headers.authorization.split(" ")[1];

    if(!token) return  res.status(401).json({error:"unathorised"});

    try{
        // verify jwt token 
       const decoded =  jwt.verify(token,process.eng.JWT_SECRET);
       
       //attach user infomatin to request object 
       req.user=decoded;
       next();

    }
    catch(err){
        res.status(401).json({error:"unathorised"});

    }
}


// // function to genrate token 

// const genrateToken = (userData )=>{
//     // genrate new token 

//     return jwt.sign(userData, process.env.JWT_SECRET);
// }

module.exports = {jwtAuthMiddlwware};