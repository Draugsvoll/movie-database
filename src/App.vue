<template>
  <!-- <div id="app">
    <app-header></app-header>
    <div class="container" @jump-window="infopageWindow"  >
      <app-leftmenu  v-on:fetch-genre="fetchGenre"></app-leftmenu>
      <app-moviegrid :movies="movies" v-on:jump-window="infopageWindow"
                     v-bind:moviegridKeyboard="moviegridKeyboard"
                                                    ></app-moviegrid>
      <app-infopage  v-bind:infoMovie="infoMovie" 
                     v-bind:infopageKeyboard="infopageKeyboard"
                     @activate-grid-keyboard="activateGridKeyboard"></app-infopage>
    </div>
  </div> -->


<div id="app">
    <app-header></app-header>
    <div class="container" @jump-window="infopageWindow"  >
      <app-leftmenu  v-on:fetch-genre="fetchGenre"></app-leftmenu>
      <app-moviegrid :movies="movies" v-on:jump-window="infopageWindow"
                      ></app-moviegrid>
      <app-infopage  v-bind:infoMovie="infoMovie" 
                     @activate-grid-keyboard="activateGridKeyboard"></app-infopage>
    </div>
  </div>
</template>



<script>
import LeftMenu from './components/LeftMenu'
import MovieGrid from './components/MovieGrid'
import InfoPage from './components/InfoPage'
import Header from './components/Header'
import axios from 'axios'


export default {
  data () {
    return {
      movies: [],
      infoMovie: '',
      // infopageKeyboard: false,
      // moviegridKeyboard: true
    }
  },
  name: 'App',
  components: {
    appLeftmenu: LeftMenu,
    appMoviegrid: MovieGrid,
    appInfopage: InfoPage,
    appHeader: Header
  },
  methods: {
      // FETCH ONE GENRE
      fetchGenre(genre) {
        this.movies = []
        axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=${genre}&api_key=889abe3247f9348a43ba33d2c9270735&language=en-US`).then(resp => {
                  resp.data.results.forEach(movie => {   
                      this.movies.push(movie)
                  });
              })
      console.log(this.movies)
      },
      // jump to infopage's keyboard
      infopageWindow () {
        this.infopageKeyboard = true
        console.log('infopage keyboard: ', this.infopageKeyboard)
      },
     // jump to movie-grid keyboard
      activateGridKeyboard() {
        this.moviegridKeyboard = true
        console.log('movie-grid keyboard: ', this.moviegridKeyboard)
      }
  },
  created() {
            // force refresh at top -> keyboard focused element always within screen
            window.onbeforeunload = function () {
            window.scrollTo(0, 0);
            }
            // // FETCH ALL GENRE 
            // axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=889abe3247f9348a43ba33d2c9270735&language=en-US').then(resp => {
            //     console.log(resp)
            // }),
            // // FETCH ACTION
            // axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=28&api_key=889abe3247f9348a43ba33d2c9270735&language=en-US`).then(resp => {
            //     console.log(resp)
            // })
  }
}
</script>


<style >
.container {
  display: flex;
    padding-top:101px;
}

body, html {
  min-height: 100%;
  margin:0;
  padding:0;
  background: rgb(33, 33, 34);
  color:white;
  font-family: sans-serif;
}





</style>
