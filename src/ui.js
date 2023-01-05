class UI {
  constructor() {
    this.post = document.querySelector('#blogposts');
    this.imageUrlInput = document.querySelector('#imgUrl');
    this.categoryInput = document.querySelector('#category');
    this.titleInput = document.querySelector('#title');
    this.authorInput = document.querySelector('#author');
    this.textContentArea = document.querySelector('#textContent');
    this.idInput = document.getElementById('id');
    this.addPostSubmit = document.querySelector('.addSubmit');
    this.state = 'add';
  }

  showPosts(blogposts) {
    let blogs = document.querySelector('#blogposts');
    blogposts.forEach((post) => {
      blogs.innerHTML += `

          <div class="col-12 col-md-6 col-lg-4 d-flex">
      <div class="card mb-5">
      <div class=" position-relative">
      <a data-bs-toggle="modal" data-bs-target="#a${post.id}">
              <img class="card-img post-img" width="100%" height="400" src="${post.imageUrl}" alt="image" >
        <a href="#" class="btn btn-light btn-sm mx-auto d-block p-1 fs-6 ctg">${post.category}</a>
      </a>

        </div>
        <div class="card-body">
          <h4 class="card-title post-title">${post.title}</h4>
          <h2 class= "card-text post-author filter-author">${post.author}</h2>
          <p class="card-text post-content">${post.textContent}</p>
      <div class="d-flex space-between  justify-content-between mt-2">
    <button type="button" class="btn btn-sm btn-outline-primary fs-6 py-1 px-4" data-id="${post.id}" id="edit-post">Edit</button>
    <button type="button" class="btn btn-sm btn-outline-danger fs-6 py-1 px-4" id="delete-post" data-id="${post.id}">Delete</button>
        </div>
        </div>
        <div class="card-footer text-muted d-flex justify-content-between bg-transparent border-top-0">
          <div class="views">
              ${post.date}
          </div>
          <div class="stats">
           	<i class="far fa-eye"></i> 1347
            <i class="far fa-comment"></i> 12
          </div>
          </div>
  </div>
</div>
<!-- Modal -->
<div class="modal fade" id="a${post.id}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-bs-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title mx-auto" id="myModalLabel">${post.title}</h4>
      </div>
      <div class="modal-body">
        <img class="card-img-top mb-3" width="100%" height="320" src="${post.imageUrl}">
          <h3 class= "card-text post-author img-fluid filter-author mb-3">Yazar: ${post.author}</h3>
          <p class="card-text post-content">${post.textContent}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
      `;
    });
  }

  showAlert(msg, type) {
    const section = document.getElementById('section');
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = msg;

    section.appendChild(alert);

    setTimeout(() => {
      alert.remove();
    }, 3000);
  }

  clearFields() {
    this.imageUrlInput.value = '';
    this.categoryInput.value = '';
    this.titleInput.value = '';
    this.authorInput.value = '';
    this.textContentArea.value = '';
  }

  fillForm(data) {
    this.imageUrlInput.value = data.imageUrl;
    this.categoryInput.value = data.category;
    this.titleInput.value = data.title;
    this.authorInput.value = data.author;
    this.textContentArea.value = data.textContent;
    this.idInput.value = data.id;

    this.changeState('edit');
  }

  clearIdInput() {
    this.idInput.value = '';
  }

  changeState(type) {
    if (type === 'edit') {
      this.addPostSubmit.textContent = 'Update Post';
      this.addPostSubmit.className = 'addSubmit btn btn-warning btn-block';

      if (!document.querySelector('.post-cancel')) {
        const button = document.createElement('button');
        button.className = 'post-cancel btn btn-light btn-block';
        button.appendChild(document.createTextNode('Cancel Edit'));

        const cardForm = document.querySelector('.card-form');
        const formEnd = document.querySelector('.form-end');
        cardForm.insertBefore(button, formEnd);
      }
    } else {
      this.addPostSubmit.textContent = 'Yolla Gelsin';
      this.addPostSubmit.className = 'addSubmit btn btn-primary btn-block';

      if (document.querySelector('.post-cancel')) {
        document.querySelector('.post-cancel').remove();
      }

      this.clearIdInput();
      this.clearFields();
    }
  }

  filterAuthorUI(filterByAuthor, filterValue) {
    filterByAuthor.forEach(function (author) {
      const text = author.innerHTML.toLowerCase();
      if (text.indexOf(filterValue) === -1) {
        author.parentElement.parentElement.setAttribute('style', 'display:none !important');
      } else {
        author.parentElement.parentElement.setAttribute('style', 'display:block');
      }
    });
  }

  filterCategoryUI(filterByCategory, categoryName) {
    filterByCategory.forEach(function (ctg) {
      const text = ctg.innerText;
      if (text.indexOf(categoryName) === -1 && categoryName != 'Show All') {
        ctg.parentElement.parentElement.setAttribute('style', 'display:none !important');
      } else {
        ctg.parentElement.parentElement.setAttribute('style', 'display:block');
      }
    });
  }
}

export const ui = new UI();
