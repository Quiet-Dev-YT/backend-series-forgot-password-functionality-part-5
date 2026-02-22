const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 8080

const app = require('./src/app')
const connectDB = require('./src/config')

app.listen( PORT, async () => {
    try {
        await connectDB()
        console.log(`Server running on port ${PORT}`)
    }catch(e){
        console.log(e)
        process.exit(1)
    }
})