<template>
    <div id="genre">
            <ul>
                <!-- @click updates 'active' element and fetches the genre -->
                <!-- checking for either 'activeGenre' or 'index' to update active. We have 2 ways to use menu -->
                <li @click="changeActiveGenre('Action'),  $emit('fetch-genre', 28);"
                    v-bind:class="{ active: (activeGenre == 'Action') || index==0}">                  Action</li>

                <li @click="$emit('fetch-genre', 35); changeActiveGenre('Comedy')"
                    :class="{ active: activeGenre == 'Comedy' || index == 1}">                        Comedy</li>

                <li @click="$emit('fetch-genre', 18); changeActiveGenre('Drama')"
                    :class="{ active: activeGenre == 'Drama' || index == 2}">                         Drama</li>

                <li @click="$emit('fetch-genre', 99); changeActiveGenre('Documentary')"
                    :class="{ active: activeGenre == 'Documentary' || index == 3}">                   Documentary</li>

                <li @click="$emit('fetch-genre', 10751); changeActiveGenre('Family')"
                    :class="{ active: activeGenre == 'Family' || index == 4}">                        Family</li>  

                <li @click="$emit('fetch-genre', 53); changeActiveGenre('Thriller')"
                    :class="{ active: activeGenre == 'Thriller' || index == 5}">                      Thriller</li>  
            </ul>
             
    </div>
</template>





<script>
import {mapGetters} from 'vuex'

export default {
    data () {
        return {
            activeGenre: 'Action',
            genreId: 0,
            index: 0
        }
    },
    methods: {
        // @click calls this method and changes 'active' element
        changeActiveGenre (active) {
            this.index = -1
            this.activeGenre = active
        },
        
    },
    computed: {
        ...mapGetters({
            genreKeyboard: 'genre_keyboard'
        })
    },
    mounted () {
        window.addEventListener("keyup", (e) => {

                // only listen to input if 'movie-grid-keyboard' is active    
                if(this.genreKeyboard == true) {
                    let keyCode = e.keyCode;

                    // down arrow
                    if(keyCode === 40){
                        if(this.index < 5) {
                        this.activeGenre = ''
                        console.log("Moved down");
                        this.index += 1
                        console.log(this.index)
                        }
                    }

                    // up arrow
                    if(keyCode === 38) {
                        if (this.index > 0) {
                        console.log("Moved up");
                        this.index -= 1
                        console.log(this.index)
                        }
                    }

                     // set correct genre for v-bind style - and for fetch genre method
                    switch (this.index) {
                        case 0:
                            this.activeGenre = 'Action'
                            this.genreId = 28
                            break;
                        case 1:
                            this.activeGenre = 'Comedy'
                            this.genreId = 35
                            break;
                        case 2:
                            this.activeGenre = 'Drama'
                            this.genreId = 18
                            break;
                        case 3:
                            this.activeGenre = 'Documentary'
                            this.genreId = 99
                            break;
                        case 4:
                            this.activeGenre = 'Family'
                            this.genreId = 10751
                            break;
                        case 5:
                            this.activeGenre = 'Thriller'
                            this.genreId = 53
                            break;
                        default:
                            console.log(`refresh for correct index`);
                        }
                     
                    // enter key -> fetch a genre
                    if(keyCode === 13) {
                        console.log("Enter");
                        console.log('fetching: ',this.activeGenre)
                        this.$store.dispatch('activate_grid_keyboard')
                        this.$emit('fetch-genre', this.genreId)
                    }
                }
        });
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
    color:rgb(198, 206, 219);

}

.active {
    color:rgb(254, 254, 255);
text-decoration: underline;
}

</style>