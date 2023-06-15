const router = require("express").Router();
const taskController = require("../controllers/taskController");
const { verifyToken } = require("../services/auth");

router.get("/", verifyToken, taskController.browse);
router.get("/:id", verifyToken, taskController.read);
router.put("/:id", verifyToken, taskController.edit);
router.post("/", verifyToken, taskController.add);
router.delete("/:id", verifyToken, taskController.destroy);

module.exports = router;
