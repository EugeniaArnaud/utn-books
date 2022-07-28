const { addNewBook, getAllBooks, getBooksWith, editBookById, deleteBookById, getBookById } = require("./booksModel")
const { matchedData } = require("express-validator")
const public_url = process.env.public_url
const notNumber = require("../utils/notNumber")

const listOne = async(req, res, next) => {
  if (notNumber(req.params.id, next)) return
  const dbResponse = await getBookById(+req.params.id);
  if (dbResponse instanceof Error) return next(dbResponse)
  if (!dbResponse.length) return next()
  const { id, name, author, price } = dbResponse[0]
  const responseBook = {
      id,
      name,
      author, 
      price
  }
  res.status(200).json(responseBook)
}


const listAll = async(req, res, next) => {
  let dbResponse = null;
  if (req.query.name) {
      dbResponse = await getBooksWith(req.query.name);
  } else {
      dbResponse = await getAllBooks();
  };
  if (dbResponse instanceof Error) return next(dbResponse);
  dbResponse.length ? res.status(200).json(dbResponse) : next();
}


const addOne = async(req, res, next) => {
  // const cleanBody = matchedData(req)  
  //  const image = `${public_url}/${req.file.filename}` 
     
  const {name, author, price } = req.body
 
  const dbResponse = await addNewBook({ userid: req.user.id, name, author, price }); //no ,image
  dbResponse instanceof Error ? next(dbResponse) : res.status(201).json({ message: `Book created by ${req.user.name}` });

}


//edit book by id
const editBook = async(req, res, next) => {
  if (notNumber(req.params.id, next)) return
  //  const image = `${public_url}/${req.file.filename}` 
  const dbResponse = await editBookById(+req.params.id, {...req.body }) //{...req.body, image}
  if (dbResponse instanceof Error) return next(dbResponse)
  dbResponse.affectedRows ? res.status(200).json({ message: "Book modified!" }) : next()
}

//delete book by id
const deleteBook = async(req, res, next) => { 
  if (notNumber(req.params.id, next)) return 
  const dbResponse = await deleteBookById(+req.params.id)
  if (dbResponse instanceof Error) return next(dbResponse);
  !dbResponse.affectedRows ? next() : res.status(204).end();
}

module.exports = { addOne, listAll, editBook, deleteBook, listOne }