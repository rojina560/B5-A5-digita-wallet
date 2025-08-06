import { app } from "./app";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import { enVars } from "./app/config/env";
dotenv.config()
const port = process.env.PORT || 5000;

// Start server
const startServer = async () => {
  try {
    await mongoose.connect(enVars.MONGODB_URI)
    console.log('Mongodb connected.')

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error: any) {
    console.log('Error while connecting MongoDB', error.message)
  }
}


(async()=> {
  await startServer()
})()