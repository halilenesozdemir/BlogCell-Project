import { http } from './httpRequests';
import { ui } from './ui';

const addPostSubmit = document.querySelector('.addSubmit');
const blogposts = document.querySelector('#blogposts');
const cardForm = document.querySelector('.card-form');
const filterBlog = document.getElementById('filter');
const filterButtons = Array.from(document.querySelectorAll('.filters-container button'));
const mainContainer = document.querySelector('.mainContainer');

eventListeners();
function eventListeners() {
  document.addEventListener('DOMContentLoaded', getPosts);
  addPostSubmit.addEventListener('click', submitPost);
  blogposts.addEventListener('click', deletePost);
  blogposts.addEventListener('click', enableEdit);
  cardForm.addEventListener('click', cancelEdit);
  filterBlog.addEventListener('keyup', filterPosts);
  filterButtons.forEach((elem) => {
    elem.addEventListener('click', filterItemsByCategory);
  });
}

function getPosts() {
  http
    .get('http://localhost:3000/posts')
    .then((data) => ui.showPosts(data))
    .catch((err) => console.log(err));
}

function submitPost() {
  const imageUrl = document.getElementById('imgUrl').value;
  const category = document.getElementById('category').value;
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const textContent = document.getElementById('textContent').value;
  const id = document.getElementById('id').value;
  // Date Part
  const now = new Date();
  const day = `${now.getDate()}`.padStart(2, 0);
  const month = `${now.getMonth() + 1}`.padStart(2, 0);
  const year = now.getFullYear();
  const hour = `${now.getHours()}`.padStart(2, 0);
  const min = `${now.getMinutes()}`.padStart(2, 0);

  const data = { imageUrl, category, title, author, textContent, date: `${day}/${month}/${year}, ${hour}:${min}` };

  // Input Doğrulama...
  if (imageUrl === '' || category === '' || title === '' || author === '' || textContent === '') {
    ui.showAlert('Lütfen tüm alanları doldurun', 'danger');
  } else {
    if (id === '') {
      http
        .post('http://localhost:3000/posts', data)
        .then((data) => {
          ui.showAlert('Post başarıyla eklendi', 'success');
          ui.clearFields();
          getPosts();
        })
        .catch((err) => console.log(err));
    } else {
      // Update post
      http
        .put(`http://localhost:3000/posts/${id}`, data)
        .then((data) => {
          ui.showAlert('Post güncellendi', 'success');
          ui.changeState('add');
          getPosts();
        })
        .catch((err) => console.log(err));
    }
  }
}

function deletePost(e) {
  if (e.target.id === 'delete-post') {
    const id = e.target.dataset.id;
    if (confirm('Are u sure?')) {
      http
        .delete(`http://localhost:3000/posts/${id}`)
        .then((data) => {
          ui.showAlert('Post silindi', 'danger');
          getPosts();
        })
        .catch((err) => console.log(err));
    }
    e.preventDefault();
  }
}

function enableEdit(e) {
  if (e.target.id === 'edit-post') {
    const id = e.target.dataset.id;
    const imageUrl =
      e.target.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild.src;
    const category = e.target.parentElement.parentElement.parentElement.firstElementChild.lastElementChild.textContent;
    const title = e.target.parentElement.parentElement.firstElementChild.textContent;
    const author = e.target.parentElement.parentElement.firstElementChild.nextElementSibling.textContent;
    const textContent = e.target.parentElement.parentElement.children[2].textContent;
    const now = new Date();
    const day = `${now.getDate()}`.padStart(2, 0);
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const year = now.getFullYear();
    const hour = `${now.getHours()}`.padStart(2, 0);
    const min = `${now.getMinutes()}`.padStart(2, 0);

    const data = {
      id,
      imageUrl,
      category,
      title,
      author,
      textContent,
      date: `${day}/${month}/${year}, ${hour}:${min}`,
    };

    ui.fillForm(data);
    mainContainer.scrollIntoView();
  }
  e.preventDefault();
}

function cancelEdit(e) {
  if (e.target.classList.contains('post-cancel')) {
    ui.changeState('add');
  }
  e.preventDefault();
}

function filterPosts(e) {
  const filterValue = e.target.value.toLowerCase().trim();
  const filterByAuthor = document.querySelectorAll('.filter-author');
  ui.filterAuthorUI(filterByAuthor, filterValue);
}

function filterItemsByCategory(e) {
  const filterByCategory = document.querySelectorAll('.ctg');
  const categoryName = e.target.innerText;
  console.log(categoryName);
  ui.filterCategoryUI(filterByCategory, categoryName);
}
