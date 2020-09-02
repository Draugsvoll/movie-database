<template>
    <div id="movie-grid">
        <p><button  >Prev.</button> Page  <button @click="nextPage">Next</button></p>
        <app-movie  v-for="(movie) in movies" :movie="movie" :key="movie.id"  
                    v-on:info-movie="viewMovie" :movies="movies"
                                                               ></app-movie>
    </div>
</template>


<script>
import Movie from './Movie'
import axios from 'axios'

export default {
    data () {
        return {
            
        }
    },
    // movie list sent from App.vue
    props:['movies'],
    methods: {

       // sends a movie to infopage (details) 
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
      nextPage() {
        
      }
    },
    components: {
        appMovie: Movie,
    },
    created () {
            // Fetches 'Action' genre as a default 
            axios.get('https://api.themoviedb.org/3/discover/movie?with_genres=28&api_key=889abe3247f9348a43ba33d2c9270735&language=en-US').then(resp => {
                resp.data.results.forEach(movie => {   
                    this.movies.push(movie)
                });
            })

    },
}
</script>



<style scoped>
#movie-grid {
    Width:80%;
    margin-left:20%;
    height:100%;
    margin-top: 1%;
    
}

.active {
    border: 2px solid rgb(13, 153, 247);
}
</style>