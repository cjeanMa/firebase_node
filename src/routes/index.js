const { Router } = require("express");
const { homePage, postBook, deleteBook } = require("../controllers");
const router = Router();

router.get("/", homePage)
router.post("/post-book", postBook)
router.get("/delete/:id", deleteBook)

module.exports = router