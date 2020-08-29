
const state = {
    active_keyboard: { 
        grid_keyboard: 1,
        infopage_keyboard: 0
    },
}

const mutations = { // mutations -> listens to triggers to update state
    'ACTIVATE_GRID_KEYBOARD'(state) {   
        state.active_keyboard.grid_keyboard = 1,
        state.active_keyboard.infopage_keyboard = 0
    },
    'ACTIVATE_INFOPAGE_KEYBOARD'(state) {   
        state.active_keyboard.grid_keyboard = 0,
        state.active_keyboard.infopage_keyboard = 1
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
        grid_keyboard(state) {
            return state.active_keyboard.grid_keyboard
        },
        infopage_keyboard(state) {
            return state.active_keyboard.infopage_keyboard
        }
}

export default {
    state,
    mutations,
    actions,
    getters
}