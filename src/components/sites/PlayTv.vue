<template>
    <div class="container">
        <iframe v-bind:src=" `https://www.youtube.com/embed/${trailer}?autoplay=1`" allow="autoplay" frameborder='0'  ></iframe>
        <div class="btn-row">
            <a href="javascript:history.go(-1)"><button><i class="fas fa-arrow-left"></i> Back</button></a> 
            <p>Not playing? <a href="javascript:window.location.reload()">Refresh</a></p>
        </div>
    </div>
</template>


<script>
import Axios from 'axios'

export default {    
    data () {
        return {
            id: this.$route.query.id,
            trailer: ''
        }
    },
    components: {
    },
    created () {
            Axios.get(`https://api.themoviedb.org/3/tv/${this.id}?api_key=889abe3247f9348a43ba33d2c9270735&language=en-US&append_to_response=videos,images`).then(resp => {
               this.trailer = resp.data.videos.results[0].key
            })
    }
}
</script>


<style scoped>
iframe {
    width: 100%;
    height: calc(100vh - var(--header-height, 4rem));
    min-height: 20rem;
    outline: none;
    border: none;
    margin: auto;
    background: #000;
}
.container {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: var(--background-color);
}
.btn-row {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1rem var(--page-pad-x, 1.75rem);
    flex-wrap: wrap;
    border-top: 1px solid var(--border-subtle, rgba(255,255,255,0.055));
}
.btn-row p {
    margin: 0;
    font-size: var(--text-xs, 0.82rem);
    color: var(--text-secondary, #97a0aa);
}
.btn-row p a {
    color: var(--primary-color);
    font-weight: 600;
    text-decoration: none;
}
.btn-row p a:hover {
    text-decoration: underline;
}
button {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.7rem 1.2rem;
    background: transparent;
    color: white;
    border: 1px solid rgba(41, 171, 194, 0.5);
    font-size: var(--text-sm, 0.92rem);
    font-weight: 600;
    border-radius: var(--radius-md, 8px);
    cursor: pointer;
    transition: background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}
button:hover {
    background: var(--primary-muted, rgba(41, 171, 194, 0.15));
    border-color: var(--primary-color);
    box-shadow: 0 0 12px var(--primary-glow, rgba(41, 171, 194, 0.35));
}
</style>
