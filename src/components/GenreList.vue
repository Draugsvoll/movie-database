<template>
    <div id="genre">
            <ul>
                <app-genre v-for="(genre, index) in genres" v-bind:genre="genre" :key="genre.id"
                            :class="{ active : index == activeIndex}"
                            @click.native="activeIndex = index, fetchGenre(index)"></app-genre>
            </ul>
    </div>
</template>





<script>
import Genre from './Genre'

export default {
    data () {
        return {
            genres: ['Action', 'Comedy', 'Drama', 'Documentary', 'Family', 'Thriller'],
            activeIndex: 0
        }
    },
  
    components: {
        appGenre: Genre
    },
    methods: {

        // *FETCHES A GENRE/MOVIE-LIST 
        fetchGenre (index) {

            let genreId

                // *FETCH GENRE BASED ON GENREID
                switch(index) {
                    case 0: 
                    genreId = 28
                    break

                    case 1:  
                    genreId = 35
                    break

                    case 2:  
                    genreId = 18
                    break

                    case 3:  
                    genreId = 99
                    break

                    case 4:  
                    genreId = 10751
                    break

                    case 5:  
                    genreId = 53
                    break

                    default:
                    break
                }
            this.$store.dispatch('fetchMovieList', genreId)
        }
           
    }
}
</script>




<style scoped>
ul{
    list-style: none;
    margin:10px 0 0 0;
    padding:0;

}

#genre {
    width:20%;
    height:100%;
    position: fixed;
    
}

h1 {
    text-align: center;
}

li {
    margin-left: 15%;
    padding: 5px;
    margin-bottom: 10px;
    font-size: 22px;
    cursor: pointer;
    width:60%;
    border-left: 1px solid  rgb(33, 33, 34);
    color:grey;
}

li:hover {
    border-left: 2px solid white;
    color:white;

}

.active {
    color:rgb(254, 254, 255);
text-decoration: underline;
}

</style>