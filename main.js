var app = new Vue({
  el: '#app',
  data: {
    query: '',
    PageTitle: 'I am title',
    items: [],
    processing: false
  },
  methods: {
    getAuthorNames(authors) {
      if (authors)
        return authors.join(", ")
      return ""
    },
    // Renders an error message
    showError(error) {
      const html = `<p class="error">${error}</p>`;
      document.querySelector('#results').innerHTML = html;
    },

    // Generate HTML and sets #results's contents to it
    render(items) {

      var html = "<h1 id='result'>Result</h1>";
      items.forEach(function (item) {

        html += `                

          <div class="cards__item flex-item">
          <div class="card">
            <div class="card__image">
              <img  src="${item.volumeInfo.imageLinks.thumbnail}"
                alt="${item.volumeInfo.title}">
            </div>
            <div class="card__content">
              <div class="card__title">Title: ${ item.volumeInfo.title}</div>
              <div class="card__text" v-if="getAuthorNames(item.volumeInfo.authors) != ''"> Author:</div>
              <p class="card__text" >
                Subtitle: ${ item.volumeInfo.subtitle}</p>
              <a target="_blank" href="${item.volumeInfo.infoLink}">
                <button class="btn btn--block card__btn">View more about this book</button>
              </a>
            </div>
          </div>
        </div>`;
      });
      document.querySelector('#results').innerHTML = html;
    },

    // Searches for books and returns a promise that resolves a JSON list
    searchForBooks: function () {
      var self = this
      if (this.query == "") {
        alert("Enter Search Query.")
        return
      }
      this.processing = true
      this.items = []
      axios.get("https://www.googleapis.com/books/v1/volumes?q=" + this.query)
        .then(function (response) {
          if (response.data.totalItems > 0) {
            self.items = response.data.items
            self.processing = false;
            self.render(self.items);
          } else {
            self.processing = false;
            self.showError('<span id="noresult"> No items found</span>')
          };

        }).catch(function (error) {
          self.processing = false
          self.showError(error.response.data.error.message);
        })
    }
  }
})