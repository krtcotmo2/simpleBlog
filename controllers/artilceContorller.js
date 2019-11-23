const db = require("../models");

module.exports = {
  create: function(req, res){
    db.Article
      .create(req.body)
      .then(newRecord => res.json(newRecord))
      .catch(err => res.status(500).json("Erro writing to DB", err))
  },

  getArticles: function(req, res){
    console.log("findAll")
    db.Article
      .find({})
      .then(foundItems => res.status(200).json(foundItems))
      .catch(err => res.status(500).json("err ", err));
  },

  getByID: function(req, res){  
    console.log("findOne", req.params.id)
    db.Article
      .findOne({articleID: req.params.id})
      .then(anAticle => res.status(200).json(anAticle))
      .catch(err => res.status(500).json("err ", err))
  },

  upVoteArticle: function(req, res){
    console.log(req.body)
    db.Article
      .findOneAndUpdate({articleID: req.params.id}, req.body)
      .then(() =>{
        db.Article
          .findOne({articleID: req.params.id})
          .then(anAticle => res.status(200).json(anAticle))
          .catch(err => res.status(500).json("err ", err))
      })
      .catch(err => res.status(500).json("err ", err))
  },

  addComment: function(req, res){
    db.Article
      .findOne({articleID: req.params.id})
      .then(theArt => {
        let newComment = {username:req.body.username, comment:req.body.comment}
        theArt.comments = [...theArt.comments, newComment];
        db.Article
          .findOneAndUpdate({articleID: req.params.id}, {comments:[...theArt.comments]})
          .then(()=> res.status(200).json(theArt))
          .catch(err => res.status(500).json("err ", err))         
      })
      .catch(err => res.status(500).json("err ", err))
  }
}