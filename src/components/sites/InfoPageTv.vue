<template>
    <!-- <transition name="slide" mode="in-out"> -->
      <!-- v-if=" !infoMovie.overview == ''" -->
      <!-- <img v-bind:src="base_url + movie.poster" alt=""> -->
    <div class="infopage"  >
        
        <!-- preview panel -->
        <div class="preview" :style="{ backgroundImage: `url(${base_url+movie.backdrop_path})` }" >
            <div><button class="close" @click="goBack()"><div class="fas fa-arrow-left"> </div></button></div>
            <div class="text">
                <div><h1>{{ movie.original_name }}</h1></div>
                <!-- Buttons -->
            <button @click="play(movie.id)">Play <div class="fas fa-play"></div></button>
            <button @click="play(movie.id)">Trailer <div class="far fa-eye"></div></button>
            <button @click="addFavourite(movie)">+ Add <div class="fas fa-list"></div></button>
                <div class="overview"> <p>{{ movie.overview }}</p> </div>
            </div>

            
        </div>

        <!-- credits -->
        <div class="credits">
            <h3 class="sub-headline">The Cast</h3>
            <div class="actor-container">
                <div class="actor" v-for=" (actor, index) in cast" :key="index">
                    <div v-if="index<20">
                        <div> <img class="profile" v-bind:src="base_url + actor.profile_path" 
                            @error="$event.target.src='https://progitek.no/privat/bp/wp-content/uploads/2020/09/default.jpg'" alt=""></div>
                        <div class="crew-text">
                            <h3>{{ actor.name }}</h3>
                            '{{ actor.character }}'
                        </div>
                    </div>
                </div>
            </div>
            <h2 class="sub-headline">The Crew</h2>
            <div class="crew-container">
                <div class="crew" v-for=" (member,index) in crew" :key="index" >
                    <div v-if="index<20">
                        <div> <img class="profile" v-bind:src=" base_url + member.profile_path " @error="$event.target.src='https://progitek.no/privat/bp/wp-content/uploads/2020/09/default.jpg'" alt=""></div>
                        <div class="crew-text">
                            <h3>{{ member.name }} </h3>
                            {{ member.job }}
                        </div>
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
            crew: [],
            profile_pic: '../../assets/logo2.jpg'
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
            Axios.post('https://netflix-97535-default-rtdb.europe-west1.firebasedatabase.app/series.json', movie)
                .then(function (response) {
                    console.log(response);
                })
        }
    },
    created () {
         Axios.get(`https://api.themoviedb.org/3/tv/${this.id}?api_key=889abe3247f9348a43ba33d2c9270735&language=en-US`).then(resp => {
                console.log(resp.data)
                resp = resp.data
                const newMovie = resp
                this.movie = newMovie
            })

            Axios.get(`https://api.themoviedb.org/3/tv/${this.id}/credits?api_key=889abe3247f9348a43ba33d2c9270735&language=en-US`).then(resp => {
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
    /* border:1px solid purple; */

}
h3 {
    margin:0;
}
.sub-headline {
    margin: 1rem 0;
    font-size: 1.7rem;
    padding:0.3rem;
    background: #091731;
    max-width: 100%;
    justify-content: center;
    display: flex;
}
.crew-text {
    background: white;
    color:black;
    padding:0.5rem;
}
.actor-container, .crew-container {
    display: flex;
    flex-wrap: wrap;
    margin-top:-10px;
}
.actor, .crew {
    margin: 1rem 0.7rem;
}
.credits {
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.profile {
    width:200px;
    display: flex;
}
.preview {
    background-size: cover;
    padding-left:1%;
    min-height:75vh;
}
p {
    font-size: 0.8rem;
    background: rgba(0, 0, 0, 0.4);
    text-shadow: 1px 1px 1px black;
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
    padding:0.5rem;
    background: rgba(9, 16, 27, 0.45);
    border:none;
    color:white;
    text-shadow: 1px 1px 1px black;
    margin: 0px 10px 0px 0;
    cursor: pointer;
    font-size: 17px;
    font-weight: 400!important;
}
.close {
    padding: 1rem 2rem;
    margin-top:50px;
}
button:hover {
    background: rgba(9, 16, 27, 0.65);
    /* border: 1px solid rgb(226, 224, 237); */
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