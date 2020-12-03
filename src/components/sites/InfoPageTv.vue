<template>
    <!-- <transition name="slide" mode="in-out"> -->
      <!-- v-if=" !infoMovie.overview == ''" -->
      <!-- <img v-bind:src="base_url + movie.poster" alt=""> -->
    <div class="infopage"  >
        
        <!-- preview panel -->
        <div class="preview" :style="{ backgroundImage: `url(${base_url+movie.backdrop_path})` }" >
            <div><button class="close" @click="goBack()"><div class="fas fa-arrow-left"> </div></button></div>
            <div class="text">
                <div><h1>{{ movie.title }}</h1></div>
                <div class="overview"> <p>{{ movie.overview }}</p> </div>
            </div>
            <!-- Buttons -->
            <button @click="play(movie.id)">Play <div class="fas fa-play"></div></button>
            <button >Trailer <div class="far fa-eye"></div></button>
            <button @click="addFavourite(movie)">Huskeliste <div class="fas fa-list"></div></button>
        </div>

        <!-- credits -->
        <div class="credits">
            <div class="actor-container">
                <h2>Cast</h2>
                <div class="actor" v-for=" (actor, index) in cast" :key="index">
                <div> <img class="profile" v-bind:src=" base_url + actor.profile_path " alt=""></div>
                {{ actor.name }} <br>
                {{ actor.character }} <br>
                </div>
            </div>
            <div class="crew-container">
                <h2>Crew </h2>
                <div class="crew" v-for=" (member,index) in crew" :key="index" >
                    <div v-if=" member.profile_path != null " >
                        <div> <img class="profile" v-bind:src=" base_url + member.profile_path " alt=""></div>
                        {{ member.name }} <br>
                        {{ member.job }} <br>
                    </div>
                    
                </div>
            </div>
        </div>
            
    </div>
</template>


<script>
import Axios from 'axios'
import {mapGetters} from 'vuex'

export default {
    data () {
        return {
            base_url: "https://image.tmdb.org/t/p/original",
            // path: this.$route.path,
            id: this.$route.query.id,
            movie: {},
            path: this.$route.path,
            cast: [],
            crew: []
        }
    },
    computed: {
        ...mapGetters({
            infoMovie: 'infoMovie',
        })
    },
    methods: {
        play (id) {
          if ( this.path == '/infopagemovie') {
           window.location.href = `/playmovie?id=${id}`
          }
          else {
           window.location.href = `/playtv?id=${id}`
          }
        },
        goBack() {
            window.location.href = "/movies"
        },
        addFavourite (movie) {
            this.$store.dispatch('addFavouriteMovie', movie)
            console.log('state: ', this.$store.getters.favouriteMovies)
        }
    },
    created () {
         Axios.get(`https://api.themoviedb.org/3/movie/${this.id}?api_key=889abe3247f9348a43ba33d2c9270735&language=en-US`).then(resp => {
                console.log(resp.data)
                resp = resp.data
                const newMovie = resp
                this.movie = newMovie
            })

            Axios.get(`https://api.themoviedb.org/3/movie/${this.id}/credits?api_key=889abe3247f9348a43ba33d2c9270735&language=en-US`).then(resp => {
                console.log(resp.data)
                resp = resp.data
                const cast = resp.cast
                const crew = resp.crew
                this.cast = cast
                this.crew = crew
            })
    }
}
</script>

<style  scoped>
* {
}
.actor-container {
    margin:0 auto;
    }
.crew-container {
    margin:0 auto;
}
.credits {
    display: flex;
    justify-content: center;
}
.profile {
    max-width:300px;
    display: flex;
}
.preview {
    background-size: cover;
    padding-left:1%;
    min-height:75vh;
}
p {
    font-size: 0.8rem;
    background: rgba(0, 0, 0, 0.619);
}
.text {
    max-width:700px;
}
.infopage {
    border-left: 1px solid black;
    /* background: rgba(17, 27, 41, 0.9); */
    min-width:775px;
    right:0;
    padding: 45px 12px;
    margin: auto auto;
    color:white;
}
button {
    width:125px;
    height:65px;
    background: rgba(9, 16, 27, 0.3);
    color:white;
    border:1px solid rgb(55, 107, 185);
    margin: 15px 10px 5px 0;
    cursor: pointer;
    border-radius: 5px;
    font-size: 17px;
    font-weight: 400!important;
}
.close {
    width:95px;
    margin-bottom: 15px;
    color:white;
}
button:hover {
    background: rgba(9, 16, 27, 0.584);
    border: 1px solid rgb(226, 224, 237);
}
.overview {
    margin-top: 15px;
    font-size: 18px;
}
img {
    width:100%;
}
h1 {
    position: relative;
    margin:45% 0 15px 0;
    text-shadow: 1px 1px 4px black;
}

/* SLIDES */
.slide-enter-active {
  animation: slide-in 450ms ease-out forwards;
}
 .slide-leave-active {
    animation: slide-out 350ms ease-out forwards;
  } 
@keyframes slide-in {
  from {
    transform: translateX(300px);
    opacity: 0.8;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
 @keyframes slide-out {
    from {
      transform: translateX(0);
      opacity:1;
    }
    to {
      transform: translateX(300px);
      opacity: 0;
    }
  } 



</style>