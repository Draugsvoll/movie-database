// * FETCH MOVIELIST
import axios from 'axios'
const movies = []
axios.get('https://api.themoviedb.org/3/discover/movie?with_genres=28&api_key=889abe3247f9348a43ba33d2c9270735&language=en-US').then(resp => {
                resp.data.results.forEach(movie => {   
                    movies.push(movie)
                });
            })
//*


const state = {
    movieList: { 
        genre:'Action',
        currentPage: 1, 
        movies: movies
    },
}

const mutations = {
    'NEXT_PAGE' (state, currentPage) {
        var newPage = currentPage++
        state.movieList.movies = []
        state.movieList.currentPage = newPage
        axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=28&api_key=889abe3247f9348a43ba33d2c9270735&language=en-US&page=${newPage}`).then(resp => {
                resp.data.results.forEach(movie => {   
                    state.movieList.movies.push(movie)
                });
            })
    },
    'PREV_PAGE' (state, currentPage) {
        var newPage = currentPage--
        state.movieList.movies = []
        state.movieList.currentPage = newPage
        axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=28&api_key=889abe3247f9348a43ba33d2c9270735&language=en-US&page=${newPage}`).then(resp => {
                resp.data.results.forEach(movie => {   
                    state.movieList.movies.push(movie)
                });
            })
    },
}

const actions = {   // aviable actions on this site
    nextPage: ({ commit }, currentPage) => {
        commit('NEXT_PAGE', currentPage)  // commits 'BUY_STOCK' mutation defined in portfolio module
    },
    prevPage: ({ commit }, currentPage) => {
        commit('PREV_PAGE', currentPage)  // commits 'BUY_STOCK' mutation defined in portfolio module
    }
}

const getters = {
    movies(state) {
        return state.movieList.movies
    },
    currentPage(state){
        return state.movieList.currentPage
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
}
