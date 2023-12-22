import express from "express"
import {userRouter , otpRouter , friendRouter , postRouter , likeRouter , commentRouter} from "./src/routes/index.route.js"
import cookieParser from "cookie-parser";
import session from "express-session"
import dotenv from "dotenv"

dotenv.config()





const app = express()

app.use(cookieParser());
app.use(express.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, 
  }));

app.use('/api/users' ,userRouter )
app.use('/api/friends' ,friendRouter )
app.use('/api/posts' ,postRouter )
app.use('/api/likes' ,likeRouter )
app.use('/api/otp' ,otpRouter )
app.use('/api/comments' ,commentRouter )








export default app;
