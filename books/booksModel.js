const pool = require("../db/config");

const addNewBook = (post) => {
    const query = "INSERT INTO books SET ?";
    try {
        return pool.query(query, post)
    } catch (error) {
        error.message = error.code
    }
}

const getBooksWith = (string) => {
    const query = `SELECT * FROM books WHERE name LIKE '%${string}%'`
    try {
        return pool.query(query)
    } catch (error) {
        error.message = error.code
    }
}
const getBookById = (id) => {
    const query = `SELECT * FROM books WHERE id = ${id}`
    try {
        return pool.query(query)
    } catch (error) {
        error.message = error.code
    }
}

const getAllBooks = () => {
    const query = "SELECT * FROM books";
    try {
        return pool.query(query)
    } catch (error) {
        error.message = error.code
    }
}

//NUEVOS:


const deleteBookById = async(id) => {
    const query = `DELETE FROM books WHERE id = ${id}`
    try {
        return await pool.query(query)
    } catch (error) {
        error.message = error.code
        return error
    }
}

const editBookById = async(id, user) => {
    const query = `UPDATE books SET ? WHERE id = ${id}`
    try {
        return await pool.query(query, user)
    } catch (error) {
        error.message = error.code
        return error
    }
}



module.exports = { addNewBook, getBooksWith, getAllBooks, deleteBookById, editBookById, getBookById }