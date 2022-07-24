const path = require("path");
const cors = require("cors")
const express = require("express")
const PORT = process.env.PORT || 3000
const app = express()

app.use(cors())


require("dotenv").config()
require("./server/db/config")


app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'server/storage')))

// app.listen(port, (err) => {
//     err ? console.warn(`Hubo un error {
//         message: ${err} }`) : console.log(`Servidor corre en http://localhost:${PORT}`)
// })


app.use(express.static(path.resolve(__dirname, "./bookstore/build")))


// app.get("/api", (req, res) => {
//     res.json(data)
// })



//Routing for endpoint /users
app.use("/users", require("./server/users/usersRoute"))

//Routing for endpoint /books
app.use("/books", require("./server/books/booksRoute"))


//catch all route (404)
app.use((req, res, next) => {
    let error = new Error("Resource not found");
    error.status = 404
    next(error)
})

//Error handler
app.use((error, req, res, next) => {
    if (!error.status) {
        error.status = 500
    }
    res.status(error.status).json({ status: error.status, message: error.message })
})



app.get("/", (req, res) => res.sendFile(path.resolve(__dirname, "./bookstore/build", "index.html")))

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./bookstore/build", "index.html"))
})

app.listen(PORT, (err) => {
    console.log(err ? `Error: ${err}` : `Server up https://utn-books.herokuapp.com`)
})