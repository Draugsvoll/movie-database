<template>

    <div id="movie-grid">
        <!-- btn row  -->
        <div v-if=" currentRoute != '/favourites' && currentRoute != '/search' " class="buttons">
            <button @click="prevPage" ><div class="arrow fas fa-arrow-left"></div></button> <span class="page">{{ page }} / 20</span> <button @click="nextPage"><div class=" arrow fas fa-arrow-right"></div></button>
        </div>

        <div class="movie-container">
            <!-- MOVIE GRID  -->
            <app-movie  v-for="(movie, index) in movies" v-bind:movie="movie" :key="movie.id+index"  
                        v-on:info-movie="viewMovie" 
            ></app-movie>       
        </div>
        
       <!-- btn row  -->
        <div v-if=" currentRoute != '/search' && currentRoute != '/favourites' && movies != '' " class="buttons">
            <button @click="prevPage" ><div class="arrow fas fa-arrow-left"></div></button> <span class="page">{{ page }} / 20</span>  <button @click="nextPage"><div class="arrow fas fa-arrow-right"></div></button>
        </div>
        <br>

        <app-footer></app-footer>

    </div>
</template>


<script>
import Movie from './Movie'
import axios from 'axios'
import Footer from './Footer'

export default {
    data () {
        return {
            currentRoute: this.$route.path
        }
    },
    methods: {
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
        appFooter: Footer,
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

.movie-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    min-height:60vh;
    margin-top:-0.95rem;
}
#movie-grid {
    width:80%;
    margin-left:12.5rem;
    height:100%;
}
.active {
    border: 2px solid rgb(13, 153, 247);
}
.buttons {
    display: flex;
    justify-content: center;
    text-align: center;
    margin-bottom:1.25rem;
}
button {
    width: 3rem;
    height:2rem;
    background: rgba(0,0,0,0);
    outline: none;
    border:none;
    color:var(--white-font);
    cursor:pointer;
    margin:0.5rem;
    margin-bottom:0.75rem;
    margin-right:0.12rem;
    margin-left:0.12rem;
    font-size: 1.12rem;
}
.arrow {
    margin:0.5rem;
    font-size:1.12rem;
    transition: 0.25s;
}
.arrow:hover {
    color: var(--primary-color);
}
.page {
    font-size: 0.97rem;
    margin: auto 0.95rem;
    color: var(--white-font);
}


@media only screen and (max-width: 524px) {
    #movie-grid {
        margin-top:85px;
    }
}

@media only screen and (max-width: 440px) {
    #movie-grid {
        margin-left:150px;
    }
}

</style>