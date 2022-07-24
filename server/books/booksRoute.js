const router = require("express").Router();
const { listAll, addOne, editBook, deleteBook, listOne } = require("./booksController");
const isAuth = require("../middlewares/isAuth")
const uploadFile = require("../utils/handleStorage")
// const validatorCreatePost = require("../validators/posts")


router.get("/", listAll)

router.get("/:id", listOne)

router.post("/", isAuth, uploadFile.single("file") , addOne)


//patch user
router.patch("/:id", uploadFile.single("file"), editBook)


//delete user by id
router.delete("/:id", deleteBook)

module.exports = router