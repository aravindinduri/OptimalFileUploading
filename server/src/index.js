import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import DBConnection from './Database/db.js'
import FileRoutes from './routes/routes.js'
dotenv.config({path:'./env'});




const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));


app.use(express.json({limit :"20kb"}));
app.use(express.urlencoded({extended : true}));

DBConnection()
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log(`Server is Running at port:${process.env.PORT}`);
        app.on("error",(error)=>{
          console.log("Error:",error);
          throw error;
        })
  })
})
.catch((error) => {
    console.log("MongoDB Connection Error !!!",error);
})

app.get('/test', (req, res) => {
  res.json({ message: "Test route working!" });
});

app.use("/api/v1/",FileRoutes)