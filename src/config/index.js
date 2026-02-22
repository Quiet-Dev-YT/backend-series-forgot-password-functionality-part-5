const mongoose = require('mongoose')
const MONGOURL = process.env.MONGODB_URL
const connectDB = async () => {
    try {
        await mongoose.connect(MONGOURL)
        console.log("DB CONNECTED SUCCESSFULLY!")
    }catch(e){
        console.log(e)
    }
}

module.exports = connectDB