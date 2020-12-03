<template>
    <header>
        <nav>
            <ul class="nav_links">
                <li :class="{ active : activeIndex == 0 }" @click="activeIndex = 0; showMovies()"> <a href="#">Movies</a></li>
                <li  :class="{ active : activeIndex == 1}"  @click="activeIndex = 1; showTv()"><a href="#">TV</a></li>
                <li  :class="{ active : activeIndex == 2}"  @click="activeIndex = 2; showSearch()"><a href="#">Search</a></li>
                <li  :class="{ active : activeIndex == 2}"  @click="activeIndex = 3; showFavs()"><a href="#">Favourites</a></li>
            </ul>
        </nav>
        <a class="cta" href="#"><button>Logout</button></a>
    </header>
</template>



<script>
export default {
    data () {
        return {
            activeIndex: 0,
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
        else {
            this.activeIndex = 2
        }
    }
}
</script>


<style  scoped>
li, a, button{
    color:white;
    font-size:28px;
}

.nav_links li a{
    text-decoration: none;
}
header{
    display: flex;
    justify-content: space-between;
    align-items:baseline;
    padding: 15px 15px 15px 0px;
    background-color: black;
    height:70px;
    width:100%;
    position: fixed;
    margin-top: 0px;
}
.nav_links li{
    display: inline-block;
    padding: 0px 20px 0 0;
}
.active {
    text-decoration: underline;
}
.nav_links li a{
    transition: all 0.2s ease 0s;
}
.nav_links li a:hover{
    color: rgb(146, 157, 194);
}
button{
    padding: 9px 25px;
    background-color: rgb(14, 28, 48);
    border:2px solid rgb(73, 101, 145);
    border-radius: 10px;
    cursor: pointer;
    margin-right: 35px;
    font-size: 26px;
}
button:hover{
    background-color: rgba(22, 41, 78, 0.8);
    border: 1.5px solid rgb(73, 81, 117);
}
</style>