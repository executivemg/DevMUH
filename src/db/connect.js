import mongoose from "mongoose";

async function connect() {
    try {
        const url = process.env.MONGODB_URI
        mongoose.connect(url)
        const connection = mongoose.connection

        connection.on("connected", () => {
            console.log("Connected")
        })
        connection.on("error", () => {
            console.log("Error conection failed")
        })
    } catch (error) {
        console.log(error.message)
    }
}

export default connect