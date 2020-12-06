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
  width: 7px;
  background:rgb(23, 22, 22);
}
::-webkit-scrollbar-thumb {
  background:rgb(103, 99, 99);
  border-radius:10px;
}
::-webkit-scrollbar-thumb:hover {
  background:rgb(125, 120, 120);
}
#genre {
    margin-top:40px;
    width:198px;
    height:100%;
    position: fixed;
    justify-content: center;
}
h1 {
    text-align: center;
}
li {
    margin: 0 auto;
    padding: 3px;
    padding-left:15px;
    width:75%;
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
    border:1px solid rgb(255, 196, 0);
    /* border-radius:5px; */
}

@media only screen and (max-width: 524px) {
    #genre {
        margin-top:100px;
    }
}

@media only screen and (max-width: 592px) {
    #genre {
        width:150px;
    }
}

</style>