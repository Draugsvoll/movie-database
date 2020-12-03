
const state = {
    infoMovie: { 
        title:'',
        poster_path: '', 
        overview: '',
        id: ''
    },
}

const mutations = { // mutations -> listens to triggers to update state
    'SET_INFOMOVIE'(state, { movieTitle, movieTitle2,moviePosterPath,moviePosterPath2, movieOverview, movieRelease, movieVote, movieId }) {   // disse data kommer fra 
        if ( movieTitle === undefined ) {
            movieTitle = ''
        }
        if ( movieTitle2 === undefined ) {
            movieTitle2 = ''
        }
        if ( moviePosterPath === undefined ) {
            moviePosterPath = moviePosterPath2
        }
        const newInfoMovie = {
            title: movieTitle + movieTitle2,
            poster_path: moviePosterPath,
            overview: movieOverview,
            release_date: movieRelease,
            average_vote: movieVote,
            id: movieId
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