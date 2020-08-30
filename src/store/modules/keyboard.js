
const state = {
    active_keyboard: { 
        grid_keyboard: false,
        infopage_keyboard: false,
        genre_keyboard: true,
    },
}

const mutations = { // mutations -> listens to triggers to update state
    'ACTIVATE_GRID_KEYBOARD'(state) {   
        state.active_keyboard.grid_keyboard = true,
        state.active_keyboard.infopage_keyboard = false,
        state.active_keyboard.genre_keyboard = false
    },
    'ACTIVATE_INFOPAGE_KEYBOARD'(state) {   
        state.active_keyboard.grid_keyboard = false,
        state.active_keyboard.infopage_keyboard = true,
        state.active_keyboard.genre_keyboard = false
    },
    'ACTIVATE_GENRE_KEYBOARD'(state) {   
        state.active_keyboard.grid_keyboard = false,
        state.active_keyboard.infopage_keyboard = false,
        state.active_keyboard.genre_keyboard = true
    },
}

const actions = {   // available actions on this site
    activate_grid_keyboard({commit}) {
        commit('ACTIVATE_GRID_KEYBOARD')
    },
    activate_infopage_keyboard({commit}) {
        commit('ACTIVATE_INFOPAGE_KEYBOARD')
    },
    activate_genre_keyboard({commit}) {
        commit('ACTIVATE_GENRE_KEYBOARD')
    }
}


const getters = {   
        grid_keyboard(state) {
            return state.active_keyboard.grid_keyboard
        },
        infopage_keyboard(state) {
            return state.active_keyboard.infopage_keyboard
        },
        genre_keyboard(state) {
            return state.active_keyboard.genre_keyboard
        },
}

export default {
    state,
    mutations,
    actions,
    getters
}