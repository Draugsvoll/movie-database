<template>
    <div id="movie-grid">
        <app-movie v-for="(movie, index) in movies" :movie="movie" :key="movie.id"  v-on:info-movie="viewMovie" :movies="movies"
                    :class="{ active2: index===ActiveIndex }"
                                           ></app-movie>
    </div>
</template>






<script>
import Movie from './Movie'
import axios from 'axios'

export default {
    data () {
        return {
            // index for the movie-grid -> used for tracking 'focused' element
            ActiveIndex: 0
        }
    },
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
    props: ['movies'],
    components: {
        appMovie: Movie
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
                let keyCode = e.keyCode;

                // right arrow
                console.log(this.ActiveIndex);
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
                    window.scrollBy(0,360)
                    }
                    
                }
                // up arrow
                if(keyCode === 38) {
                    if (this.ActiveIndex > 4) {
                    console.log("Moved up");
                    this.ActiveIndex -= 5
                    console.log(this.ActiveIndex)
                    window.scrollBy(0,-360)
                    }
                    
                }
                // enter key
                if(keyCode === 13) {
                    const movies = this.movies
                    console.log("Enter");
                    console.log(this.ActiveIndex)
                    const newMovie = movies[this.ActiveIndex]
                    console.log(newMovie)
                    this.viewMovie(newMovie)
                    this.$emit('jump-window')
                }
                // B key (back)
                if(keyCode === 66) {
                    console.log("Back button");
                    console.log(this.ActiveIndex)
                    const movie = []
                    // sending empty movie in 'viewMovie' reacts with closing the window (infopage div)
                    this.viewMovie(movie)
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
}

.active2 {
    border: 2px solid rgb(13, 153, 247);
}


</style>