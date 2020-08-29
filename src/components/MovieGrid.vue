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
            ActiveIndex: 1
        }
    },
    methods: {
      viewMovie(newMovie) {
        const newInfoMovie = {
                movieTitle: newMovie.title,
                moviePosterPath: newMovie.backdrop_path,
                movieOverview: newMovie.overview,
            }
          this.$store.dispatch('setInfoMovie', newInfoMovie) 
      },
      movieClicked () {
          console.log('click event triggered')
      }
    },
    props: ['movies'],
    components: {
        appMovie: Movie
    },
    created () {
        // ONE GENRE
            axios.get('https://api.themoviedb.org/3/discover/movie?with_genres=28&api_key=889abe3247f9348a43ba33d2c9270735&language=en-US').then(resp => {
                resp.data.results.forEach(movie => {   
                    this.movies.push(movie)
                });
            })
        
    },
    mounted () {
        window.addEventListener("keyup", (e) => {
            
                let keyCode = e.keyCode;

                console.log(this.ActiveIndex);
                if(keyCode === 39) {
                    console.log("Moved right");
                    this.ActiveIndex += 1
                    console.log(this.ActiveIndex)
                }
                if(keyCode === 37) {
                    console.log("Moved left");
                    this.ActiveIndex -= 1
                    console.log(this.ActiveIndex)
                }
                if(keyCode === 40) {
                    console.log("Moved down");
                    this.ActiveIndex += 5
                    console.log(this.ActiveIndex)
                }
                if(keyCode === 38) {
                    console.log("Moved up");
                    this.ActiveIndex -= 5
                    console.log(this.ActiveIndex)
                }
                if(keyCode === 13) {
                    console.log("Enter");
                    console.log(this.ActiveIndex)
                    // this.$refs.myMovie.$el.click()
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
    border: 3px solid rgb(0, 255, 21);
}


</style>