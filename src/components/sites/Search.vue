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
        <input v-model="searchTerm" type="text" placeholder="Movie,tv, actor.." value=''>
        <button class="search" @click="search(searchTerm)">Search</button >
        </div>
      </div>

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
      searchResults: []
    }
  },
  components: {
    appMoviegrid: MovieGrid,
    appHeader: Header
  },
  methods: {
      search(searchTerm) {
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
        },
        searchTv () {
          this.searchType = 'tv'
          console.log(this.searchType)
          this.$router.push('/search?type=tv')
        }
  },
  created () {
    //  axios.get(`https://api.themoviedb.org/3/movie/557?api_key=889abe3247f9348a43ba33d2c9270735&language=en-US&append_to_response=videos,images`).then(resp => {
    //             console.log('response',resp)
    //         })
  }
 
}
</script>

<style css >
button {
  outline:none;
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
}
.upper-btn {
  margin:auto;
  margin-top:2rem;
  display: flex;
  color:grey;
}
.movie-btn, .tv-btn {
  padding:5px;
  margin:0 0.5rem;
  font-size: 1.2rem;
}
.searchField {
  display: inline-flex;
  justify-content: center;
  margin-top:0.5rem;
}
.search {
  width:75px;
  height:2.4rem;
  margin-left:5px;
}
</style>
