<template>
  <div id="app">
        <router-view></router-view>
    </div>
</template>


<script>
// import Footer from './components/Footer'

export default {
  data () {
    return {
      infoMovie: '',
      // path: this.$route.path
    }
  },
  name: 'App',
  components: {
  },
  methods: {

  },
  created() {
  }
}
</script>


<style >
.container {
  display: flex;
    padding-top:100px;
}
body, html {
  min-height: 100%;
  margin:0;
  padding:0;
  background: rgb(0, 0, 0);
  color:white;
  font-family: sans-serif;
}
</style>
