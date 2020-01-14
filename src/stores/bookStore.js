import { decorate, observable, computed } from "mobx";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

class BookStore {
  books = [];

  loading = true;

  query = "";

  fetchBooks = async () => {
    try {
      const res = await instance.get("/api/books/");
      this.books = res.data;
      this.loading = false;
    } catch (err) {
      console.error(err);
    }
  };

  get filteredBooks() {
    let books = this.books;

    if (this.query && this.query !== "") {
      books = books.filter(book =>
        book.title.toLowerCase().includes(this.query.toLowerCase())
      );
    }

    return books;
  }

  borrowBook = id => {
    const book = this.getBookById(id);
    book.available = !book.available;
  };

  filterBooksByColor = color => {
    let books = this.books.filter(book => book.color === color);

    if (this.query && this.query !== "") {
      books = books.filter(book =>
        book.title.toLowerCase().includes(this.query.toLowerCase())
      );
    }

    return books;
  };

  filterBooksByAuthor = authorID =>
    this.books.filter(book =>
      book.authors.some(author => author.id === authorID)
    );

  getBookById = id => this.books.find(book => +book.id === +id);
}

decorate(BookStore, {
  books: observable,
  loading: observable,
  query: observable,
  filteredBooks: computed
});

const bookStore = new BookStore();
bookStore.fetchBooks();

export default bookStore;
