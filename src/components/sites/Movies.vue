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
  
}

.box {
  display: flex;
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
