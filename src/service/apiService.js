const baseUrl =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal';

export default {
  page: 1,
  query: '',
  fetchImages() {
    const requestParams = `&q=${this.query}&page=${this.page}&per_page=12&key=14890929-23ffdef91aab059ee79f68fac`;

    return fetch(baseUrl + requestParams).then(response =>
      response.json().then(parsedResponse => {
        this.incrementPage();

        return parsedResponse.hits;
      }),
    );
  },
  get searchQuery() {
    return this.query;
  },
  set searchQuery(string) {
    this.query = string;
  },
  incrementPage() {
    this.page += 1;
  },
  resetPage() {
    this.page = 1;
  },
};
