const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001; 
const cookieParser = require("cookie-parser");

let articleVotes = {
  items:[
  {
    id:1,
    upVotes:0,
    comments:[]
  }, {
    id:2,
    upVotes:0,
    comments:[]
  }, {
    id:3,
    upVotes:0,
    comments:[]
  }, {
    id:4,
    upVotes:0,
    comments:[]
  }, {
    id:5,
    upVotes:0,
    comments:[]
  },
]}



//allows the body of post request so be read
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

//basic routes
// app.get("/hello", (req, res) => { 
//     res.send("Hello Generic");  
// })
// app.get("/hello/:name", (req, res) => {
//   res.send(`Hello ${req.params.name}`);
// })
// app.post("/hello", (req, res) => {
//   console.log(req.body)
//   res.send(`Hello ${req.body.name}`)
// })
app.post("/api/articles/:id/upvote", (req, res) =>{
  const artId = Number(req.params.id);
  const theArt = articleVotes.items.find(x => x.id === artId);
  theArt.upVotes++;
  res.status(200).send(`${theArt.id.toString()} now has ${theArt.upVotes} votes`)
})
app.post('/api/articles/:id/add-comment', (req, res)=>{
  const artId = Number(req.params.id);
  const theArt = articleVotes.items.find(x => x.id === artId);
  const {username, comment} = req.body;
  theArt.comments.push({username, comment});
  console.log(theArt.comments)
  res.status(200).send(`${theArt.id.toString()} now has ${theArt.comments.length} comments`)
});

//Start and Listen
app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});