import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import mongoose from "mongoose";

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URL as string, {})
    .then((data) => {
        console.log("MongoDB connection succeed");
        const PORT = process.env.PORT ?? 3003;
        app.listen(PORT, function () {
            console.info(`The server is running successfuly on port: ${PORT}`);
            console.info(`Admin Project on http://localhost:${PORT}/admin \n`);
        })
    })
    .catch((err) => console.log("ERROR on connection MongoDB", err));