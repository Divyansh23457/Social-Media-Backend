import { connectToDatabase } from './db/db.config.js'
import app from './index.js'

app.listen(3000,()=>{
    console.log("Server has started running")
    connectToDatabase()
})

