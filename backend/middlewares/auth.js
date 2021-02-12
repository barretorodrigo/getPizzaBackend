const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) =>{
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({
            auth: false,
            message: "Token not found"
        });
    }
    jwt.verify(token, '@ti35', (err, decoded)=>{
        if(err){
            return res.status(500).json({
                auth: false,
                message: "Failed to authenticate"
            });
        }
        req.userId = decoded.id;
        next();
    });
}

module.exports = verifyJWT;