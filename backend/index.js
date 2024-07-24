const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Server is running and this is Home route!")
})

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})