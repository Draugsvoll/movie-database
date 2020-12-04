<template>
  <div id="outer-container">
    <app-header></app-header>

     
    <div class="container">
      <!-- search field  -->
      <div class="upper-btn">
          <div :class="{ activeBtn : searchType == 'movie'}" class="movie-btn" @click="searchMovie">Movies</div>
          <div :class="{ activeBtn : searchType === 'tv'}" class="tv-btn" @click="searchTv">Series</div>
      </div>
      <div class="searchField">
        <div class="search-bar">
        <input v-model="searchTerm" type="text" placeholder="Movie, tv, actor.." value=''>
        <button class="search" @click="search(searchTerm)">Search</button >
        </div>
      </div>

      <div class="query"> {{ query }} </div>
      <!-- movie grid  -->
      <app-moviegrid ></app-moviegrid>
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
      path: this.$route.query.type
    }
  },
  components: {
    appMoviegrid: MovieGrid,
    appHeader: Header
  },
  methods: {
      search(searchTerm) {
            this.query = searchTerm
            var searchResults = []
            axios.get(`https://api.themoviedb.org/3/search/${this.searchType}?api_key=889abe3247f9348a43ba33d2c9270735&language=en-US&page=1&include_adult=false&query=${searchTerm}`).then(resp => {
                console.log(resp)
                resp = resp.data.results
                resp.forEach( movie => {
                   
                    searchResults.push(movie)
                });
                this.$store.dispatch('searchResults', searchResults )
            })
        },
        searchMovie () {
          this.searchType = 'movie'
          console.log(this.searchType)
          this.$router.push('/search?type=movie')
          axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=889abe3247f9348a43ba33d2c9270735&language=en-US&page=1`).then(resp => {
                console.log('response',resp)
                this.$store.dispatch('searchResults', resp.data.results )
            })
        },
        searchTv () {
          this.searchType = 'tv'
          console.log(this.searchType)
          this.$router.push('/search?type=tv')
          axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=889abe3247f9348a43ba33d2c9270735&language=en-US&page=1`).then(resp => {
                console.log('response',resp)
                this.$store.dispatch('searchResults', resp.data.results )
            })
        }
  },
  created () {
     axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=889abe3247f9348a43ba33d2c9270735&language=en-US&page=1`).then(resp => {
                console.log('response',resp)
                this.$store.dispatch('searchResults', resp.data.results )
            })
  }
 
}
</script>

<style css >
.query {
  margin-top:2rem;
  margin-left:15%;
}
button {
  outline:none;
  background: rgba(0,0,0,0);
  color: white;
  font-size: 1.1rem;
  border:1px solid rgb(255, 196, 0);
}
.activeBtn {
  border-bottom:1px solid white;
  color:white;
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
  width:400px;
  height:2rem;
  margin-top:1rem;
  font-size: 1.3rem;
  background: rgba(0,0,0,0.5);
  border:none;
  color: white;
  outline:none;
  border-bottom:1.5px solid rgb(255, 196, 0);
}
::marker {
  color:purple;
}
::placeholder {
  color: rgb(118, 116, 116);

}
.upper-btn {
  margin:auto;
  margin-top:3rem;
  display: flex;
  color:grey;
}
.movie-btn, .tv-btn {
  margin:0 1rem;
  cursor:pointer;
  font-size: 1.2rem;
}
.searchField {
  display: inline-flex;
  justify-content: center;
  margin-top:0.5rem;
}
.search {
  width:85px;
  height:2.5rem;
  margin-left:10px;
  border-radius: 5px;
}
</style>
