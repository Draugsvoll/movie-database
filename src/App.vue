<template>
  <div id="app">
    <app-header></app-header>
    <div class="container">
        <app-genrelist  ></app-genrelist>
        <app-moviegrid ></app-moviegrid>
        <app-infopage  v-bind:infoMovie="infoMovie" ></app-infopage>
    </div>
  </div>
</template>


<script>
import GenreList from './components/GenreList'
import MovieGrid from './components/MovieGrid'
import InfoPage from './components/InfoPage'
import Header from './components/Header'
// import axios from 'axios'

export default {
  data () {
    return {
      infoMovie: '',
    }
  },
  name: 'App',
  components: {
    appGenrelist: GenreList,
    appMoviegrid: MovieGrid,
    appInfopage: InfoPage,
    appHeader: Header
  },
  methods: {

  },
  created() {

            // // *FETCH ALL GENRE 
            // axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=889abe3247f9348a43ba33d2c9270735&language=en-US').then(resp => {
            //     console.log(resp)
            // })

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

</style>
