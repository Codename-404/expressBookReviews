const axios = require("axios");

// Replace with your actual data source URL
const BOOKS_API_URL = "http://localhost:3000";

async function getAllBooks() {
  try {
    const response = await axios.get(BOOKS_API_URL);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

const BOOK_BY_ISBN = "http://localhost:3000/isbn/1";

async function getBooksByIsbn() {
  try {
    const response = await axios.get(BOOK_BY_ISBN);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}
const BOOK_BY_AUTHOR = "http://localhost:3000/author/Unknown";

async function getBooksByAuthor() {
  try {
    const response = await axios.get(BOOK_BY_AUTHOR);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}
const BOOK_BY_TITLE = "http://localhost:3000/title/The Epic Of Gilgamesh";

async function getBooksByTitle() {
  try {
    const response = await axios.get(BOOK_BY_TITLE);
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}
