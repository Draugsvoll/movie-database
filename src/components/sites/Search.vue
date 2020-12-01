<template>
  <div id="outer-container">
    <app-header></app-header>

     
    <div class="container">
      <!-- search field  -->
      <div class="searchField">
        <input v-model="searchTerm" type="text" placeholder="Movie,tv, actor..">
        <button class="search" @click="search(searchTerm)">Search</button >
      </div>

      <!-- movie grid  -->
      <app-moviegrid ></app-moviegrid>
      <app-infopage  v-bind:infoMovie="infoMovie" ></app-infopage>
    </div>

  </div>
</template>


<script>
import axios from 'axios'
import MovieGrid from '../MovieGrid'
import InfoPage from './InfoPage'
import Header from '../Header'

export default {
  data () {
    return {
      infoMovie: '',
      searchTerm: '',
    }
  },
  components: {
    appMoviegrid: MovieGrid,
    appInfopage: InfoPage,
    appHeader: Header
  },
  methods: {
      search(searchTerm) {
            var searchResults = []
            axios.get(`https://api.themoviedb.org/3/search/movie?api_key=889abe3247f9348a43ba33d2c9270735&language=en-US&page=1&include_adult=false&query=${searchTerm}`).then(resp => {
                console.log(resp)
                resp = resp.data.results
                resp.forEach( movie => {
                    const newMovie = { title: movie.original_title, id: movie.id, overview: movie.overview, popularity: movie.popularity, 
                                        poster_path: movie.poster_path, vote_average: movie.vote_average, release_date: movie.release_date }
                    searchResults.push(newMovie)
                });
                this.$store.dispatch('searchResults', searchResults )
            })
        },
  },
  created () {
     axios.get(`https://api.themoviedb.org/3/movie/557?api_key=889abe3247f9348a43ba33d2c9270735&language=en-US&append_to_response=videos,images`).then(resp => {
                console.log('wepigjeroigj',resp)
            })
  }
 
}
</script>

<style >
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
.searchField {
  display: inline-flex;
  justify-content: center;
}
.search {
  width:75px;
  height:2.4rem;
  margin-left:5px;
}
</style>
