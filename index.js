const express = require("express");
const app = express();
const cors = require("cors")
const db = require("./db");
const appRoutes = require("./routes/app_routes")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.use(cors())
PORT = 3000;


app.get("/", (req,res)=>{
    res.send("Hey, This is Recepie App ");
})
app.use('/v1/api', appRoutes); 



app.listen(PORT,()=>{
   console.log(`Server is running on : http://127.0.0.1:${PORT}`);
})
