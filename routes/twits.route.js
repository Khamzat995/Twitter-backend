const { Router } = require("express");
const { twitController } = require("../controllers/twits.controller");

const router = Router();

router.post("/twit", twitController.createTwit);
router.post("/twit/:id", twitController.createTwitByLike);
router.get("/twits", twitController.getAllTwits);
router.get("/twit/:id", twitController.getTwitById);
router.patch("/twit/:id", twitController.editTwit);
router.delete("/twit/:id", twitController.removeTwit);

module.exports = router;
