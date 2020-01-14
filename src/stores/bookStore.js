import { decorate, observable, computed } from "mobx";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

class BookStore {
  books = [];

  loading = true;

  query = "";

  filteredColor = "";

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

    if (this.filteredColor && this.filteredColor !== "") {
      books = books.filter(book => book.color === this.filteredColor);
    }

    if (this.query && this.query !== "") {
      books = books.filter(book =>
        book.title.toLowerCase().includes(this.query.toLowerCase())
      );
    }

    return books;
  }

  getBookById = id => this.books.find(book => +book.id === +id);

  borrowBook = id => {
    const book = this.getBookById(id);
    book.available = !book.available;
  };
}

decorate(BookStore, {
  books: observable,
  loading: observable,
  query: observable,
  filteredBooks: computed,
  filteredColor: observable
});

const bookStore = new BookStore();
bookStore.fetchBooks();

export default bookStore;
