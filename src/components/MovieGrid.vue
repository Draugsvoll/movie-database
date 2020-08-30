<template>
    <div id="movie-grid">
        <app-movie  v-for="(movie, index) in movies" :movie="movie" :key="movie.id"  
                    v-on:info-movie="viewMovie" :movies="movies"
                    v-bind:class="{ active: index===ActiveIndex }"
                                                               ></app-movie>
    </div>
</template>



<script>
import Movie from './Movie'
import axios from 'axios'
import {mapGetters} from 'vuex'

export default {
    data () {
        return {
            // index to keep track of 'focused' element with keyboard
            ActiveIndex: 0,
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
      }
    },
    components: {
        appMovie: Movie,
    },
    computed: {
        ...mapGetters({
            gridKeyboard: 'grid_keyboard'
        })
    },
    created () {
            // Fetches 'Action' genre as a default 
            axios.get('https://api.themoviedb.org/3/discover/movie?with_genres=28&api_key=889abe3247f9348a43ba33d2c9270735&language=en-US').then(resp => {
                resp.data.results.forEach(movie => {   
                    this.movies.push(movie)
                });
            })
        
    },
    // Listens to keyboard input when mounted
    mounted() {

                window.addEventListener("keyup", (e) => {

                // only listen to input if 'movie-grid-keyboard' is active    
                if(this.gridKeyboard == true) {
                    let keyCode = e.keyCode;

                    // right arrow
                    if(keyCode === 39) {
                        if ( this.ActiveIndex < 19 ) {
                        console.log("Moved right");
                        this.ActiveIndex += 1
                        console.log(this.ActiveIndex)
                        }
                    }

                    // left arrow
                    if(keyCode === 37) {
                        if (this.ActiveIndex > 0) {
                        console.log("Moved left");
                        this.ActiveIndex -= 1
                        console.log(this.ActiveIndex)
                        }
                    }

                    // down arrow
                    if(keyCode === 40) {
                        if ( this.ActiveIndex < 14) {
                        console.log("Moved down");
                        this.ActiveIndex += 5
                        console.log(this.ActiveIndex)
                        window.scrollBy(0,200)
                        }
                    }

                    // up arrow
                    if(keyCode === 38) {
                        if (this.ActiveIndex > 4) {
                        console.log("Moved up");
                        this.ActiveIndex -= 5
                        console.log(this.ActiveIndex)
                        window.scrollBy(0,-200)
                        }
                    }

                    // enter key
                    if(keyCode === 13) {
                        const movies = this.movies
                        console.log("Enter");
                        console.log(this.ActiveIndex)
                        const newMovie = movies[this.ActiveIndex]
                        this.viewMovie(newMovie)
                        this.$store.dispatch('activate_infopage_keyboard')
                    }

                    // B key (back)
                    if(keyCode === 66) {
                        this.$store.dispatch('activate_genre_keyboard')
                    }
                }
        });
    }
}
</script>



<style scoped>
#movie-grid {
    Width:80%;
    margin-left:20%;
    height:100%;
    margin-top: 1%;
    max-width:1400px !important;
    min-width: 1370px !important;
}

.active {
    border: 2px solid rgb(13, 153, 247);
}
</style>