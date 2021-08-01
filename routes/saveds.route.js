const { Router } = require("express");
const { savedController } = require("../controllers/saveds.controller");

const router = Router();

router.post("/saved", savedController.createSaved);
router.post("/saved/:id", savedController.pushSaved);
router.get("/saved", savedController.getAllSaved);
router.patch("/saved/:id", savedController.editSaved);
router.delete("/saved/:id", savedController.removeSaved);

module.exports = router;
