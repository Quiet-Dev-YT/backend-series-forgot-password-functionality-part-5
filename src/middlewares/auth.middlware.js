const jwt = require('jsonwebtoken')
const { User } = require('../models')


const auth = async (req,res,next) => {

    try{
        const bearer = req?.headers?.authorization
        const token = bearer && bearer.split(" ")[1]

        if(!token){
            return res.status(401).json({ message: "Unauthorized"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await User.findById(decoded.id)
        if(!user){ 
            return res.status(400).json({ message: "user doesnt exist"})
        }

        req.authenticated = true
        req.token = token
        req.user = user
        next()

    }catch(e){
        console.log(e)
        req.decoded = null
        req.authenticated = false
        return res.status(500).json({ message: "Invalid or expired token"})
    }
}

module.exports = auth