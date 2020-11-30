<template>
    <div id="movie-grid">
        <div class="buttons">
            <button  @click="prevPage" >Prev.</button> Page {{ page }}  <button @click="nextPage">Next</button>
        </div>
        <app-movie  v-for="(movie) in movies" v-bind:movie="movie" :key="movie.id"  
                    v-on:info-movie="viewMovie" 
        ></app-movie>
        <div class="buttons">
            <button @click="prevPage" >Prev.</button> Page {{ page }}  <button @click="nextPage">Next</button>
        </div>
    </div>
</template>


<script>
import Movie from './Movie'

export default {
    data () {
        return {
        }
    },
  
    methods: {
       // *sends a movie to infopage (details) 
      viewMovie(newMovie) {
        const newInfoMovie = {
                movieTitle: newMovie.title,
                moviePosterPath: newMovie.backdrop_path,
                movieOverview: newMovie.overview,
                movieVote: newMovie.vote_average,
                movieRelease: newMovie.release_date,
            }
          this.$store.dispatch('setInfoMovie', newInfoMovie) 
      },

        // *NEXT PAGE
      nextPage () {
          var page = this.page
          page++
          this.$store.dispatch('nextPage', page)
      },

        // *PREV PAGE
      prevPage () {
          var page = this.page
          if (page > 1) {
                page--
                this.$store.dispatch('prevPage', page)
          }
      },
    },
    components: {
        appMovie: Movie,
    },
    computed: {     
        movies() {
            return this.$store.getters.movies
        },
        page () {
            return this.$store.getters.currentPage
        }
    },
    created () {
            // // Fetches 'Action' genre as a default 
            // axios.get('https://api.themoviedb.org/3/discover/movie?with_genres=28&api_key=889abe3247f9348a43ba33d2c9270735&language=en-US').then(resp => {
            //     resp.data.results.forEach(movie => {   
            //         this.movies.push(movie)
            //     });
            // })
    },
}
</script>



<style scoped>
* {
}
#movie-grid {
    Width:80%;
    margin-left:20%;
    height:100%;
    margin-top: 1%;
}
.active {
    border: 2px solid rgb(13, 153, 247);
}
.buttons {
    display: flex;
    width:95%;
    justify-content: center;
    /* border:1px solid white; */
}
</style>