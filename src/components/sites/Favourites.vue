<template>
    <div class="container">
        <app-moviegrid></app-moviegrid>
    </div>
</template>


<script>
import MovieGrid from '../MovieGrid'

export default {
     components: {
    appMoviegrid: MovieGrid,
  },
  created () {
    console.log('fetching fav store: ', this.$store.getters.favouriteMovies)
  }    
}
</script>


<style scoped>

</style>