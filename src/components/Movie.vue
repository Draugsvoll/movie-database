<template>
        <div v-if="movie.poster_path != null" class="movie" @click="viewMovie(movie.id)">
            <div><img  v-bind:src="base_url + movie.poster_path" alt="" ></div>
        </div>
</template>




<script>
export default {
    data () {
        return  {
            base_url: "https://image.tmdb.org/t/p/w500",
            index: 0,
            path: this.$route.path
        }
    },
    image: 'https://image.tmdb.org/t/p/w500',
    props: ['movie'],
    methods: {
        viewMovie(id) {
            console.log('router quey: ', this.$route.query.type)
            console.log('path: ', this.path)
            if (this.path == '/movies') {
                this. $router. push(`/infopagemovie?id=${id}`)
            }
            else if ( this.path == '/tv' ) {
                this. $router. push(`/infopagetv?id=${id}`)
            }
            else if ( this.$route.query.type === 'movie') {
                this. $router. push(`/infopagemovie?id=${id}`)
            }
            else {
                this. $router. push(`/infopagetv?id=${id}`)
            }
        }
    }
}
</script>




<style scoped>
.movie {
    border:2px solid rgb(33, 33, 34);
    margin:0 10px 10px 0;
    cursor: pointer;
    display: inline-block;
}
.movie:hover {
        border: 2px solid rgb(13, 153, 247);
}
img {
    max-width:200px;
    vertical-align: top;
}
</style>