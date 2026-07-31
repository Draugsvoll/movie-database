<template>

    <div id="movie-grid" ref="movieGrid">
        <!-- category + pagination -->
        <div v-if=" currentRoute != '/favourites' && currentRoute != '/search' " class="grid-toolbar">
            <div class="category-block">
                <span class="category-label">Genre</span>
                <h2 class="category-title">{{ selectedGenre || 'Browse' }}</h2>
            </div>
            <div class="pager" role="navigation" aria-label="Pagination">
                <button class="page-btn" @click="prevPage" aria-label="Previous page">
                    <span class="arrow fas fa-arrow-left"></span>
                </button>
                <span class="page"><span class="page-current">{{ page }}</span><span class="page-sep">/</span><span class="page-total">20</span></span>
                <button class="page-btn" @click="nextPage" aria-label="Next page">
                    <span class="arrow fas fa-arrow-right"></span>
                </button>
            </div>
        </div>

        <div class="movie-container">
            <!-- MOVIE GRID  -->
            <app-movie  v-for="(movie, index) in movies" v-bind:movie="movie" :key="movie.id+index"  
                        v-on:info-movie="viewMovie" 
            ></app-movie>       
        </div>
        
       <!-- bottom pagination -->
        <div v-if=" currentRoute != '/search' && currentRoute != '/favourites' && movies != '' " class="pager bottom" role="navigation" aria-label="Pagination">
            <button class="page-btn" @click="prevPage" aria-label="Previous page">
                <span class="arrow fas fa-arrow-left"></span>
            </button>
            <span class="page"><span class="page-current">{{ page }}</span><span class="page-sep">/</span><span class="page-total">20</span></span>
            <button class="page-btn" @click="nextPage" aria-label="Next page">
                <span class="arrow fas fa-arrow-right"></span>
            </button>
        </div>

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
          this.scrollGridToTop()
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
                this.scrollGridToTop()
          }
      },
      scrollGridToTop () {
          this.$nextTick(() => {
              const el = this.$refs.movieGrid
              if (el && typeof el.scrollIntoView === 'function') {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
              } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
              }
          })
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
        },
        selectedGenre () {
            return this.$store.getters.selectedGenreName
        }
    },
    created () {
    },
}
</script>



<style scoped>
.movie-container {
    display: grid;
    /*
      Equal columns fill the content width (aligns with toolbar).
      --asset-min keeps posters from getting huge; 1fr shares leftover space.
    */
    grid-template-columns: repeat(
        auto-fill,
        minmax(min(100%, var(--asset-min, 150px)), 1fr)
    );
    gap: var(--grid-gap-y, 1.25rem) var(--grid-gap-x, 1rem);
    justify-items: stretch;
    min-height: 55vh;
    padding: 0.15rem 0 1.5rem;
}
#movie-grid {
    width: calc(100% - var(--sidebar-width, 12rem));
    margin-left: var(--sidebar-width, 12rem);
    height: 100%;
    min-height: calc(100vh - var(--header-height, 4rem) - var(--header-gap, 0.5rem));
    padding: var(--page-pad-y, 0.85rem) var(--page-pad-x, 1.75rem) 0;
    scroll-margin-top: calc(var(--header-height, 4rem) + var(--header-gap, 0.5rem));
    max-width: none;
}

/* ── Toolbar: title left, pager right ─────────────────────── */
.grid-toolbar {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1rem;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.055));
}
.category-block {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
}
.category-label {
    font-size: var(--text-2xs, 0.72rem);
    font-weight: 700;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
    color: var(--text-muted, #636c78);
    line-height: 1;
}
.category-title {
    margin: 0;
    font-size: var(--text-xl, 1.45rem);
    font-weight: 700;
    letter-spacing: -0.02rem;
    color: var(--white-font, #f4f6f8);
    line-height: 1.15;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: min(100%, 32rem);
}

/* ── Pager (matches search toggle / chrome) ───────────────── */
.pager {
    display: inline-flex;
    align-items: center;
    gap: 0.15rem;
    flex-shrink: 0;
    background: var(--background-color-lighter, #151a20);
    border: 1px solid var(--border-subtle, rgba(255,255,255,0.055));
    border-radius: var(--radius-lg, 10px);
    padding: 0.2rem;
}
.pager.bottom {
    display: flex;
    justify-content: center;
    width: fit-content;
    margin: 0.75rem auto 1.35rem;
}
.page-btn {
    width: 2.25rem;
    height: 2.25rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    outline: none;
    border: none;
    border-radius: var(--radius-md, 7px);
    color: var(--text-secondary, #97a0aa);
    cursor: pointer;
    transition: background var(--transition-fast, 0.14s ease),
                color var(--transition-fast, 0.14s ease);
}
.page-btn:hover {
    background: var(--primary-muted, rgba(41, 171, 194, 0.14));
    color: var(--primary-color, #29abc2);
}
.page-btn:active {
    background: rgba(41, 171, 194, 0.22);
}
.arrow {
    font-size: var(--text-sm, 0.88rem);
}
.page {
    display: inline-flex;
    align-items: baseline;
    justify-content: center;
    gap: 0.15rem;
    min-width: 3.5rem;
    padding: 0 0.4rem;
    font-size: var(--text-sm, 0.88rem);
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.02rem;
    user-select: none;
}
.page-current {
    color: var(--white-font, #f4f6f8);
}
.page-sep {
    color: var(--text-muted, #636c78);
    font-weight: 500;
}
.page-total {
    color: var(--text-secondary, #97a0aa);
    font-weight: 500;
}

@media only screen and (max-width: 720px) {
    .grid-toolbar {
        align-items: center;
        gap: 0.75rem;
        margin-bottom: 0.9rem;
        padding-bottom: 0.7rem;
    }
    .category-title {
        font-size: 1.1rem;
        max-width: 10rem;
    }
}

@media only screen and (max-width: 592px) {
    #movie-grid {
        width: calc(100% - var(--sidebar-width, 9.5rem));
        margin-left: var(--sidebar-width, 9.5rem);
        padding: var(--page-pad-y, 0.65rem) var(--page-pad-x, 0.85rem) 0;
    }
    .category-title {
        max-width: 7.5rem;
        font-size: 1rem;
    }
    .pager {
        padding: 0.15rem;
    }
    .page-btn {
        width: 1.85rem;
        height: 1.85rem;
    }
    .page {
        min-width: 2.75rem;
        font-size: 0.75rem;
    }
}
</style>
