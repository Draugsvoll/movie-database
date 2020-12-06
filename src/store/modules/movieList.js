// * default movie list (action)
import axios from 'axios'
const movies = []
axios.get('https://api.themoviedb.org/3/discover/movie?with_genres=28&api_key=889abe3247f9348a43ba33d2c9270735&language=en-US').then(resp => {
                resp.data.results.forEach(movie => {   
                    movies.push(movie)
                });
            })

//* default tv list
const tv = []
axios.get(`https://api.themoviedb.org/3/discover/tv?with_genres=28&api_key=889abe3247f9348a43ba33d2c9270735&language=en-US`).then(resp => {
                resp.data.results.forEach(movie => {   
                    tv.push(movie)
                });
                state.tv = tv
            })


const state = {
    movieList: { 
        genre:28,
        currentPage: 1, 
        movies: movies
        },
    genres: [],
    tv: [],
    searchResult: [],
    favouriteMovies: ['peorbirepib'],
    favouriteTv: [],
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
    'NEXT_PAGE_TV' (state, currentPage) {
        var newPage = currentPage++
        state.tv = []
        state.movieList.currentPage = newPage
        var genre = state.movieList.genre
        axios.get(`https://api.themoviedb.org/3/discover/tv?with_genres=${genre}&api_key=889abe3247f9348a43ba33d2c9270735&language=en-US&page=${newPage}`).then(resp => {
                resp.data.results.forEach(movie => {   
                    state.tv.push(movie)
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
    'PREV_PAGE_TV' (state, currentPage) {
        var newPage = currentPage--
        state.tv = []
        state.movieList.currentPage = newPage
        var genre = state.movieList.genre
        axios.get(`https://api.themoviedb.org/3/discover/tv?with_genres=${genre}&api_key=889abe3247f9348a43ba33d2c9270735&language=en-US&page=${newPage}`).then(resp => {
                resp.data.results.forEach(movie => {   
                    state.tv.push(movie)
                });
            })
    },
    'FETCH_MOVIE_LIST' (state, genre) {
        state.movieList.movies = []
        state.tv = []
        state.movieList.currentPage = 1
        state.movieList.genre = genre
        var page = state.movieList.currentPage
        axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=${genre}&api_key=889abe3247f9348a43ba33d2c9270735&language=en-US&page=${page}`).then(resp => {
                resp.data.results.forEach(movie => {   
                    state.movieList.movies.push(movie)
                    // state.tv.push(movie)
                });
            })
    },
    'FETCH_TV_LIST' (state, genre) {
        state.movieList.movies = []
        state.tv = []
        state.movieList.currentPage = 1
        state.movieList.genre = genre
        var page = state.movieList.currentPage
        axios.get(`https://api.themoviedb.org/3/discover/tv?with_genres=${genre}&api_key=889abe3247f9348a43ba33d2c9270735&language=en-US&page=${page}`).then(resp => {
                resp.data.results.forEach(movie => {   
                    // state.movieList.movies.push(movie)
                    state.tv.push(movie)
                    console.log(movie)
                });
            })
    },
    'FETCH_GENRE_LIST' (state) {
        state.genreList = []
        axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=889abe3247f9348a43ba33d2c9270735&language=en-US`).then(resp => {
                resp = resp.data.genres
                resp.forEach( genre => {
                    const newGenre = { id: genre.id, name: genre.name }
                    state.genres.push(newGenre)
                })
                
            })
    },
    'FETCH_TV_GENRE_LIST' (state) {
        state.genreList = []
        axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=889abe3247f9348a43ba33d2c9270735&language=en-US`).then(resp => {
                console.log('response: ', resp.data.genres)
                state.genres = []
                resp = resp.data.genres
                resp.forEach( genre => {
                    const newGenre = { id: genre.id, name: genre.name }
                    state.genres.push(newGenre)
                })
                console.log('new tv genres: , ', state.genres)
            })
    },
    'GET_SEARCH_RESULTS' (state, searchResults) {
        state.movieList.movies = []
        state.searchResult = searchResults
    },
    'ADD_FAVOURITE_MOVIE' (state, movie) {
        state.favouriteMovies.push(movie)
        console.log('pushing to state: ', movie)
    },
    'FETCH_FAVOURITES' (state, movieList) {
        state.favouriteMovies = movieList
    },
}

const actions = {   // aviable actions on this site
    nextPage: ({ commit }, currentPage) => {
        commit('NEXT_PAGE', currentPage)  
    },
    nextPageTv: ({ commit }, currentPage) => {
        commit('NEXT_PAGE_TV', currentPage)  
    },
    prevPage: ({ commit }, currentPage) => {
        commit('PREV_PAGE', currentPage)  
    },
    prevPageTv: ({ commit }, currentPage) => {
        commit('PREV_PAGE_TV', currentPage)  
    },
    fetchMovieList: ({ commit }, genre) => {
        commit('FETCH_MOVIE_LIST', genre)  
    },
    fetchTvList: ({ commit }, genre) => {
        commit('FETCH_TV_LIST', genre)  
    },
    fetchGenreList: ({ commit }) => {
        commit('FETCH_GENRE_LIST')  
    },
    fetchTvGenreList: ({ commit }) => {
        commit('FETCH_TV_GENRE_LIST') 
    },
    searchResults: ({ commit }, searchResults) => {
        commit('GET_SEARCH_RESULTS', searchResults)  
    },
    addFavouriteMovie: ({ commit }, movie) => {
        commit('ADD_FAVOURITE_MOVIE', movie)  
    },
    fetchFavourites: ({ commit }, movieList) => {
        commit('FETCH_FAVOURITES', movieList)  
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
    },
    searchResults (state) {
        return state.movieList.movies
    },
    tv(state) {
        return state.tv
    },
    searchResult(state) {
        return state.searchResult
    },
    favouriteMovies(state) {
        return state.favouriteMovies
    },
    favouriteTv(state) {
        return state.favouriteTv
    },
}

export default {
    state,
    getters,
    mutations,
    actions,
}
