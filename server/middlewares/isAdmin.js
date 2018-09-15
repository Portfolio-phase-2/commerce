
module.exports = (req, res, next) => {
    if(req.decoded.role == 'admin') {
        next()
    } else {
        res.status(403).json({
            message: "You're not authorized for these feature",
            you: req.decoded.role
        })
    }
}
// By Asrul Harahap - 2018