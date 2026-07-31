<template>
        <!-- MOVIE-CONTAINER -->
        <div class="movie" ref="movie" v-if="movie.poster_path != null"  @click="viewMovie(movie.id)" >
            <div class="box">
                <img  @load="loaded"  v-bind:src="base_url + movie.poster_path" alt="" >
                <div class="poster-overlay"></div>
            </div>
            
            <!-- INFO ON HOVER  -->
            <div class="extra">
                <h1 class="title" v-if="path.includes('movie')">{{ movie.title }}</h1>
                <h1 class="title" v-else-if="path.includes('tv')">{{ movie.name }}</h1>
                <div class="meta-row" v-if="path.includes('movie') && movie.release_date">
                    <span class="year-chip">{{ movie.release_date.split('-')[0] }}</span>
                </div>
                <p class="overview" v-if="movie.overview">{{ movie.overview }}</p>
                <div class="stats">
                    <div class="tmdb-score" v-if="movie.vote_average != null" title="TMDB User Score">
                        <div
                            class="tmdb-ring"
                            :style="{ background: scoreRingStyle(movie.vote_average) }"
                        >
                            <span class="tmdb-ring-inner">
                                <span class="tmdb-val">{{ movie.vote_average.toFixed(1) }}</span>
                            </span>
                        </div>
                        <div class="tmdb-meta">
                            <span class="tmdb-brand">TMDB</span>
                        </div>
                    </div>
                    <span class="stat popularity" v-if="movie.popularity != null">
                        <i class="fa fa-solid fa-thumbs-up"></i>
                        {{ parseInt(movie.popularity).toLocaleString() }}
                    </span>
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
        /** TMDB-style circular score ring (vote_average is 0–10). */
        scoreRingStyle (vote) {
            const pct = Math.max(0, Math.min(100, (Number(vote) || 0) * 10))
            // Same thresholds / colors as TMDB’s user-score ring
            const color = pct >= 70 ? '#21d07a' : pct >= 40 ? '#d2d531' : '#db2360'
            const track = pct >= 70 ? '#204529' : pct >= 40 ? '#423d0f' : '#571435'
            return `conic-gradient(${color} ${pct}%, ${track} 0)`
        },
    },
    mounted () {
    },
}
</script>




<style scoped>
.movie {
    margin: 0;
    cursor: pointer;
    display: block;
    width: 100%;
    max-width: none; /* fill grid cell — grows/shrinks with column */
    transition: transform var(--transition-duration-asset),
                opacity 0.35s ease;
    opacity: 0;
    vertical-align: top;
    position: relative;
}
.movie > .title2 {
    transition: opacity 0.18s ease;
}
.movie:hover > .title2 {
    opacity: 0;
}

.box {
    position: relative;
    margin-bottom: 0;
    border-radius: var(--radius-md, 7px);
    overflow: hidden;
    box-shadow: var(--shadow-card, 0 2px 10px rgba(0,0,0,0.4));
    background: var(--background-color-lighter);
    border: 1px solid transparent;
}
.poster-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.55) 100%);
    opacity: 0;
    transition: opacity var(--transition-duration-asset);
    pointer-events: none;
}
.movie:hover .poster-overlay {
    opacity: 1;
}
.movie:hover .box {
    border-radius: var(--radius-md, 7px) var(--radius-md, 7px) 0 0;
    box-shadow: none;
}

.movie:hover {
    transform: translateY(-0.3rem) scale(1.03);
    z-index: 5;
}

/* Hover description panel */
.extra {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    max-width: none;
    z-index: 2;
    padding: 0.65rem 0.75rem 0.7rem;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-0.2rem);
    pointer-events: none;
    background: linear-gradient(
        180deg,
        rgba(22, 26, 32, 0.98) 0%,
        rgba(18, 22, 28, 0.99) 100%
    );
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-top: 1px solid rgba(41, 171, 194, 0.28);
    border-radius: 0 0 var(--radius-md, 7px) var(--radius-md, 7px);
    box-shadow:
        0 14px 32px rgba(0, 0, 0, 0.55),
        0 0 0 1px rgba(0, 0, 0, 0.2);
    transition:
        opacity var(--transition-duration-asset),
        visibility var(--transition-duration-asset),
        transform var(--transition-duration-asset);
}
.movie:hover > .extra {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}

.title {
    margin: 0;
    font-size: 0.8rem;
    font-weight: 700;
    text-align: left;
    line-height: 1.25;
    letter-spacing: -0.01rem;
    color: var(--white-font, #f4f6f8);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.meta-row {
    display: flex;
    align-items: center;
    gap: 0.35rem;
    margin-top: 0.35rem;
}
.year-chip {
    display: inline-flex;
    align-items: center;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.04rem;
    color: var(--text-secondary, #97a0aa);
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 999px;
    padding: 0.12rem 0.45rem;
    line-height: 1.2;
}
.overview {
    margin: 0.5rem 0 0;
    font-size: 0.72rem;
    font-weight: 400;
    line-height: 1.55;
    text-align: left;
    letter-spacing: 0.01em;
    word-spacing: 0.02em;
    color: rgba(180, 188, 198, 0.92);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    /* Soft fade only at the very bottom of the clamp */
    mask-image: linear-gradient(180deg, #000 78%, rgba(0, 0, 0, 0.35) 100%);
    -webkit-mask-image: linear-gradient(180deg, #000 78%, rgba(0, 0, 0, 0.35) 100%);
}
.stats {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    margin-top: 0.55rem;
    padding-top: 0.55rem;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
}

/* TMDB user-score badge (circular progress + mark) */
.tmdb-score {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    min-width: 0;
}
.tmdb-ring {
    width: 1.85rem;
    height: 1.85rem;
    border-radius: 50%;
    padding: 2px;
    flex-shrink: 0;
    box-shadow: 0 0 0 1px rgba(1, 180, 228, 0.15);
}
.tmdb-ring-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #081c22;
}
.tmdb-val {
    font-size: 0.62rem;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.02em;
    color: #fff;
    line-height: 1;
}
.tmdb-meta {
    display: flex;
    align-items: center;
    min-width: 0;
}
.tmdb-brand {
    font-size: 0.62rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    line-height: 1;
    color: #01b4e4;
}

.stat {
    display: inline-flex;
    align-items: center;
    gap: 0.28rem;
    font-size: 0.7rem;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.01rem;
    padding: 0.2rem 0.45rem;
    border-radius: 999px;
    line-height: 1;
}
.stat i {
    font-size: 0.62rem;
}
.stat.popularity {
    color: var(--primary-color, #29abc2);
    background: var(--primary-muted, rgba(41, 171, 194, 0.14));
    border: 1px solid rgba(41, 171, 194, 0.28);
    margin-left: auto;
}
.stat.popularity i {
    color: var(--primary-color, #29abc2);
}

img {
    max-width: none;
    width: 100%;
    vertical-align: top;
    border: none;
    z-index: 3;
    display: block;
    aspect-ratio: 2 / 3;
    object-fit: cover;
    transition: transform var(--transition-duration-asset);
}
.movie:hover img {
    transform: scale(1.03);
}
.title2 {
    font-size: 0.83rem;
    font-weight: 600;
    margin: 0.75rem 0 0;
    color: var(--white-font, #f4f6f8);
    letter-spacing: 0.01rem;
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-align: center;
}
.loaded {
    opacity: 1;
}
</style>
