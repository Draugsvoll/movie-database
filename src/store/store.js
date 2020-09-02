import Vue from 'vue'
import Vuex from 'vuex'

// import modules
import infoMovie from './modules/infoMovie'
import movieList from './modules/movieList'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {  // add the modules from store
        infoMovie,
        movieList
    }
})