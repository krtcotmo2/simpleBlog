const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001; 
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const MongoClient =  require("mongodb");
const path = require("path");

const withDB = async (operations, res) => {
  try{    
    const client = await MongoClient.connect("mongodb://localhost:27017", { useUnifiedTopology: true, useNewUrlParser: true});
    const db = client.db("blogs");
    await operations(db);
    client.close();
  }catch(err){
    res.status(500).json({error:err})
  }

}

//allows the body of post request so be read
app.use(express.static(path.join(__dirname,"/client","/build")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//basic routes
app.get('/api/articles/:id', async (req, res)=> { 
  withDB( async (db) => {
    const artId = Number(req.params.id);
    const info = await db.collection("articles").findOne({articleID:artId});
    res.status(200).json(info);  
  }, res)
});
app.post("/api/articles/:id/upvote", async(req, res) =>{
  withDB( async (db) => {
    const artId = Number(req.params.id);    
    const theArt = await db.collection("articles").findOne({articleID:artId});
    await db.collection('articles').updateOne({articleID:artId},{
        '$set' : {
          upVotes: theArt.upVotes + 1,
        },
      }
    )
    const newVal = await db.collection("articles").findOne({articleID:artId});
    res.status(200).json(newVal);
  }, res)
    
    
  
})
app.post('/api/articles/:id/addcomment', async (req, res)=>{
  withDB( async (db) => {
    const artId = Number(req.params.id);
    const {username, comment} = req.body;
    const theArt = await db.collection("articles").findOne({articleID:artId});
    await db.collection('articles').updateOne({articleID:artId},{
        '$set' : {
          comments: [...theArt.comments, {username, comment}],
        },
      }
    )
    const newVal = await db.collection("articles").findOne({articleID:artId});
    res.status(200).send(newVal);
  }, res)
  
});

//CONNECT TO DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/blogs",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

//Start and Listen
app.listen(PORT, () => {
  console.log(PORT)
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});