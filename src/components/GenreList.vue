<template>
    <div id="genre">
            <div class="genre-label">Genres</div>
            <ul>
                <app-genre v-for="(genre, index) in genres" v-bind:genre="genre" :key="genre.id"
                            :class="{ active : genre.id == currentGenreId || index == activeIndex}"
                            @click.native="selectGenre(genre, index)"></app-genre>
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
        selectGenre (genre, index) {
            this.activeIndex = index
            this.$store.dispatch('setSelectedGenreName', genre.name)
            if ( this.currentSite == '/movies') {
                this.$store.dispatch('fetchMovieList', genre.id)
            }
            else {
                this.$store.dispatch('fetchTvList', genre.id)
            }
        }
    },
    computed: {
        genres () {
            return this.$store.getters.genres
        },
        currentGenreId () {
            return this.$store.getters.currentGenreId
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
#genre {
    width: var(--sidebar-width, 12rem);
    height: calc(100vh - var(--header-height, 4rem) - var(--header-gap, 0.5rem));
    position: fixed;
    top: calc(var(--header-height, 4rem) + var(--header-gap, 0.5rem));
    left: 0;
    padding: var(--page-pad-y, 0.85rem) 0 1.25rem;
    background: linear-gradient(180deg, rgba(11, 13, 16, 0.55) 0%, transparent 100%);
    border-right: 1px solid var(--border-subtle, rgba(255,255,255,0.055));
    z-index: 10;
    box-sizing: border-box;
}
.genre-label {
    font-size: var(--text-2xs, 0.72rem);
    font-weight: 700;
    letter-spacing: 0.1rem;
    text-transform: uppercase;
    color: var(--text-muted, #636c78);
    padding: 0 1rem 0.75rem 1.15rem;
}
ul {
    list-style: none;
    margin: 0;
    padding: 0 0.45rem 0.5rem 0;
    overflow-y: auto;
    height: calc(100% - 1.75rem);
}
ul::-webkit-scrollbar {
    width: 3px;
}
ul::-webkit-scrollbar-track {
    background: transparent;
}
ul::-webkit-scrollbar-thumb {
    background: rgba(41, 171, 194, 0.35);
    border-radius: 99px;
}
li {
    margin: 0 0 0.15rem 0.45rem;
    border-radius: 0 var(--radius-md, 7px) var(--radius-md, 7px) 0;
    padding: 0.4rem 0.85rem;
    width: calc(100% - 0.65rem);
    font-size: var(--text-sm, 0.9rem);
    font-weight: 500;
    letter-spacing: 0.01rem;
    cursor: pointer;
    border-left: 2px solid transparent;
    color: var(--text-secondary, #97a0aa);
    transition: color var(--transition-fast, 0.14s ease),
                background var(--transition-fast, 0.14s ease),
                border-color var(--transition-fast, 0.14s ease);
}
li:hover {
    color: var(--white-font, #f4f6f8);
    background: rgba(255, 255, 255, 0.035);
}
.active {
    color: var(--white-font, #f4f6f8) !important;
    border-left-color: var(--primary-color, #29abc2) !important;
    background: var(--primary-muted, rgba(41, 171, 194, 0.14)) !important;
}

@media only screen and (max-width: 592px) {
    #genre {
        width: var(--sidebar-width, 9.5rem);
    }
    li {
        font-size: 0.8rem;
        padding: 0.38rem 0.5rem;
    }
}
</style>
