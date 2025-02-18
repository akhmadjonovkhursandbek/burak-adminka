// Importing express, path, router, routerAdmin, morgan, and config
import cors from "cors"
import express from "express"
import path from "path"
import router from "./router"
import routerAdmin from "./router-admin"
import morgan from "morgan"
import cookieParser from "cookie-parser";
import { MORGAN_FORMAT } from "./libs/config"

import session from "express-session";
import ConnectMongoDB from "connect-mongodb-session";
import { T } from "./libs/types/common"

const MongoDBStore = ConnectMongoDB (session);
const store = new MongoDBStore({
    uri: String (process.env.MONGO_URL),
collection: "sessions",
});


/** 1-ENTRANCE **/
const app = express();
console.log("__dirname", __dirname);
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("./uploads"));  // uploads can be accesible in browser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({credentials: true, origin: true}))
app.use(cookieParser()); 
app.use(morgan(MORGAN_FORMAT));

/** 2-SESSIONS **/

app.use (
    session ({
        secret: String (process.env.SESSION_SECRET),
        cookie: {
            maxAge: 1000 * 3600 * 6 // 6 Hours
        },
        store: store,
        resave: true, // Save session even if it's modified (true)
        saveUninitialized: true // Save session even if it's not modified (true)
    })
);

app.use(function(req, res, next) {
    const sessionInstance = req.session as T;
    res.locals.member = sessionInstance.member;
    next();
})


/** 3-VIEWV **/
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/** 4-ROUTES **/
app.use("/admin", routerAdmin); //EJS
app.use("/" ,router)            //React

export default app;

