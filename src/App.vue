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
    padding-top:95px;
}
body, html {
  min-height: 100%;
  margin:0;
  padding:0;
  background: var(--background-color);
  color:white;
  font-family: sans-serif;
}
* {
  box-sizing: border-box;
}
</style>
