<template>
  <div id="outer-container">
    <app-header></app-header>

     
    <div class="container">
      <!-- search field  -->
      <div class="upper-btn">
          <div :class="{ activeBtn : searchType == 'movie'}" class="select-btn" @click="searchMovie">
            <div :class="{ pointer : searchType == 'movie' }" class="fas fa-chevron-right arrow1"></div> Movies
          </div>
          <div :class="{ activeBtn : searchType === 'tv'}" class="select-btn" @click="searchTv">
            <div :class="{ pointer : searchType == 'tv' }" class="fas fa-chevron-right arrow2"></div> Series
          </div>
          <div  class="empty" @click="searchTv">asdsa</div>
      </div>
      <div class="searchField">
        <div class="search-bar">
        <input v-model="searchTerm" ref="search" type="text" placeholder=" Search" value='' autofocus>
        <button class="search" @click="search(searchTerm)">Search</button >
        </div>
      </div>

      <div class="query"> {{ query }} </div>

      <!-- movie grid  -->
      <div class="movie-container">
        <app-moviegrid ></app-moviegrid>
      </div>

    </div>
  </div>
</template>


<script scoped>
import axios from 'axios'
import MovieGrid from '../MovieGrid'
import Header from '../Header'


export default {
  data () {
    return {
      infoMovie: '',
      searchTerm: '',
      searchType: 'movie',
      searchResults: [],
      query: 'Popular',
      path: this.$route.query.type,
      active: 'movies'
    }
  },
  components: {
    appMoviegrid: MovieGrid,
    appHeader: Header,
    // appFooter: Footer
  },
  methods: {
      search(searchTerm) {
            this.query = searchTerm
            var searchResults = []
            axios.get(`https://api.themoviedb.org/3/search/${this.searchType}?api_key=889abe3247f9348a43ba33d2c9270735&language=en-US&page=1&include_adult=false&query=${searchTerm}`).then(resp => {
                resp = resp.data.results
                resp.forEach( movie => {
                searchResults.push(movie)
                });
                this.$store.dispatch('searchResults', searchResults )
            })
        },
        searchMovie () {
          this.searchType = 'movie'
          if ( this.$route.query.type == 'tv' ) {
            this.$router.push('/search?type=movie')
          }
          axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=889abe3247f9348a43ba33d2c9270735&language=en-US&page=1`).then(resp => {
                this.$store.dispatch('searchResults', resp.data.results )
            })
        },
        searchTv () {
          this.searchType = 'tv'
          if ( this.$route.query.type == 'movie' ) {
            this.$router.push('/search?type=tv')
          }
          axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=889abe3247f9348a43ba33d2c9270735&language=en-US&page=1`).then(resp => {
                this.$store.dispatch('searchResults', resp.data.results )
            })
        }
  },
  created () {
    const ref = this
    var searchTerm = this.searchTerm
    window.addEventListener('keyup', function(event) {
          if (event.keyCode === 13) { 
            ref.search(ref.searchTerm)
          }
        });
     axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=889abe3247f9348a43ba33d2c9270735&language=en-US&page=1`).then(resp => {
                this.$store.dispatch('searchResults', resp.data.results )
            })
  }
 
}
</script>

<style scoped>
.query {
  margin:1.5rem 0;
  visibility: hidden;
}
.pointer {
  color:rgb(41, 171, 194) !important;
}
.arrow1, .arrow2 {
  color:rgba(0,0,0,0);
}
.movie-container {
  margin-left:-80px;
}
button {
  outline:none;
  background: rgba(0,0,0,0);
  color: white;
  font-size: 1rem;
  cursor:pointer;
  border:1px solid rgb(41, 171, 194);
}
button:hover {
  color:rgb(166, 223, 233);
}
.empty {
  visibility: hidden;
}
.activeBtn {
  color:white !important;
}
.container {
  display: flex;
  flex-direction: column;
  padding-top:100px;
}
body, html {
  min-height: 100%;
  margin:0;
  padding:0;
  background: rgb(0, 0, 0);
  color:white;
  font-family: sans-serif;
}
input {
  width:300px;
  height:2rem;
  margin-top:2rem;
  font-size: 1.2rem;
  background: rgba(0,0,0,0);
  border:none;
  color: white;
  outline:none;
  border-bottom:1.5px solid rgb(41, 171, 194);
}
::marker {
  color:purple;
}
::placeholder {
  color: rgb(84, 84, 84);

}
.upper-btn {
  margin:2rem auto;
  display: flex;
  color:grey;
}
.upper-btn:hover {
  color:white;
}
.select-btn {
  margin:0 0rem;
  cursor:pointer;
  color:grey;
  font-size: 1.2rem;
  padding:0.5rem
}
.searchField {
  display: inline-flex;
  justify-content: center;
}
.search {
  width:78px;
  height:2.2rem;
  margin-left:20px;
  border-radius: 5px;
}
@media only screen and (max-width: 470px) {
  input {
    width:250px;
  }
}
@media only screen and (max-width: 371px) {
  input {
    margin-left:10%;
  }
  .search {
    margin:1rem auto;
    margin-left:35%;
  }
}
@media only screen and (max-width: 500px) {
  img {
    max-width:250px;
  }
}
@media only screen and (max-width: 655px) {
  .movie-container {
    margin-left:-30%;
  }
}
@media only screen and (max-width: 525px) {
  .upper-btn {
    padding-top:8rem;
  }
}
</style>

