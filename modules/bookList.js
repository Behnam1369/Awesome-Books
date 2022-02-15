import Book from './book.js';

export default class BookList {
  constructor() {
    this.books = [];
    this.htmlResult = '';
    this.updateList();
  }

  updateList() {
    localStorage.books = (localStorage.books !== undefined ? localStorage.books : '[]');
    if (this.books.length === 0) {
      this.htmlResult = '<div class="no-book">There is no book in collection yet. Click <a href="#add-new">here</a> to add first book.<div>';
    } else {
      this.htmlResult = this.books.map((el) => `<li>
              <h6>"${el.title}"  by ${el.author} </h6>
              <button type="button">Remove</button>
        </li>`).join('');
      localStorage.books = JSON.stringify(this.books.map((x) => ({ ...x })));
    }
    document.getElementById('books-list').innerHTML = this.htmlResult;
    document.getElementById('books-list').querySelectorAll('button').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        this.remove(i);
      });
    });
  }

  load() {
    this.books = JSON.parse(localStorage.books).map((x) => new Book(x.title, x.author));
    this.updateList();
  }

  add(x) {
    this.books.push(x);
    this.updateList();
  }

  remove(i) {
    this.books.splice(i, 1);
    this.updateList();
  }
}
