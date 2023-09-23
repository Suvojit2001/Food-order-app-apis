const jwt=require('jsonwebtoken')
require('dotenv').config();

exports.auth=(req,res,next)=>{
    try {
        //we can fetch token from header/body/cookie
        //secured way is header , why? (google it)
        //extract JWT token
        const token= req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ","");
        if(!token || token===undefined){
            return res.status(401).json({
                status:false,
                message:'token missing'
            });
        }

        //verify the token
        try {
            const payload=jwt.verify(token,process.env.JWT_SECRET);
            console.log(payload);
            req.user=payload;

        } catch (error) {
             return res.status(401).json({
                status:false,
                message:'token is invalid'
            });
        }
        next();

    } catch (error) {
        return res.status(401).json({
            status:false,
            message:'Something went wrong'
        });
    }
}


exports.isAdmin=async(req,res,next)=>{
    try {
        if(!req.user.isAdmin){
            return res.status(401).json({
                status:false,
                message:'This is Protected Route for Admin'
            });
        }
        next()
    } catch (error) {
        return res.status(401).json({
            status:false,
            message:'Something went wrong'
        });
    }
}