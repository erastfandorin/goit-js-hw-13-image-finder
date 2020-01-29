import './styles.css';
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
    serviceSearchImages.resetPage();
    clearList();
    const searchValue = e.currentTarget.elements.query.value;
    serviceSearchImages.searchQuery = searchValue;
    observer.observe(refs.lazyLoad);
  }
}
function clearList() {
  refs.gallery.innerHTML = '';
}
// IntersectionObserver
const options = {
  rootMargin: '150px',
  threshold: 0.2,
};
const onEntry = () => {
  insertListImages();
};
const observer = new IntersectionObserver(onEntry, options);

function insertListImages() {
  serviceSearchImages
    .fetchImages()
    .then((imagesList, onReject) => {
      console.log(onReject);
      console.log(imagesList);
      if (imagesList.length !== 0) {
        const markuplist = buildListMarkup(imagesList);
        insertImages(markuplist);
      } else {
        PNotify.error({
          text: '404 Not found',
        });
      }
    })
    .catch(console.log('Eror'));
}
function buildListMarkup(items) {
  return templatesImagesList(items);
}
function insertImages(items) {
  refs.gallery.insertAdjacentHTML('beforeend', items);
}
