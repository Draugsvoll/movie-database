<template>
    <header>
        <div>
            <!-- <img src="../assets/logo2.png" alt="" width="50"> -->
            <a href="/movies"> <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt=""></a> 
        </div>
        <div>
            <ul class="nav_links">
                <li  :class="{ active : activeIndex == 0}"  @click="activeIndex = 0; showMovies()"> <a :class="{ active : activeIndex == 0}" href="#">Movies</a></li>
                <li  :class="{ active : activeIndex == 1}"  @click="activeIndex = 1; showTv()"><a :class="{ active : activeIndex == 1}" href="#">TV</a></li>
                <li  :class="{ active : activeIndex == 2}"  @click="activeIndex = 2; showSearch()"><a :class="{ active : activeIndex == 2}" href="#">Search</a></li>
                <li  :class="{ active : activeIndex == 3}"  @click="activeIndex = 3; showFavs()"><a :class="{ active : activeIndex == 3}" href="#">Favourites</a></li>
            </ul>
        </div>
        <div>
            <a  @click="logout"><button>Logout</button></a> <span class="user">({{user}})</span>
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
* {
    /* border:1px solid red; */
    font-family: Sans-serif;
}
img {
    width:3rem;
}
li, a, button{
    font-size:0.9rem;
    color:rgb(159, 158, 158);
    letter-spacing: 0.04rem;
}
ul li a {
    border:none !important;
    text-decoration: none;
}

header{
    display: flex;
    justify-content: space-evenly;
    align-items:baseline;
    background: rgb(15 18 23 / 93%);
    width:100%;
    position: fixed;
    border-bottom:1px solid var(--primary-color);
    z-index:99;
    letter-spacing: 0.015rem;
}
header > div {
    margin-top:auto;
    margin-bottom:auto;
}
.nav_links li{
    display: inline-block;
   margin: 8px 15px;
}
.active {
    color:white !important;
    border-bottom:1px solid rgb(41, 171, 194);
}
.nav_links li a{
    transition: all 0.25s ease 0s;
}
.nav_links li a:hover{
    color: rgb(247, 247, 247);
}
button{
  background:rgba(0,0,0,0);
  border:none !important;
  outline:none;
  color:rgb(87, 205, 226);
  cursor:pointer;
}
button:hover{
    background-color: rgba(22, 41, 78, 0);
    text-decoration: underline;
}

img {
    /* margin-left:1.5rem;
    margin-bottom:-15px; */
}
.user {
    font-size: 0.75rem;
    color:rgb(226, 234, 235);
}

@media only screen and (max-width: 524px) {
 .nav_links {
    text-decoration: none;
    display:flex;
    flex-direction: column;
}
}

</style>