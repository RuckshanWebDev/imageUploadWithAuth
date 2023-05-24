import mongoose from "mongoose";

const connect = async () => {

    try {
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/mernauth')
        // const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`✔ Database Connected ${conn.connection.host}`);

    } catch (error) {
        console.error('Error from DB :', error)
    }


}


export default connect