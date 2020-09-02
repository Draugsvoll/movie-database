<template>
    <transition name="slide" mode="in-out">
    <div class="infopage" v-bind:style="infoMovie.overview == '' ? 'visibility: hidden;' : ''" v-if=" !infoMovie.overview == ''">

        <!-- movie info -->
        <div><button class="close" @click="closeInfoPage"  >Close</button></div>
        <div><h1>{{ infoMovie.title }}</h1></div>
        <div><img v-bind:src="base_url + infoMovie.poster_path" alt=""></div>
        <div class="overview">{{ infoMovie.overview }}</div>

        <!-- Buttons -->
        <button >Play <div class="fas fa-play"></div></button>
        <button >Trailer <div class="far fa-eye"></div></button>
        <button >Huskeliste <div class="fas fa-list"></div></button>
    </div>
    </transition>
</template>



<script>
import {mapGetters} from 'vuex'

export default {
    data () {
        return {
            base_url: "https://image.tmdb.org/t/p/original",
        }
    },
    computed: {
        ...mapGetters({
            infoMovie: 'infoMovie',
        })
    },
    methods: {
        // infopage closes if movie is empty
        closeInfoPage() {
            this.infoMovie.overview = ''
            this.infoMovie.title = ''
            this.infoMovie.poster_path = ''
        }
    },
}
</script>

 

<style  scoped>
.infopage {
    border-left: 1px solid black;
    background: rgba(17, 27, 41, 0.9);
    width:35%;
    min-width:775px;
    position: fixed;
    height:100%;
    right:0;
    padding: 45px 12px;
    margin: auto auto;
}

button {
    width:125px;
    height:65px;
    background: rgb(9, 16, 27);
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
}

button:hover {
    background: rgb(25, 30, 53);
    border: 1px solid rgb(190, 184, 214);
}

.overview{
    margin-top: 15px;
    font-size: 18px;
}

img {
    max-width: 750px;
}

h1 {
  margin:0 0 15px 0;
  padding:0;
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