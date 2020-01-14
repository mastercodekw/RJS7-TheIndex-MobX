import React, { Component } from "react";

// Components
import Loading from "./Loading";
import SearchBar from "./SearchBar";
import BookTable from "./BookTable";
import bookStore from "./stores/bookStore";
import { observer } from "mobx-react";

class BookList extends Component {
  render() {
    let books = [];

    const color = this.props.match.params.bookColor;
    if (color) {
      books = bookStore.filterBooksByColor(color);
    } else {
      books = bookStore.filteredBooks;
    }

    return bookStore.loading ? (
      <Loading />
    ) : (
      <div>
        <h3>Books</h3>
        <SearchBar store={bookStore} />
        <BookTable books={books} />
      </div>
    );
  }
}

export default observer(BookList);
