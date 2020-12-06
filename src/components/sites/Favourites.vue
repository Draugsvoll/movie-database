<template>
    <div class="container">
        <app-header></app-header>
        <app-moviegrid></app-moviegrid>
    </div>
</template>


<script>
import Axios from 'axios'
import MovieGrid from '../MovieGrid'
import Header from '../Header'

export default {
    components: {
    appMoviegrid: MovieGrid,
    appHeader: Header,
  },
  created () {
    Axios.get(`https://netflix-97535-default-rtdb.europe-west1.firebasedatabase.app/movies.json`).then(resp => {
              resp = resp.data
              const favMovies = []
              for (let key in resp){
                favMovies.push(resp[key])
              }
              this.$store.dispatch('fetchFavourites', favMovies)
            })
  }    
}
</script>


<style scoped>
.container {
  padding:0;
}
</style>