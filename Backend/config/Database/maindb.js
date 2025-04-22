import mongoose from 'mongoose'
import dotenv  from 'dotenv';
dotenv.config();

const connectToDB = async () => {
    try{
        await mongoose.connect(process.env.EXPRESS_MONGODB_CONNECTION_STRING)
        console.log('connected to mongobd successfully')
    }
    catch(error){
        console.log('error in connecting mongodb')
        console.log(error.message)
    }
}

export default connectToDB 