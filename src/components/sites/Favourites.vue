<template>
  <div id="outer-container">
    <app-header></app-header>

    <div class="container">

      <header class="page-header">
        <div class="page-heading">
          <h1 class="page-title">Favourites</h1>
        </div>
        <div class="type-toggle" role="tablist" aria-label="Favourite type">
          <button
            type="button"
            role="tab"
            class="select-btn"
            :class="{ activeBtn : type == 'movie' || type == null || type === '' }"
            :aria-selected="type == 'movie' || type == null || type === ''"
            @click="viewMovies"
          >
            Movies
          </button>
          <button
            type="button"
            role="tab"
            class="select-btn"
            :class="{ activeBtn : type === 'tv'}"
            :aria-selected="type === 'tv'"
            @click="viewTv"
          >
            Series
          </button>
        </div>
      </header>

      <h3 class="empty-state" v-if="listEmpty">
        <i class="far fa-heart"></i>
        No favourites added yet
      </h3>

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
import firebase from 'firebase'

export default {
  data () {
    return {
      type: this.$route.query.type,
      listEmpty: false
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
        const user = firebase.auth().currentUser.uid
        Axios.get(`https://netflix-97535-default-rtdb.europe-west1.firebasedatabase.app/${user}/movies.json`).then(resp => {
              resp = resp.data
              const favMovies = []
              for (let key in resp){
                favMovies.push(resp[key])
              }
              if (favMovies.length == 0 ) {
                this.listEmpty = true
              } else {
                this.listEmpty = false
              }
              this.$store.dispatch('fetchFavourites', favMovies)
            })
      }
    },
    viewTv () {
      if ( this.type != 'tv' ) {
        this.$router.push('/favourites?type=tv')
        this.type = 'tv'
        const user = firebase.auth().currentUser.uid
        Axios.get(`https://netflix-97535-default-rtdb.europe-west1.firebasedatabase.app/${user}/series.json`).then(resp => {
              resp = resp.data
              const favMovies = []
              for (let key in resp){
                favMovies.push(resp[key])
              }
              if (favMovies.length == 0 ) {
                this.listEmpty = true
              } else {
                this.listEmpty = false
              }
              this.$store.dispatch('fetchFavourites', favMovies)
            })
      }
    }
  },
  created () {
    console.log(this.$route.path)
    const user = firebase.auth().currentUser.uid
    Axios.get(`https://netflix-97535-default-rtdb.europe-west1.firebasedatabase.app/${user}/movies.json`).then(resp => {
              resp = resp.data
              const favMovies = []
              for (let key in resp){
                favMovies.push(resp[key])
              }
              if (favMovies.length === 0) {
                this.listEmpty = true
              }
              this.$store.dispatch('fetchFavourites', favMovies)
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
  align-items: center;
  padding-top: calc(var(--header-height, 4rem) + var(--header-gap, 0.5rem) + var(--section-gap, 1.25rem));
  padding-left: var(--page-pad-x, 1.75rem);
  padding-right: var(--page-pad-x, 1.75rem);
  padding-bottom: var(--page-pad-y, 0.85rem);
  width: 100%;
  max-width: var(--content-max, 90rem);
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
}

/* Centered like original Favourites — title + pill toggle */
.page-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  width: 100%;
  margin: 0.15rem auto 1.35rem;
}
.page-heading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  text-align: center;
}
.page-label {
  font-size: var(--text-2xs, 0.72rem);
  font-weight: 700;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  color: var(--text-muted, #636c78);
  line-height: 1;
}
.page-title {
  margin: 0;
  font-size: var(--text-xl, 1.5rem);
  font-weight: 700;
  letter-spacing: -0.02rem;
  color: var(--white-font, #f4f6f8);
  line-height: 1.15;
}
.empty-state {
  margin: 2.75rem auto 3.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  font-size: var(--text-md, 1rem);
  font-weight: 500;
  color: var(--text-secondary, #97a0aa);
  letter-spacing: 0.01rem;
}
.empty-state i {
  font-size: 1.85rem;
  color: var(--primary-color, #29abc2);
  opacity: 0.65;
}
.movie-container {
  width: 100%;
  margin-top: 0.15rem;
}
.movie-container >>> #movie-grid {
  width: 100%;
  margin-left: 0;
  padding: 0;
}

/* Keep current pill toggle design */
.type-toggle {
  display: inline-flex;
  background: var(--background-color-lighter, #151a20);
  border-radius: var(--radius-lg, 10px);
  padding: 0.22rem;
  border: 1px solid var(--border-subtle, rgba(255,255,255,0.055));
}
.select-btn {
  cursor: pointer;
  color: var(--text-secondary, #97a0aa);
  font-size: var(--text-sm, 0.9rem);
  font-weight: 600;
  font-family: inherit;
  padding: 0.55rem 1.35rem;
  letter-spacing: 0.02rem;
  border-radius: var(--radius-md, 7px);
  border: none;
  background: transparent;
  outline: none;
  transition: color 0.18s ease, background 0.18s ease, box-shadow 0.18s ease;
}
.select-btn:hover {
  color: var(--white-font, #f4f6f8);
  background: rgba(255, 255, 255, 0.04);
}
.activeBtn {
  color: var(--white-font, #f4f6f8) !important;
  background: var(--primary-muted, rgba(41, 171, 194, 0.14)) !important;
  box-shadow: inset 0 0 0 1px rgba(41, 171, 194, 0.3);
}
</style>
