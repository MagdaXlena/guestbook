import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const db = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});

app.get("/", function(request, response){
    response.json("Home route");    
});

app.get("/guestbook", async function(request, response){
    const guestbook = await db.query("SELECT * FROM guestbook");
    response.json(guestbook.rows);
});

app.post("/guestbook", async function (request, response) {
    console.log(request.body);
    const name = request.body.name;
    const hometown = request.body.hometown;
    const message = request.body.message;
    const newGuests = await db.query("INSERT INTO guestbook (name, hometown, message) VALUES ($1, $2, $3)", [name, hometown, message]

     );
     response.json(newGuests);
});

app.listen(8080, function (){
    console.log("App is running on port 8080")
});
