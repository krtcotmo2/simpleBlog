const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  articleID : {type:Number, required:true,},
  upVotes : Number,
  comments : [
    {username:String,
    comment: String}
  ]
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;