<template>
    <header>
        <div class="logo">
            <a href="/movies">
                <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="TMDB">
            </a>
        </div>
        <nav>
            <ul class="nav_links">
                <li :class="{ active : activeIndex == 0}" @click="activeIndex = 0; showMovies()">
                    <a :class="{ active : activeIndex == 0}" href="#">Movies</a>
                </li>
                <li :class="{ active : activeIndex == 1}" @click="activeIndex = 1; showTv()">
                    <a :class="{ active : activeIndex == 1}" href="#">TV</a>
                </li>
                <li :class="{ active : activeIndex == 2}" @click="activeIndex = 2; showSearch()">
                    <a :class="{ active : activeIndex == 2}" href="#">Search</a>
                </li>
                <li :class="{ active : activeIndex == 3}" @click="activeIndex = 3; showFavs()">
                    <a :class="{ active : activeIndex == 3}" href="#">Favourites</a>
                </li>
            </ul>
        </nav>
        <div class="user-area">
            <span class="user" v-if="user">{{ user }}</span>
            <button class="logout-btn" @click="logout">Logout</button>
        </div>
    </header>
</template>



<script>
import firebase from 'firebase'

export default {
    data () {
        return {
            activeIndex: '',
            currentRoute: this.$route.path,
            user: ''
        }
    },
    methods: {
       showMovies () {
           window.location.href = `/movies`
       },
       showTv () {
           window.location.href = `/tv`
       },
       showSearch () {
           window.location.href = `/search?type=movie`
       },
       showFavs () {
           window.location.href = `/favourites?type=movie`
       },
       logout () {
           firebase.auth().signOut()
            .then(resp => console.log(resp))
            .catch(err => console.log(err))
            window.location.href = `/`
       },
       myPage () {
           window.location.href = `/mypage`
       }
    },
    created () {
        if ( this.currentRoute == '/movies') {
            this.activeIndex = 0
        } else if ( this.currentRoute == '/tv') {
            this.activeIndex = 1
        }
        else if ( this.currentRoute == '/search') {
            this.activeIndex = 2
        }
        else if ( this.currentRoute =='/favourites' ) {
            this.activeIndex = 3
        }
        else {
            this.activeIndex = -1
        }
        const user = firebase.auth().currentUser.email
        this.user = user
        console.log(user)
    }
}
</script>


<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: clamp(0.75rem, 1.5vw, 2rem);
    background: rgba(11, 13, 16, 0.9);
    backdrop-filter: blur(14px) saturate(1.2);
    -webkit-backdrop-filter: blur(14px) saturate(1.2);
    width: 100%;
    height: var(--header-height, 4rem);
    padding: 0 var(--page-pad-x, 1.75rem);
    position: fixed;
    top: 0;
    left: 0;
    border-bottom: 1px solid var(--border-subtle, rgba(255,255,255,0.055));
    box-shadow: 0 1px 0 0 rgba(41, 171, 194, 0.18);
    z-index: 99;
}

.logo img {
    width: 2.65rem;
    height: auto;
    display: block;
    transition: transform var(--transition-duration, 0.22s ease),
                filter var(--transition-duration, 0.22s ease);
}
.logo a:hover img {
    transform: scale(1.05);
    filter: brightness(1.12);
}

.nav_links {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    gap: 0.25rem;
}
.nav_links li {
    display: inline-block;
}
.nav_links li a {
    display: block;
    padding: 0.5rem 1rem;
    font-size: var(--text-sm, 0.9rem);
    font-weight: 500;
    color: var(--text-secondary, #97a0aa);
    letter-spacing: 0.01rem;
    text-decoration: none;
    border: none !important;
    border-radius: var(--radius-md, 7px);
    transition: color var(--transition-fast, 0.14s ease),
                background var(--transition-fast, 0.14s ease);
}
.nav_links li a:hover {
    color: var(--white-font, #f4f6f8);
    background: rgba(255, 255, 255, 0.045);
}
.nav_links li.active a,
.nav_links li a.active {
    color: var(--white-font, #f4f6f8) !important;
    background: var(--primary-muted, rgba(41, 171, 194, 0.14));
    box-shadow: inset 0 -2px 0 0 var(--primary-color, #29abc2);
}

.user-area {
    display: flex;
    align-items: center;
    gap: 0.85rem;
}
.user {
    font-size: var(--text-xs, 0.8rem);
    color: var(--text-muted, #636c78);
    max-width: 16rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.logout-btn {
    background: transparent;
    border: 1px solid rgba(41, 171, 194, 0.4);
    border-radius: var(--radius-md, 7px);
    outline: none;
    color: var(--primary-color, #29abc2);
    cursor: pointer;
    font-size: var(--text-sm, 0.88rem);
    font-weight: 600;
    letter-spacing: 0.02rem;
    padding: 0.45rem 1rem;
    transition: background var(--transition-fast, 0.14s ease),
                color var(--transition-fast, 0.14s ease),
                border-color var(--transition-fast, 0.14s ease),
                box-shadow var(--transition-fast, 0.14s ease);
}
.logout-btn:hover {
    background: var(--primary-color, #29abc2);
    color: #0b0d10;
    border-color: var(--primary-color, #29abc2);
    box-shadow: 0 0 12px var(--primary-glow, rgba(41, 171, 194, 0.32));
    text-decoration: none;
}

@media only screen and (max-width: 720px) {
    header {
        flex-wrap: wrap;
        height: auto;
        min-height: var(--header-height, 4rem);
        padding: 0.65rem var(--page-pad-x, 0.85rem);
        gap: 0.5rem;
    }
    .nav_links {
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
        order: 3;
    }
    .user {
        display: none;
    }
}
</style>
