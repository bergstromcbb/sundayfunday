
var app = new Vue({
  el: '#app',
  data: {
    query: '',
    PageTitle:'I am title',
    errorMessage:'Required Book not found',
    items: [],
    processing: false
  },
  methods: {
    showError(msg) {
      const html = '<li><p class="error">${msg}</p></li>';
      document.querySelector('#results').innerHTML = html;
    },
    render() {
      //return '<div id="foo">bar</div>';
      // return createElement('h1', this.PageTitle);
    },
    getAuthorNames(authors) {
      if (authors)
        return authors.join(", ")
      return ""
    },
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
          self.processing = false
        }).catch(function () {
          self.processing = false
        })
    }
  }
})