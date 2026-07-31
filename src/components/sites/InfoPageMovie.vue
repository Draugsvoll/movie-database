<template>
    <!-- <transition name="slide" mode="in-out"> -->
      <!-- v-if=" !infoMovie.overview == ''" -->
      <!-- <img v-bind:src="base_url + movie.poster" alt=""> -->
    <div class="infopage"  >
        
        <!-- preview panel -->
        <div class="preview" :style="{ backgroundImage: `url(${base_url+movie.backdrop_path})` }" >
            <div class="preview-gradient"></div>
            <div class="preview-content">
                <button class="close" @click="goBack()" aria-label="Go back"><div class="fas fa-arrow-left"></div></button>
                <div class="text">
                    <h1>{{ movie.title }}</h1>
                    <div class="overview"><p>{{ movie.overview }}</p></div>
                    <div class="actions">
                        <button class="btn-primary" @click="play(movie.id)">Play <i class="fas fa-play"></i></button>
                        <button class="btn-secondary" @click="play(movie.id)">Trailer <i class="far fa-eye"></i></button>
                        <button class="btn-secondary" @click="addFavourite(movie)">+ Add <i class="fas fa-list"></i></button>
                        <span v-if="addedAnimation == true" class="added">Added to favourites</span>
                    </div>
                </div>
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
import firebase from 'firebase'

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
            profile_pic: '../../assets/logo2.jpg',
            addedAnimation: false,
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
            // window.location.href = "/movies"
            this.$router.go(-1);
        },
        addFavourite (movie) {
            this.addedAnimation = true
            setTimeout(() => {  this.addedAnimation = false }, 2000);
            const user = firebase.auth().currentUser.uid
            Axios.post(`https://netflix-97535-default-rtdb.europe-west1.firebasedatabase.app/${user}/movies.json`, movie)
                .then(function (response) {
                    console.log(response);
                })
        }
    },
    mounted () {
        window.scrollTo(0, 0)
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

<style scoped>
h3 {
    margin: 0;
}
.infopage {
    margin: 0 auto;
    color: white;
    background: var(--background-color);
    min-height: 100vh;
}
.preview {
    position: relative;
    background-size: cover;
    background-position: center top;
    min-height: 78vh;
    display: flex;
    align-items: flex-end;
}
.preview-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(
        90deg,
        rgba(11, 13, 16, 0.82) 0%,
        rgba(11, 13, 16, 0.55) 22%,
        rgba(11, 13, 16, 0.18) 48%,
        rgba(11, 13, 16, 0.02) 100%
    ),
    linear-gradient(
        0deg,
        rgba(11, 13, 16, 0.72) 0%,
        transparent 26%,
        transparent 82%,
        rgba(11, 13, 16, 0.15) 100%
    );
    pointer-events: none;
}
.preview-content {
    position: relative;
    z-index: 1;
    width: 100%;
    padding: 1.5rem max(var(--page-pad-x, 1.35rem), 3%) 3rem;
}
.close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.4rem;
    height: 2.4rem;
    padding: 0;
    margin: 0 0 1.35rem;
    background: rgba(11, 13, 16, 0.55);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    color: white;
    cursor: pointer;
    outline: none;
    font-size: 0.9rem;
    transition: background 0.18s ease, border-color 0.18s ease, transform 0.14s ease;
}
.close:hover {
    background: var(--primary-muted, rgba(41, 171, 194, 0.14));
    border-color: var(--primary-color);
    transform: translateX(-2px);
}
.text {
    max-width: 38rem;
}
h1 {
    margin: 0 0 0.75rem;
    text-shadow: 0 2px 14px rgba(0, 0, 0, 0.55);
    font-size: clamp(1.55rem, 3.5vw, 2.6rem);
    font-weight: 700;
    letter-spacing: -0.02rem;
    line-height: 1.12;
}
.overview {
    margin: 0 0 1.15rem;
}
.overview p {
    margin: 0;
    font-size: 0.88rem;
    line-height: 1.5;
    padding: 0.7rem 0.85rem;
    background: rgba(0, 0, 0, 0.42);
    backdrop-filter: blur(8px);
    border-radius: var(--radius-md, 7px);
    border: 1px solid rgba(255, 255, 255, 0.055);
    color: rgba(244, 246, 248, 0.92);
    text-shadow: none;
}
.actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
}
.actions button {
    outline: none;
    padding: 0.7rem 1.05rem;
    border-radius: var(--radius-md, 7px);
    border: none;
    color: white;
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.02rem;
    min-width: 6.5rem;
    transition: background 0.18s ease, transform 0.14s ease, box-shadow 0.18s ease;
}
.actions button:hover {
    transform: translateY(-1px);
}
.btn-primary {
    background: var(--primary-color, #29abc2);
    color: #0b0d10 !important;
    box-shadow: 0 3px 12px var(--primary-glow, rgba(41, 171, 194, 0.32));
}
.btn-primary:hover {
    background: var(--primary-hover, #3bc4dc);
}
.btn-secondary {
    background: rgba(255, 255, 255, 0.09);
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
}
.btn-secondary:hover {
    background: rgba(255, 255, 255, 0.15);
}
.added {
    cursor: default;
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--primary-color, #29abc2);
    padding: 0.4rem 0.65rem;
    background: var(--primary-muted, rgba(41, 171, 194, 0.14));
    border-radius: var(--radius-md, 7px);
}
.credits {
    display: flex;
    flex-direction: column;
    padding: 0.25rem var(--page-pad-x, 1.35rem) 2.75rem;
}
.sub-headline {
    margin: 1.5rem 0 0.5rem;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.07rem;
    text-transform: uppercase;
    color: var(--white-font);
    background: transparent;
    max-width: 100%;
    justify-content: flex-start;
    display: flex;
    padding: 0.45rem 0.15rem;
    border-bottom: 1px solid var(--border-subtle, rgba(255,255,255,0.055));
}
.actor-container, .crew-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(9.5rem, 1fr));
    justify-content: center;
    gap: var(--grid-gap-y, 1.15rem) var(--grid-gap-x, 0.9rem);
    margin-top: 1.1rem;
}
.profile {
    width: 100%;
    display: block;
    border-radius: var(--radius-md, 7px) var(--radius-md, 7px) 0 0;
    aspect-ratio: 2 / 3;
    object-fit: cover;
    background: var(--background-color-lighter);
}
.crew-text {
    background: var(--background-color-lighter);
    padding: 0.55rem 0.55rem;
    width: 100%;
    border-radius: 0 0 var(--radius-md, 7px) var(--radius-md, 7px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.78rem;
    color: var(--text-secondary, #97a0aa);
    border: 1px solid var(--border-subtle, rgba(255,255,255,0.055));
    border-top: none;
}
.crew-text > h3 {
    margin-bottom: 0.15rem;
    font-size: 0.82rem;
    color: var(--white-font);
    overflow: hidden;
    text-overflow: ellipsis;
}
img {
    width: 100%;
}

@media only screen and (max-width: 640px) {
    .preview {
        min-height: 70vh;
    }
    .preview-content {
        padding: 1rem var(--page-pad-x, 0.85rem) 2.25rem;
    }
    .actions button {
        min-width: auto;
        flex: 1 1 auto;
    }
}
</style>