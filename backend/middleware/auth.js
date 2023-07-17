const jwt = require("jsonwebtoken")

module.exports = function (req, res, next) {
    const token = req.header("token")
    console.log(token)
    if (!token) return res.status(401).json({ message: "Auth error" })

    try {
        console.log(token)
        const decoded = jwt.verify(token, "randomString")
        req.user = decoded.user
        next()
    } catch (e) {
        console.error(e)
        res.status(500).send({ message: "Invalid token" })
    }
}