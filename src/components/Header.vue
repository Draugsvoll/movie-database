<template>
    <header>
        <div>
            <!-- <img src="../assets/logo2.png" alt="" width="50"> -->
            <a href="/movies"> <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" alt="" width="50"></a> 
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
            <a  href="#"><button>Logout</button></a>
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


<style scoped>
* {
    /* border:1px solid red; */
}

li, a, button{
    font-size:18px;
    color:rgb(159, 158, 158);
}
a {
    border:none !important;
}

header{
    display: flex;
    justify-content: space-evenly;
    align-items:baseline;
    padding: 5px 15px 10px 0px;
    background-color: black;
    min-height:70px;
    width:100%;
    position: fixed;
    border-bottom:1px solid rgb(237, 145, 6);
}
.nav_links li{
    display: inline-block;
    margin:0.5rem;
    padding-left:5px;
    padding-right:5px;
}
.active {
    color:white !important;
    border-left:1px solid rgb(196, 196, 6);
}
.nav_links li a{
    transition: all 0.2s ease 0s;
}
.nav_links li a:hover{
    color: rgb(247, 247, 247);
}
button{
  background:rgba(0,0,0,0);
  border:none !important;
  outline:none;
    color:rgb(255, 217, 0);

}
button:hover{
    background-color: rgba(22, 41, 78, 0);
    color:rgb(255, 217, 0);
}

img {
    margin-left:1.5rem;
    margin-bottom:-15px;
}


@media only screen and (max-width: 524px) {
 .nav_links {
    text-decoration: none;
    display:flex;
    flex-direction: column;
}
}

</style>