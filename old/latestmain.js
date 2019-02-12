var app = new Vue({
  el: '#app',
  data: {
      query: '',
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
        const html = `<p class="error">${error.message}</p>`;
        document.querySelector('#errors').innerHTML = html;
      },

      // Generate HTML and sets #results's contents to it
       render(items) {
        var html = "";
        items.forEach(function(item) {
  
          html += `<div class="cards__item flex-item">
          <div class="card">
            <div class="card__image">
              <img  src="${item.volumeInfo.imageLinks.thumbnail}"
                alt="${item.volumeInfo.title}">
            </div>
            <div class="card__content">
              <div class="card__title">Title: ${ item.volumeInfo.title }</div>
              <div class="card__text"> Author:</div>
              <p class="card__text">
                Subtitle: ${ item.volumeInfo.subtitle }</p>
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
                  self.items = response.data.items
                  self.processing = false;
                  self.render(self.items);
              }).catch(function (error) {
                  self.processing = false
                  self.showError(error.response.data.error);
              })
      }
  }
})