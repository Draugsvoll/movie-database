<template>
    <div id="genre">
            <ul>
                <li v-for="genre in genres" v-bind:genre="genre" :key="genre.id" ></li>
            </ul>
             <!-- :class="{ active: activeGenre == 'Documentary' }" -->
    </div>
</template>





<script>

export default {
    data () {
        return {
            activeGenre: 'Action',
            genreId: 0,
            genres: ['Action', 'Comedy', 'Drama', 'Documentary', 'Family', 'Thriller']
        }
    },
    methods: {
        // @click calls this method and changes 'active' element
        changeActiveGenre (active) {
            this.activeGenre = active
        },
        
    },
}
</script>




<style scoped>
ul{
    list-style: none;
    margin:10px 0 0 0;
    padding:0;

}

#genre {
    width:20%;
    height:100%;
    position: fixed;
    
}

h1 {
    text-align: center;
}

li {
    margin-left: 15%;
    padding: 5px;
    margin-bottom: 10px;
    font-size: 22px;
    cursor: pointer;
    width:60%;
    border-left: 1px solid  rgb(33, 33, 34);
    color:grey;
}

li:hover {
    border-left: 2px solid white;
    color:white;

}

.active {
    color:rgb(254, 254, 255);
text-decoration: underline;
}

</style>