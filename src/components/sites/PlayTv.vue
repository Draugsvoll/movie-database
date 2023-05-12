<template>
    <div class="container">
        <!-- <app-header></app-header> -->
        <iframe v-bind:src=" `https://www.youtube.com/embed/${trailer}?autoplay=1`" allow="autoplay" frameborder='0'  ></iframe>
        <div class="btn-row">
            <a href="javascript:history.go(-1)"><button><div class="fas fa-arrow-left" ></div> Back</button></a> 
            <p>Not playing? try <a href="javascript:window.location.reload()">refresh</a> </p>
        </div>
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
    height:93vh;
    outline:none;
    border:none;
    margin:auto;
    /* margin-top:125px; */
}
.btn-refresh {
    width:5rem;
}
.btn-row {
    display:flex;
    justify-content: center;
}
.btn-row > * {
    display:block;
    padding-top:0.7rem;
}
.btn-row p {
    margin:auto 0;
    height:fit-content;
    margin-left:1rem;
    font-size: 0.75rem;
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
    margin:auto 0; 
}
button {
    padding:5px;
    margin: auto;
}

.box {
    margin-top:50px;
}
</style>