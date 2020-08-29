
const state = {
    active_keyboard: { 
        grid_keyboard: true,
        infopage_keyboard: false,
    },
}

const mutations = { // mutations -> listens to triggers to update state
    'ACTIVATE_GRID_KEYBOARD'(state) {   // disse data kommer fra 
        state.grid_keyboard = true
        state.infopage_keyboard = false
    },
    'ACTIVATE_INFOPAGE_KEYBOARD'(state) {   // disse data kommer fra 
        state.grid_keyboard = false,
        state.infopage_keyboard = true
    }
}

const actions = {   // available actions on this site
    activate_grid_keyboard({commit}) {
        commit('ACTIVATE_GRID_KEYBOARD')
    },
    activate_infopage_keyboard({commit}) {
        commit('ACTIVATE_INFOPAGE_KEYBOARD')
    }
}


const getters = {   
        active_keyboard(state) {
            return state.active_keyboard
        }
}

export default {
    state,
    mutations,
    actions,
    getters
}