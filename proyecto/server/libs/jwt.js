import jwt from "jsonwebtoken"

export function createAcessToken(payload){
    return new Promise((resolve, reject) =>{
        jwt.sign(
            payload,
            "secret123",
            {expiresIn: "1d"},
            (err,token) => {
                if(err) console.log(err);
                resolve(token);
            }
        );
    });
};