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
    font-size: 16px;
    padding-bottom:1px;
}
#likes {
    color:var(--primary-color);
    padding-bottom:2px;
    font-size: 17px;
}
#year {
    font-size:14px;
}
.movie {
    margin:18px 8px;
    cursor: pointer;
    display: inline-block;
    max-width: var(--asset-width);
    transition:all var(--transition-duration-asset);
    opacity:0;
}


.box {
    margin-bottom:-1px;
}

.movie:hover {
    /* transform: scale(1.09); */
    transform: translateY(-12px);
}

.extra {
    background: var(--background-color-1);
    padding: 12px;
    /* padding-bottom: 12px; */
    opacity:0;
    position: absolute;
    width:100%;
    width: var(--asset-width);
    visibility: hidden;
    margin-top:-60px;
    transition:var(--transition-duration-asset);
    border-radius: 5px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    z-index:-1;
}
.extra > p {
    overflow: hidden; 
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;

    width: var(--asset-width);
    
    font-size:13px;
    line-height: 1rem;
    text-align:left;
    margin:auto auto;
    margin-bottom:12px;
    /* margin-left:15px; */
}
.movie:hover > .extra {
    opacity:1;
    height:fit-content;
    visibility: visible;
    margin-top:-1px;
}
.row1 {
    display:flex;
    font-size:14px;
    padding: 0 2px 0 2px;
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
    z-index:1;
}
img:hover {
    /* border: 1px solid rgb(41, 171, 194); */
}
.title {
    font-size: 16px;
    text-align: center;
    margin:5px 0 8px 0;
}
p {
    overflow:hidden;
    max-width:200px;
    text-align: center;
}
.loaded {
    opacity:1;
}

@media only screen and (max-width: 668px) {
    img {
        max-width:225px;
    }
    p {
        max-width:225px;
    }
   
}

@media only screen and (max-width: 555px) {
    img {
        max-width:200px;
    }
    p {
        max-width:20px;
    }
    .extra {
        display:none;
    }
}

@media only screen and (max-width: 407px) {
    img {
        max-width:175px;
    }
    p {
        max-width:175px;
    }
}

@media only screen and (max-width: 365px) {
    img {
        max-width:145px;
    }
    p {
        max-width:145px;
    }
}

</style>