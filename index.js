import express from "express"
import {userRouter , otpRouter , friendRouter , postRouter , likeRouter , commentRouter} from "./src/routes/index.route.js"





const app = express()

app.use(express.json())

app.use('/api/users' ,userRouter )
app.use('/api/friends' ,friendRouter )
app.use('/api/posts' ,postRouter )
app.use('/api/likes' ,likeRouter )
app.use('/api/otp' ,otpRouter )
app.use('/api/comments' ,commentRouter )








export default app;
