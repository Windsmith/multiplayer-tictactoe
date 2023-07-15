const mongoose = require("mongoose")

const MONGOURI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.zfflv.mongodb.net/`

const InitiateMongoServer = async () => {
    try {
        await mongoose.connect(MONGOURI, {
            useNewUrlParser: true
        })

        console.log("Connected to DB")
    } catch (e) {
        console.log(e)
        throw e
    }
}

module.exports = InitiateMongoServer;