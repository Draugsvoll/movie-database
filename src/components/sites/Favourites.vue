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
              console.log(resp.data)
              const movies = resp.data
              console.log(movies.length())
            })
  }    
}
</script>


<style scoped>
.container {
  padding:0;
}
</style>