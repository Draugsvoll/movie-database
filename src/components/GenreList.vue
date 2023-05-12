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
    letter-spacing: 1px;

}
ul{
    list-style: none;
    margin:10px 0 0 0;
    padding:0;
    overflow-y: scroll;
    height:80%;
}
::-webkit-scrollbar {
  width: 5px;
  background:rgb(28, 30, 32);
  border-radius:10px;
}
::-webkit-scrollbar-thumb {
  background:rgb(19, 135, 156);
  border-radius:10px;
}
::-webkit-scrollbar-thumb:hover {
    background: var(--primary-color);
      /* background:rgb(30, 145, 165); */
}
#genre {
    /* margin-top:40px; */
    width:198px;
    height:100%;
    position: fixed;
    justify-content: center;
}
h1 {
    text-align: center;
}
li {
    margin-left:16px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 7px;
    margin-bottom:1px;
    width:85%;
    font-size: 16px;
    cursor: pointer;
    border-left: 1px solid  rgb(17, 19, 22);
    color:rgb(160, 159, 159);
     transition: all 0.25s ease 0s;
}

li:hover {
    color:white;
    background: var(--background-color-1);

}
.active {
    color:rgb(254, 254, 255);
    border-left:1px solid rgb(41, 171, 194);
    background: var(--background-color-1);

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