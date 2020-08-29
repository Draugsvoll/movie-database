import Vue from 'vue'
import Vuex from 'vuex'

// import modules
import infoMovie from './modules/infoMovie'
import keyboard from './modules/keyboard'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {  // add the modules from store
        infoMovie,
        keyboard
    }
})