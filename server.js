import { connectToDatabase } from './db/db.config.js'
import app from './index.js'

app.listen(8000,()=>{
    console.log("Server has started running")
    connectToDatabase()
})

