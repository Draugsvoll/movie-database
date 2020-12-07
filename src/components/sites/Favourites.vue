<template>
  <div id="outer-container">
    <app-header></app-header>

    <div class="container">

      <!-- search field  -->
      <div class="upper-btn">
          <div :class="{ activeBtn : type == 'movie'}" class="select-btn" @click="viewMovies">
            <div :class="{ pointer : type == 'movie' }" class="fas fa-chevron-right arrow1"></div> Movies
          </div>
          <div :class="{ activeBtn : type === 'tv'}" class="select-btn" @click="viewTv">
            <div :class="{ pointer : type == 'tv' }" class="fas fa-chevron-right arrow2"></div> Series
          </div>
          <div  class="empty" >asdsa</div>
      </div>

      <!-- movie grid  -->
      <div class="movie-container">
        <app-moviegrid ></app-moviegrid>
      </div>

    </div>
  </div>
</template>


<script>
import Axios from 'axios'
import MovieGrid from '../MovieGrid'
import Header from '../Header'

export default {
  data () {
    return {
      type: this.$route.query.type,
    }
  },
    components: {
    appMoviegrid: MovieGrid,
    appHeader: Header,
  },
  methods: {
    viewMovies () {
      if ( this.type != 'movie' ) {
        this.$router.push('/favourites?type=movie')
        this.type = 'movie'
      }
    },
    viewTv () {
      if ( this.type != 'tv' ) {
        this.$router.push('/favourites?type=tv')
        this.type = 'tv'
      }
    }
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
.query {
  margin:1.5rem auto;
}
.pointer {
  color:yellow !important;
}
.arrow1, .arrow2 {
  color:rgba(0,0,0,0);
}
.movie-container {
  margin-left:-80px;
}
.empty {
  visibility: hidden;
}
.activeBtn {
  color:white !important;
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
.upper-btn {
  margin:auto;
  margin-top:3rem;
  display: flex;
  color:grey;
}
.upper-btn:hover {
  color:white;
}
.select-btn {
  margin:0 0rem;
  cursor:pointer;
  color:grey;
  font-size: 1.2rem;
  padding:0.5rem
}
@media only screen and (max-width: 500px) {
  img {
    max-width:250px;
  }
}
@media only screen and (max-width: 655px) {
  .movie-container {
    margin-left:-30%;
  }
}
@media only screen and (max-width: 525px) {
  .upper-btn {
    padding-top:8rem;
  }
}
</style>