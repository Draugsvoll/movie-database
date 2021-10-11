<template>
        <div v-if="movie.poster_path != null" class="movie" @click="viewMovie(movie.id)" >
            <div><img ref="image" @load="loaded"  v-bind:src="base_url + movie.poster_path" alt="" ></div>
        </div>
</template>




<script>
export default {
    data () {
        return  {
            base_url: "https://image.tmdb.org/t/p/w500",
            index: 0,
            path: this.$route.path,
            transition:1
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
        },
        loaded() {
            this.$refs.image.classList.add('loaded')
        },
    }
}
</script>




<style scoped>
.movie {
    border:1.5px solid rgb(33, 33, 34);
    margin:14px 7px;
    cursor: pointer;
    display: inline-block;
    transition: transform 0.35s ease;
}
.movie:hover {
        border: 1.5px solid rgb(41, 171, 194);
        transform: translateY(-5px);
}
img {
    max-width:200px;
    vertical-align: top;

    opacity: 0;
    transition:1s;
}
.loaded {
    opacity:1;
}

@media only screen and (max-width: 668px) {
    img {
        max-width:225px;

    }
}

@media only screen and (max-width: 555px) {
    img {
        max-width:200px;
    }
}

@media only screen and (max-width: 407px) {
    img {
        max-width:175px;
    }
}

@media only screen and (max-width: 365px) {
    img {
        max-width:145px;
    }
}

</style>