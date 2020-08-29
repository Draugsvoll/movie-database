<template>
        <div class="movie" @click="viewMovie">
            <div><img id="image" v-bind:src="base_url + movie.poster_path"></div>
        </div>
</template>












<script>
//import axios from 'axios'


export default {
    data () {
        return  {
            base_url: "https://image.tmdb.org/t/p/w500",
            index: 0,
        }
    },
    image: 'https://image.tmdb.org/t/p/w500',
    props: ['movie'],
    methods: {
        viewMovie() {
                this.infoMovie = this.movie
                this.$emit('info-movie', this.infoMovie)
        }
    }
    
}
</script>








<style scoped>

.movie {
    border:1px solid rgb(102, 104, 116);
    margin:0 20px 20px 0;
    cursor: pointer;
    display: inline-block;
}

.movie:hover {
    border:1px solid rgb(233, 15, 233);
}

img {
    max-width:250px;
    vertical-align: top;
}


</style>