<template>
    <header>
        <div>
            <img src="../assets/logo2.png" alt="" width="50">
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
            <a class="cta" href="#"><button>Logout</button></a>
        </div>
    </header>
</template>



<script>
export default {
    data () {
        return {
            activeIndex: '',
            currentRoute: this.$route.path
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
           window.location.href = `/favourites`
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
        else {
            this.activeIndex = 3
        }
    }
}
</script>


<style  scoped>
header {
    display: flex;
    
}
nav {
    display: flex;
    justify-content: space-evenly;
}
li, a, button{
    font-size:20px;
    color:rgb(159, 158, 158);
}

.nav_links li a{
    text-decoration: none;
}
header{
    display: flex;
    justify-content: space-between;
    align-items:baseline;
    padding: 5px 15px 10px 0px;
    background-color: black;
    min-height:70px;
    width:100%;
    position: fixed;
    margin-top: 0px;
    border-bottom:1.5px solid rgb(237, 145, 6);
}
.nav_links li{
    display: inline-block;
    margin:0.5rem;
}
.active {
    color:white !important;
    border-bottom:2px solid rgb(255, 196, 0);
}
.nav_links li a{
    transition: all 0.2s ease 0s;
}
.nav_links li a:hover{
    color: rgb(247, 247, 247);
}
button{
    padding: 9px 25px;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 35px;
    BORDER:none !important;
    font-size: 16px;
    color:rgb(255, 196, 0);
}
button:hover{
    background-color: rgba(22, 41, 78, 0.8);
    border: 1.5px solid rgb(73, 81, 117);
}

img {
    margin-left:1.5rem;
}
</style>