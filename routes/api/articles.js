const router = require("express").Router();
const articleController = require("../../controllers/articleController")

//matches api/articles/v2/:id
router.route("/v2/")
  .get(articleController.getArticles)
  
//matches api/articles/v2/:id
router.route("/v2/:id")
  .get(articleController.getByID)

//matches api/articles/v2/:id/upvote
router.route("/v2/:id/upvote")
  .put(articleController.upVoteArticle)

//matches api/articles/v2/:id/addcomment
router.route("/v2/:id/addcomment")
  .put(articleController.addComment)


module.exports = router;