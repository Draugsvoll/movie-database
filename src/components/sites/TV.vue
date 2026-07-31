<template>
  <div id="outer-container">
    <app-header></app-header>
    <div class="container">
        <app-genrelist  ></app-genrelist>
        <app-moviegrid ></app-moviegrid>
    </div>
  </div>
</template>


<script>
import GenreList from '../GenreList'
import MovieGrid from '../MovieGrid'
import Header from '../Header'

export default {
  data () {
    return {
      infoMovie: '',
    }
  },
  components: {
    appGenrelist: GenreList,
    appMoviegrid: MovieGrid,
    appHeader: Header
  },
  methods: {

  },
 
}
</script>

<style scoped>
.container {
  display: flex;
  padding-top: calc(var(--header-height, 4rem) + var(--header-gap, 0.5rem));
  min-height: 100vh;
}
#outer-container {
  min-height: 100vh;
  background: var(--background-color);
}
</style>
