// * FETCH DEFAULT MOVIELIST (action)
import axios from 'axios'
const movies = []
axios.get('https://api.themoviedb.org/3/discover/movie?with_genres=28&api_key=889abe3247f9348a43ba33d2c9270735&language=en-US').then(resp => {
                resp.data.results.forEach(movie => {   
                    movies.push(movie)
                });
            })



const state = {
    movieList: { 
        genre:28,
        currentPage: 1, 
        movies: movies
        },
    genres: [],
}

const mutations = {
    'NEXT_PAGE' (state, currentPage) {
        var newPage = currentPage++
        state.movieList.movies = []
        state.movieList.currentPage = newPage
        var genre = state.movieList.genre
        axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=${genre}&api_key=889abe3247f9348a43ba33d2c9270735&language=en-US&page=${newPage}`).then(resp => {
                resp.data.results.forEach(movie => {   
                    state.movieList.movies.push(movie)
                });
            })
    },
    'PREV_PAGE' (state, currentPage) {
        var newPage = currentPage--
        state.movieList.movies = []
        state.movieList.currentPage = newPage
        var genre = state.movieList.genre
        axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=${genre}&api_key=889abe3247f9348a43ba33d2c9270735&language=en-US&page=${newPage}`).then(resp => {
                resp.data.results.forEach(movie => {   
                    state.movieList.movies.push(movie)
                });
            })
    },
    'FETCH_MOVIE_LIST' (state, genre) {
        state.movieList.movies = []
        state.movieList.currentPage = 1
        state.movieList.genre = genre
        var page = state.movieList.currentPage
        axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=${genre}&api_key=889abe3247f9348a43ba33d2c9270735&language=en-US&page=${page}`).then(resp => {
                resp.data.results.forEach(movie => {   
                    state.movieList.movies.push(movie)
                });
            })
    },
    'FETCH_GENRE_LIST' (state) {
        state.genreList = []
        axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=889abe3247f9348a43ba33d2c9270735&language=en-US`).then(resp => {
                console.log('response: ', resp.data.genres)
                resp = resp.data.genres
                resp.forEach( genre => {
                    const newGenre = { id: genre.id, name: genre.name }
                    state.genres.push(newGenre)
                })
                
            })
    },
}

const actions = {   // aviable actions on this site
    nextPage: ({ commit }, currentPage) => {
        commit('NEXT_PAGE', currentPage)  // commits 'BUY_STOCK' mutation defined in portfolio module
    },
    prevPage: ({ commit }, currentPage) => {
        commit('PREV_PAGE', currentPage)  // commits 'BUY_STOCK' mutation defined in portfolio module
    },
    fetchMovieList: ({ commit }, genre) => {
        commit('FETCH_MOVIE_LIST', genre)  // commits 'BUY_STOCK' mutation defined in portfolio module
    },
    fetchGenreList: ({ commit }) => {
        commit('FETCH_GENRE_LIST')  // commits 'BUY_STOCK' mutation defined in portfolio module
    }
    
}

const getters = {
    movies(state) {
        return state.movieList.movies
    },
    currentPage(state){
        return state.movieList.currentPage
    },
    genres (state) {
        return state.genres
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
}
