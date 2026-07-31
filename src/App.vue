<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>


<script>
export default {
  data () {
    return {
      infoMovie: '',
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


<style>
.container {
  display: flex;
  padding-top: calc(var(--header-height, 4rem) + var(--header-gap, 0.5rem));
}
body, html {
  min-height: 100%;
  margin: 0;
  padding: 0;
  background: var(--background-color);
  color: var(--white-font);
  font-family: var(--font-sans);
}
* {
  box-sizing: border-box;
}
a {
  color: inherit;
  text-decoration: none;
}
button {
  font-family: inherit;
}
img {
  max-width: 100%;
}
</style>
