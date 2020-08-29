<template>
    <div id="genre">
            <ul>
                <li @click=" $emit('fetch-genre', 28); changeActiveGenre('Action')"
                    :class="{ active: activeGenre == 'Action'}">                        Action</li>
                <li @click="$emit('fetch-genre', 35); changeActiveGenre('Comedy')"
                    :class="{ active: activeGenre == 'Comedy'}">                        Comedy</li>
                <li @click="$emit('fetch-genre', 18); changeActiveGenre('Drama')"
                    :class="{ active: activeGenre == 'Drama'}">                         Drama</li>
                <li @click="$emit('fetch-genre', 99); changeActiveGenre('Documentary')"
                    :class="{ active: activeGenre == 'Documentary'}">                   Documentary</li>
                <li @click="$emit('fetch-genre', 10751); changeActiveGenre('Family')"
                    :class="{ active: activeGenre == 'Family'}">                        Family</li>  
                <li @click="$emit('fetch-genre', 53); changeActiveGenre('Thriller')"
                    :class="{ active: activeGenre == 'Thriller'}">                      Thriller</li>  
            </ul>
             
    </div>
</template>





<script>
export default {
    data () {
        return {
            activeGenre: 'Action'
        }
    },
    methods: {
        changeActiveGenre (active) {
            this.activeGenre = active
        }
    }
    
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
    border-left: 2px solid rgb(190, 188, 188);

}

.active {
    color:rgb(254, 254, 255);
text-decoration: underline;
}



</style>