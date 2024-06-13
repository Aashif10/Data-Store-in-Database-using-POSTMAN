let { Router } = require("express");
const {
  createQuote,
  fetchAll,
  SingleUpdate,
  deleteItem
} = require("../Controller/quoteController");
const { deleteOne } = require("../Model/taskModel");
let router = Router();

router.post("/createquote", createQuote);
router.get("/all", fetchAll);
router.patch("/update/:id", SingleUpdate);
router.delete("/delete/:id", deleteItem);
module.exports = router;
