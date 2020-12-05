<template>

    <div id="movie-grid">
        
        <!-- btn row  -->
        <div v-if=" currentRoute != '/search' " class="buttons">
            <button @click="prevPage" ><div class="arrow fas fa-arrow-left"></div></button> <span class="page">{{ page }} </span> <button @click="nextPage"><div class=" arrow fas fa-arrow-right"></div></button>
        </div>

        <div class="movie-container">
            <!-- MOVIE GRID  -->
            <app-movie  v-for="(movie) in movies" v-bind:movie="movie" :key="movie.id"  
                        v-on:info-movie="viewMovie" 
            ></app-movie>       
        </div>
        
        <!-- btn row  -->
        <div v-if=" currentRoute != '/search' && movies != '' " class="buttons">
            <button @click="prevPage" ><div class="arrow fas fa-arrow-left"></div></button> <span class="page">{{ page }} </span>  <button @click="nextPage"><div class="arrow fas fa-arrow-right"></div></button>
        </div>
        <br>

    </div>
</template>


<script>
import Movie from './Movie'
import axios from 'axios'

export default {
    data () {
        return {
            currentRoute: this.$route.path
        }
    },
  
    methods: {
       // sends a movie to infopage (details) 
      viewMovie(newMovie) {
          console.log('movie: ', newMovie)
        const newInfoMovie = {
                movieTitle: newMovie.title,
                movieTitle2: newMovie.name,
                moviePosterPath: newMovie.backdrop_path,
                moviePosterPath2: newMovie.poster_path,
                movieOverview: newMovie.overview,
                movieVote: newMovie.vote_average,
                movieRelease: newMovie.release_date,
                movieId: newMovie.id,

            }
          this.$store.dispatch('setInfoMovie', newInfoMovie) 
      },

        // NEXT PAGE
      nextPage () {
          var page = this.page
          page++
          if ( this.currentRoute == '/movies') {
            this.$store.dispatch('nextPage', page)
          } else {
            this.$store.dispatch('nextPageTv', page)
          }
      },

        // PREV PAGE
      prevPage () {
          var page = this.page
          if (page > 1) {
                page--
                if ( this.currentRoute == '/movies') {
                    this.$store.dispatch('prevPage', page)
                }
                else {
                    this.$store.dispatch('prevPageTv', page)
                }
          }
      },
    },
    components: {
        appMovie: Movie,
    },
    computed: {     
        movies() {
            if ( this.currentRoute == '/movies' ) {
               return this.$store.getters.movies
            }
            else if ( this.currentRoute == '/tv' ) {
               return this.$store.getters.tv
            }
            else if ( this.currentRoute == '/search') {
               return this.$store.getters.searchResult
            }
            else {
               return this.$store.getters.favouriteMovies
            }
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
    /* border: 1px solid red; */
}
.movie-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
#movie-grid {
    max-width:80%;
    margin-left:200px;
    height:100%;
}
.active {
    border: 2px solid rgb(13, 153, 247);
}
.buttons {
    display: flex;
    justify-content: center;
    text-align: center;
}
button {
    width: 3rem;
    height:2rem;
    background: rgba(0,0,0,0);
    outline: none;
    border:none;
    color:white;
    cursor:pointer;
    margin:8px;
    margin-bottom:10px;
    margin-right:12px;
}
.arrow {
    margin:8px;
}
.page {
    font-size: 1.1rem;
    margin: auto 0;
}


@media only screen and (max-width: 524px) {
    #movie-grid {
        margin-top:62px;
    }
}

@media only screen and (max-width: 440px) {
    #movie-grid {
        margin-left:150px;
    }
}

</style>