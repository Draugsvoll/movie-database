<template>
    <div class="container">
        <app-header></app-header>
        <iframe v-bind:src=" `https://www.youtube.com/embed/${trailer}?autoplay=1`" allow="autoplay" frameborder='0'  ></iframe>
    </div>
</template>


<script>
import Axios from 'axios'
import Header from '../Header'

export default {    
    data () {
        return {
            id: this.$route.query.id,
            trailer: ''
        }
    },
    components: {
        appHeader: Header
    },
    created () {
            Axios.get(`https://api.themoviedb.org/3/movie/${this.id}?api_key=889abe3247f9348a43ba33d2c9270735&language=en-US&append_to_response=videos,images`).then(resp => {
               console.log(resp)
               this.trailer = resp.data.videos.results[0].key
            })
    }
}
</script>


<style scoped>
iframe {
    width:80%;
    height:80vh;
    outline:none;
    border:none;
    margin:auto;
}
.container {
    margin:0;
    padding:0;
}
</style>