import jwt from "jsonwebtoken";

const adminAuth = async (req,res,next) => {
    try {
        let {token} = req.cookies;
        if(!token){
            return res.status(400).json({message: "No token found"});
        }
        let verify = await jwt.verify(token,process.env.JWT_SECRET);

        if(!verify){
            return res.status(400).json({message: "Unauthorized , Invalid token"});
        }
        req.adminEmail = process.env.ADMIN_EMAIL;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Admin Auth Error !!"});
    }
}
export default adminAuth;