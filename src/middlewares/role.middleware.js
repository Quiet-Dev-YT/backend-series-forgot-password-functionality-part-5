const role = (check_roles = []) => {
    return (req, res, next) => {
        if(!req.user){
            return res.status(401).json({ message: "Unauthorized"})
        }
        if(!check_roles.includes(req.user.role)){
            return res.status(403).json({ message: "You are not authorized to access this URI"})
        }
        next()
    }
}

module.exports = role