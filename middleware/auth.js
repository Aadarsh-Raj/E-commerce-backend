const jwt = require("jsonwebtoken");
const UserModel = require("../model/userSchema");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleware = (role) => async (req, res, next) =>{
    try{
        const tokenFromHeaders = req.headers.authorization;
        const data = jwt.verify(tokenFromHeaders, process.env.JWT_SECRET_KEY);
        if(role.includes(data.role)){
            const user = await UserModel.findById(data.id);
            req.user = user;
            next();

        }else{
            res.status(403).json({
                success: false,
                message: "Forbidden",
              });
        }
    }catch(e){
        console.log(e);
        res.json({
            success: false,
            message: "invalid token",
        });
    }
}



module.exports = authMiddleware;

