<template>
        <div class="movie" @click="viewMovie">
            <div><img  v-bind:src="base_url + movie.poster_path" ></div>
        </div>
</template>




<script>
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
                const infoMovie = this.movie
                this.$emit('info-movie', infoMovie)
        }
    }
}
</script>




<style scoped>
.movie {
    border:2px solid rgb(33, 33, 34);
    margin:0 20px 20px 0;
    cursor: pointer;
    display: inline-block;
}

.movie:hover {
        border: 2px solid rgb(13, 153, 247);

}

img {
    max-width:250px;
    vertical-align: top;
}

</style>