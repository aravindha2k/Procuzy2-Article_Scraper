const express = require('express');
const cors = require('cors');
const { scrapeMedium } = require('./scraper');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res)=>{
    res.send("Server is running and this is Home route!")
})

let articles = [];

app.post("/scrape", async(req, res)=>{
    const topic = req.body.topic;
    if(!topic){
        return res.status(400).json({error: "Topic is required"});
    }

    try {
        articles = await scrapeMedium(topic);
        res.status(200).json(articles.slice(0,5))
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message})
    }
})

app.get("/articles", async(req,res)=>{
    console.log("articles endpoint");
    if(articles.length == 0){
        return res.json("No articles found")
    }
    res.status(200).json(articles.slice(0,5))
})

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})