const router = require("express").Router();
const artcileController = require("../../controllers/artilceContorller")

//matches api/articles/v2/:id
router.route("/v2/")
  .get(artcileController.getArticles)
  
//matches api/articles/v2/:id
router.route("/v2/:id")
  .get(artcileController.getByID)

//matches api/articles/v2/:id/upvote
router.route("/v2/:id/upvote")
  .put(artcileController.upVoteArticle)

//matches api/articles/v2/:id/addcomment
router.route("/v2/:id/addcomment")
  .put(artcileController.addComment)


module.exports = router;