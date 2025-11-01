<template>
        <!-- MOVIE-CONTAINER -->
        <div class="movie" ref="movie" v-if="movie.poster_path != null"  @click="viewMovie(movie.id)" >
            <div class="box">
                <img  @load="loaded"  v-bind:src="base_url + movie.poster_path" alt="" >
            </div>
            
            <!-- INFO ON HOVER  -->
            <div class="extra">
                <h1 class="title" v-if="path.includes('movie')"> {{movie.title}} <span id="year">({{movie.release_date.split('-')[0]}})</span> </h1>
                <h1 class="title" v-else-if="path.includes('tv')"> {{movie.name}} </h1>
                <p> {{movie.overview}}</p>
                <div class="row1">
                    <div class="movie-score">{{movie.vote_average.toFixed(1)}} <i id="star" class="fa fa-solid fa-star"></i></div>
                    <div class="movie-popularity">{{parseInt(movie.popularity).toLocaleString()}} <i id="likes" class="fa fa-solid fa-thumbs-up"></i></div>
                </div>
            </div>
            <p v-if="path.includes('movie')" class="title2">{{movie.title}}</p>
            <p v-else-if="path.includes('tv')" class="title2">{{movie.name}}</p>
            
        </div>
</template>




<script>
export default {
    data () {
        return  {
            base_url: "https://image.tmdb.org/t/p/w500",
            index: 0,
            path: this.$route.path + this.$route.query.type
        }
    },
    image: 'https://image.tmdb.org/t/p/w500',
    props: ['movie'],
    methods: {
        viewMovie(id) {
            // console.log('router quey: ', this.$route.query.type)
            // console.log('path: ', this.path)
            if (this.path.includes('/movies')) {
                this. $router. push(`/infopagemovie?id=${id}`)
            }
            else if ( this.path.includes('/tv') ) {
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
            this.$refs.movie.classList.add('loaded')
        },
    },
    mounted () {
    },
}
</script>




<style scoped>
#star {
    color: #e8b923;
    font-size: 0.9rem;
}
#likes {
    color:var(--primary-color);
    font-size: 1rem;
    padding-left:0.08rem;
}
#year {
    font-size:0.87rem;
}
.movie {
    margin:1.15rem 1rem;
    cursor: pointer;
    display: inline-block;
    max-width: var(--asset-width);
    transition:all var(--transition-duration-asset);
    opacity:0;
}
.movie > p {
    transition:0.2s;
}
.movie:hover > p {
    opacity:0;
}


.box {
    margin-bottom:-0.07rem;
}

.movie:hover {
    transform: translateY(-0.33rem);
    transform: scale(1.025);
}

.extra {
    background: var(--background-color-lighter);
    padding: 0.75rem;
    opacity:0;
    position: absolute;
    width:inherit;
    visibility: hidden;
    margin-top:-1.5rem;
    transition:var(--transition-duration-asset);
    border-radius: 12px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    z-index:2;
    letter-spacing: 0.035rem;
}
.extra > p {
    letter-spacing: 0.03rem;
    overflow: hidden; 
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;

    width: inherit;
    font-size:0.81rem;
    line-height: 1rem;
    text-align:left;
    margin:auto auto;
    margin-bottom:0.75rem;
}
.movie:hover > .extra {
    opacity:1;
    height:fit-content;
    visibility: visible;
    margin-top:0px;
}
.row1 {
    display:flex;
    font-size:0.9rem;
    padding: 0 0.18rem 0 0.18rem;
    overflow:hidden;
}
.row1 > div {
    width:50%;
}
.movie-popularity {
    text-align: right;
}
img {
    max-width: var(--asset-width);
    vertical-align: top;
    border:1px solid rgb(33, 33, 34);
    border:none;
    z-index:3;
    border-radius: 2px
}
img:hover {
    /* border: 1px solid rgb(41, 171, 194); */
}
.title {
    font-size: 0.95rem;
    text-align: center;
    margin:0.35rem 0 0.6rem 0;
    z-index:1;
    position: relative;
}
.title2 {
    font-size: 0.95rem;
    margin-bottom:0;
    margin-top:0.8rem;
    color:rgb(247, 249, 250);
    letter-spacing: 0.035rem;
}
p {
    overflow:hidden;
    max-width:100%;
    text-align: center;
}
.loaded {
    opacity:1;
}


</style>