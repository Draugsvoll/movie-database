<template>
    <li > {{ genre }} </li>
</template>

             <!-- :class="{ active: activeGenre == 'Documentary' }" -->




<script>
export default {
    data () {
        return {
        }
    },
    props: ['genre'],
}
</script>


<style  scoped>

</style>