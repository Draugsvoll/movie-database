<template>
    <div class="container">
        <!-- <app-header></app-header> -->
        <iframe v-bind:src=" `https://www.youtube.com/embed/${trailer}?autoplay=1`" allow="autoplay" frameborder='0'  ></iframe>
        <a href="javascript:history.go(-1)"><button><div class="fas fa-arrow-left" ></div> Back</button></a>
        <div class="text2"><p>Some videos lack a youtube link. This is for display purposes only </p></div>
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
        // appHeader: Header
    },
    created () {
            Axios.get(`https://api.themoviedb.org/3/tv/${this.id}?api_key=889abe3247f9348a43ba33d2c9270735&language=en-US&append_to_response=videos,images`).then(resp => {
            //    console.log(resp)
               this.trailer = resp.data.videos.results[0].key
            })
    }
}
</script>


<style scoped>iframe {
    width:100%;
    height:90vh;
    outline:none;
    border:none;
    margin:auto;
    /* margin-top:125px; */
}
.container {
    margin:0;
    padding:0;
    display: flex;
    flex-direction: column;
}
.text {
    margin:auto;
}
.text2 {
    margin:auto;
    display:inline-flex;
}
p {
    margin:0 auto;
    margin-top:10px;
    font-size:10.5px;
}
a {
    margin:0 auto;   
}
button {
    width:5rem;
    margin:auto;
    border:none;
    font-size:20px;
    cursor:pointer;
    color:white;
    background:rgba(0,0,0,0)
}

.box {
    margin-top:50px;
}
</style>