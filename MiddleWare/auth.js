const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "secret_key";

const authenticateToken = (req, res, next) => {
    const authHeader = req.header("Authorization").split(" ")[1];
    
    const token = authHeader;
    // console.log(token);
    
    if (!token) return res.sendStatus(401).json({message: "No token Authorization deined"});

    try{
        const decode = jwt.verify(token, JWT_SECRET);
        req.user = decode;
        // console.log(req.user);
        
        next();
    }
    catch(error){
        res.json(error);
    }
};

module.exports = authenticateToken;
