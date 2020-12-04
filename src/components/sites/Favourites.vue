<template>
    <div class="container">
        <app-moviegrid></app-moviegrid>
    </div>
</template>


<script>
import Axios from 'axios'
import MovieGrid from '../MovieGrid'

export default {
     components: {
    appMoviegrid: MovieGrid,
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

</style>