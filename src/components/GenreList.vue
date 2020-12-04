<template>
    <div id="genre">
            <ul>
                <app-genre v-for="(genre, index) in genres" v-bind:genre="genre" :key="genre.id"
                            :class="{ active : index == activeIndex}"
                            @click.native="activeIndex = index, getGenres(genre.id)"></app-genre>
            </ul>
    </div>
</template>





<script>
import Genre from './Genre'

export default {
    data () {
        return {
            genre: [],
            activeIndex: 0,
            currentSite: this.$route.path
        }
    },
    components: {
        appGenre: Genre
    },
    methods: {
        getGenres (id) {
            if ( this.currentSite == '/movies') {
                this.$store.dispatch('fetchMovieList', id)
            }
            else {
                this.$store.dispatch('fetchTvList', id)
            }
        }         
        },
        computed: {
            genres () {
                return this.$store.getters.genres
            }
        },
        created () {
            if ( this.currentSite == '/movies') {
                this.$store.dispatch('fetchGenreList')
            }
            else {
                this.$store.dispatch('fetchTvGenreList')
            }
        }  
}
</script>



<style scoped>
* {
    /* border:1px red solid; */
}
ul{
    list-style: none;
    margin:10px 0 0 0;
    padding:0;
    overflow-y: scroll;
    height:80%;
}
::-webkit-scrollbar {
  width: 10px;
  background:rgb(23, 22, 22);
}
::-webkit-scrollbar-thumb {
  background:rgb(103, 99, 99);
  border-radius:10px;
}
#genre {
    margin-top:48px;
    width:180px;
    height:100%;
    position: fixed;
    justify-content: center;
}
h1 {
    text-align: center;
}
li {
    margin-left: 15%;
    padding: 5px;
    width:70%;
    margin-bottom: 10px;
    font-size: 1rem;
    cursor: pointer;
    border-left: 1px solid  black;
    color:rgb(160, 159, 159);
}

li:hover {
    color:white;
}
.active {
    color:rgb(254, 254, 255);
    /* text-decoration: underline; */
    border:2px solid rgb(255, 196, 0);
}
</style>