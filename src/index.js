import './styles.css';
import '../node_modules/lodash';
import serviceSearchImages from './service/apiService.js';
import templatesImagesList from './templates/Image.hbs';
import PNotify from '../node_modules/pnotify/dist/es/PNotify.js';
import '../node_modules/pnotify/dist/PNotifyBrightTheme.css';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  lazyLoad: document.querySelector('.Lazy-Load'),
};

refs.searchForm.addEventListener('submit', searchImages);

function searchImages(e) {
  e.preventDefault();

  if (e.currentTarget.elements.query.value === '') {
    PNotify.error({
      text: '404 Not found',
    });
  } else {
    const searchValue = e.currentTarget.elements.query.value;

    serviceSearchImages.resetPage();
    clearList();

    serviceSearchImages.searchQuery = searchValue;

    observer.observe(refs.lazyLoad);
  }
}

function clearList() {
  refs.gallery.innerHTML = '';
}

const options = {
  rootMargin: '150px',
  threshold: 0.2,
};

const onEntry = entries => {
  entries.forEach(() => {
    insertListImages();
  });
};
const observer = new IntersectionObserver(onEntry, options);

function insertListImages() {
  serviceSearchImages.fetchImages().then(imagesList => {
    const markuplist = buildListMarkup(imagesList);
    insertImages(markuplist);
  });
}

function buildListMarkup(items) {
  return templatesImagesList(items);
}

function insertImages(items) {
  refs.gallery.insertAdjacentHTML('beforeend', items);
}

// Infinite Scroll with bourd "load more"

// refs.button = document.querySelector('.button');
// refs.button.addEventListener('click', clickButton);

// function clickButton() {
//   if (serviceSearchImages.searchQuery != +'') {
//     insertListImages();
//   }
// }
