import { DateTime } from './node_modules/luxon/src/luxon.js';
import Navigator from './modules/navigator.js';
import BookList from './modules/bookList.js';
import Book from './modules/book.js';

const showTime = () => {
  const currentDate = DateTime.local().toFormat('yyyy-MMM-dd');
  const currentTime = DateTime.local().toFormat('hh:mm:ss');
  document.querySelector('.time').innerHTML = `Date: ${currentDate}  Time:${currentTime}`;
};

window.addEventListener('load', () => {
  const nav1 = new Navigator();
  nav1.initiate();
  const list = new BookList();
  list.load();
  showTime();
  setInterval(() => {
    showTime();
  }, 1000);
  const btnAdd = document.querySelector('.btnAdd');
  btnAdd.addEventListener('click', (e) => {
    e.preventDefault();
    const form = document.forms[0];
    const title = form.title.value;
    const author = form.author.value;
    list.add(new Book(title, author));
    form.title.value = '';
    form.author.value = '';
    const message = document.createElement('p');
    message.innerHTML = 'Book added successfully.';
    form.appendChild(message);
    setInterval(() => {
      message.remove();
    }, 2000);
  });
});
