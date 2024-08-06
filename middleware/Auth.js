import User from "../model/user.model.js";
import JWT from "jsonwebtoken"
export const Auth = async (req, res, next) => {
    try {
        const token = req.cookies.Bookstore_auth;
        if (!token) {
            return res.status(401).json({
                message: "Plz login"
            })
        }
        const verify = JWT.verify(token, process.env.JWT_Password)
        const user_id = verify.id
        const user = await User.findOne({ _id: user_id });
        req.fullname = user.fullname
        next();
    } catch (error) {
        console.log("error in auth",error);
        return res.status(500).json({
            message:"internal server problem"
        })
    }
}