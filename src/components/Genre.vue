<template>
    <li > {{ genre.name }} </li>
</template>





<script>
export default {
    data () {
        return {
        }
    },
    props: ['genre'],
}
</script>


<style scoped>
    li {
        letter-spacing:0.05rem;
    }
</style>