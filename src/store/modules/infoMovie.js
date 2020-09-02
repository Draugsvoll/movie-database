
const state = {
    infoMovie: { 
        title:'',
        poster_path: '', 
        overview: ''
    },
}

const mutations = { // mutations -> listens to triggers to update state
    'SET_INFOMOVIE'(state, {movieTitle, moviePosterPath, movieOverview, movieRelease, movieVote}) {   // disse data kommer fra 
        const newInfoMovie = {
            title: movieTitle,
            poster_path: moviePosterPath,
            overview: movieOverview,
            release_date: movieRelease,
            average_vote: movieVote
        }
        state.infoMovie = newInfoMovie
    }
}

const actions = {   // available actions on this site
    setInfoMovie({commit}, movie) {
        commit('SET_INFOMOVIE', movie)
    }
}


const getters = {   
        infoMovie(state) {
            return state.infoMovie
        }
}

export default {
    state,
    mutations,
    actions,
    getters
}