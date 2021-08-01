const { Router } = require("express");
const { commentsController } = require("../controllers/comments.controller");

const router = Router();

router.post("/comment", commentsController.createComments);
router.get("/comments", commentsController.getAllComments);
router.get("/comment/:id", commentsController.getCommentsById);
router.patch("/comment/:id", commentsController.editComments);
router.delete("/comment/:id", commentsController.removeComments);

module.exports = router;
