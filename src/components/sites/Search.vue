<template>
  <div id="outer-container">
    <app-header></app-header>

    <div class="container">
      <!-- type toggle  -->
      <div class="upper-btn">
          <div :class="{ activeBtn : searchType == 'movie'}" class="select-btn" @click="searchMovie">
            Movies
          </div>
          <div :class="{ activeBtn : searchType === 'tv'}" class="select-btn" @click="searchTv">
            Series
          </div>
      </div>

      <div class="searchField">
        <div class="search-bar">
          <i class="fas fa-search search-icon"></i>
          <input v-model="searchTerm" ref="search" type="text" placeholder="Search titles..." value='' autofocus>
          <button class="search" @click="search(searchTerm)">Search</button>
        </div>
      </div>

      <div class="query" v-if="query">Results for “{{ query }}”</div>

      <!-- movie grid  -->
      <div class="movie-container">
        <app-moviegrid ></app-moviegrid>
      </div>

    </div>
  </div>
</template>


<script scoped>
import axios from 'axios'
import MovieGrid from '../MovieGrid'
import Header from '../Header'


export default {
  data () {
    return {
      infoMovie: '',
      searchTerm: '',
      searchType: 'movie',
      searchResults: [],
      query: 'Popular',
      path: this.$route.query.type,
      active: 'movies'
    }
  },
  components: {
    appMoviegrid: MovieGrid,
    appHeader: Header,
  },
  methods: {
      search(searchTerm) {
            this.query = searchTerm
            var searchResults = []
            axios.get(`https://api.themoviedb.org/3/search/${this.searchType}?api_key=889abe3247f9348a43ba33d2c9270735&language=en-US&page=1&include_adult=false&query=${searchTerm}`).then(resp => {
                resp = resp.data.results
                resp.forEach( movie => {
                searchResults.push(movie)
                });
                this.$store.dispatch('searchResults', searchResults )
            })
        },
        searchMovie () {
          this.searchType = 'movie'
          if ( this.$route.query.type == 'tv' ) {
            this.$router.push('/search?type=movie')
          }
          axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=889abe3247f9348a43ba33d2c9270735&language=en-US&page=1`).then(resp => {
                this.$store.dispatch('searchResults', resp.data.results )
            })
        },
        searchTv () {
          this.searchType = 'tv'
          if ( this.$route.query.type == 'movie' ) {
            this.$router.push('/search?type=tv')
          }
          axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=889abe3247f9348a43ba33d2c9270735&language=en-US&page=1`).then(resp => {
                this.$store.dispatch('searchResults', resp.data.results )
            })
        }
  },
  created () {
    const ref = this
    var searchTerm = this.searchTerm
    window.addEventListener('keyup', function(event) {
          if (event.keyCode === 13) { 
            ref.search(ref.searchTerm)
          }
        });
     axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=889abe3247f9348a43ba33d2c9270735&language=en-US&page=1`).then(resp => {
                this.$store.dispatch('searchResults', resp.data.results )
            })
  }
 
}
</script>

<style scoped>
#outer-container {
  min-height: 100vh;
  background: var(--background-color);
}
.container {
  display: flex;
  flex-direction: column;
  padding-top: calc(var(--header-height, 4rem) + var(--header-gap, 0.5rem) + var(--section-gap, 1.25rem));
  align-items: center;
  padding-left: var(--page-pad-x, 1.75rem);
  padding-right: var(--page-pad-x, 1.75rem);
  padding-bottom: var(--page-pad-y, 0.85rem);
  width: 100%;
  max-width: var(--content-max, 90rem);
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
}
.query {
  margin: 1rem 0 0.5rem;
  font-size: var(--text-sm, 0.92rem);
  font-weight: 500;
  color: var(--text-secondary, #97a0aa);
  letter-spacing: 0.01rem;
}
.movie-container {
  width: 100%;
  max-width: 100%;
  margin-top: 0.35rem;
}
/* Override MovieGrid sidebar offset on search (no genre list) */
.movie-container >>> #movie-grid {
  width: 100%;
  margin-left: 0;
  padding: 0;
}
.upper-btn {
  margin: 0.15rem auto var(--section-gap, 1.25rem);
  display: inline-flex;
  background: var(--background-color-lighter, #151a20);
  border-radius: var(--radius-lg, 10px);
  padding: 0.25rem;
  border: 1px solid var(--border-subtle, rgba(255,255,255,0.055));
}
.select-btn {
  cursor: pointer;
  color: var(--text-secondary, #97a0aa);
  font-size: var(--text-sm, 0.9rem);
  font-weight: 600;
  padding: 0.55rem 1.35rem;
  letter-spacing: 0.02rem;
  border-radius: var(--radius-md, 7px);
  transition: color 0.18s ease, background 0.18s ease;
}
.select-btn:hover {
  color: var(--white-font, #f4f6f8);
}
.activeBtn {
  color: var(--white-font, #f4f6f8) !important;
  background: var(--primary-muted, rgba(41, 171, 194, 0.14));
  box-shadow: inset 0 0 0 1px rgba(41, 171, 194, 0.3);
}
.searchField {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 0;
}
.search-bar {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  width: 100%;
  max-width: var(--search-bar-max, 32rem);
  background: var(--background-color-lighter, #151a20);
  border: 1px solid var(--border-subtle, rgba(255,255,255,0.055));
  border-radius: var(--radius-lg, 10px);
  padding: 0.28rem 0.28rem 0.28rem 0.85rem;
  transition: border-color 0.18s ease, box-shadow 0.18s ease;
}
.search-bar:focus-within {
  border-color: var(--primary-color, #29abc2);
  box-shadow: 0 0 0 3px var(--primary-muted, rgba(41, 171, 194, 0.14));
}
.search-icon {
  color: var(--text-muted, #636c78);
  font-size: var(--text-md, 0.95rem);
  flex-shrink: 0;
}
input {
  flex: 1;
  min-width: 0;
  height: 2.45rem;
  font-size: var(--text-md, 0.95rem);
  letter-spacing: 0.01rem;
  background: transparent;
  border: none;
  color: var(--white-font, #f4f6f8);
  outline: none;
}
::placeholder {
  color: var(--text-muted, #636c78);
}
.search {
  flex-shrink: 0;
  height: 2.45rem;
  padding: 0 1.15rem;
  border-radius: var(--radius-md, 7px);
  font-size: var(--text-sm, 0.88rem);
  font-weight: 600;
  letter-spacing: 0.03rem;
  background: var(--primary-color, #29abc2);
  color: #0b0d10;
  border: none;
  cursor: pointer;
  outline: none;
  transition: background 0.18s ease, box-shadow 0.18s ease;
}
.search:hover {
  background: var(--primary-hover, #3bc4dc);
  box-shadow: 0 0 12px var(--primary-glow, rgba(41, 171, 194, 0.32));
  color: #0b0d10;
}

@media only screen and (max-width: 480px) {
  .search-bar {
    flex-wrap: wrap;
    padding: 0.55rem;
  }
  .search-icon {
    display: none;
  }
  input {
    width: 100%;
    padding: 0 0.4rem;
  }
  .search {
    width: 100%;
  }
}
</style>
