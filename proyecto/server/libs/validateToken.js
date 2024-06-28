import jwt from "jsonwebtoken";

export const authRequired = (request, response, next) =>{
    const {token} = request.cookies;
    
    if(!token) return res.status(401).json({message: "No token, authorization denied"});

    jwt.verify(token, "secret123", (err, user) => {
        if(err) return res.status(403).json({message: "Invalid token"});
        
        request.user = user;

        next();
    });
};