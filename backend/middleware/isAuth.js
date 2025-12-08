import jwt from "jsonwebtoken";

const isAuth = async(req, res, next) => {
    try {
        const token = req.cookies.token;
        // console.log(token)
        if(!token){
            return res.status(401).json({message: "Unauthorized !!"});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({message: "Unauthorized !!"});
        }
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: `Auth middleware error: ${error}`});
    }
}
export default isAuth;