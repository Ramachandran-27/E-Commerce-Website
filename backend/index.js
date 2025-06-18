import express from "express";
import db from "./config/db.js";


const port = 3000;
const app = express();

app.use(express.urlencoded({extended:true}));

db.connect();

app.get("/", async (req, res) => {
    try{
        const result = await db.query("SELECT * FROM users");
        console.log(result.rows);
        res.send(result.rows);
    }catch(err){
        console.error("Error executing query", err.message);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port,() => {
    console.log(`Server is running on port ${port}`)
})