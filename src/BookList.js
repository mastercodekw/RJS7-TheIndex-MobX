import React, { Component } from "react";

// Components
import Loading from "./Loading";
import SearchBar from "./SearchBar";
import BookTable from "./BookTable";
import bookStore from "./stores/bookStore";
import { observer } from "mobx-react";

class BookList extends Component {
  componentDidUpdate(prevProps) {
    const color = this.props.match.params.bookColor;
    if (prevProps.match.params.bookColor !== color) {
      bookStore.filteredColor = color;
    }
  }

  render() {
    return bookStore.loading ? (
      <Loading />
    ) : (
      <div>
        <h3>Books</h3>
        <SearchBar store={bookStore} />
        <BookTable books={bookStore.filteredBooks} />
      </div>
    );
  }
}

export default observer(BookList);
