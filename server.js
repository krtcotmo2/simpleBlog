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
const routes = require("./routes");
app.use(routes);

//CONNECT TO DB
let conStr = `mongodb://localhost/blogs`;

if(process.env.MONGODB_URI !== undefined){
  conStr ="mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb";
} 
mongoose.connect(
  conStr,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

//Start and Listen
app.listen(PORT, () => {
  console.log(PORT)
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});