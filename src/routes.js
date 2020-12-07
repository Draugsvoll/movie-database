import firebase from 'firebase'

import Movies from './components/sites/Movies'
import TV from './components/sites/TV'
import Search from './components/sites/Search'
import PlayMovie from './components/sites/PlayMovie'
import PlayTv from './components/sites/PlayTv'
import InfoPageTv from './components/sites/InfoPageTv'
import InfoPageMovie from './components/sites/InfoPageMovie'
import Favourites from './components/sites/Favourites'

import Login from './components/sites/Login'
import VueRouter from 'vue-router'
import Vue from 'vue'

Vue.use(VueRouter)

const router = new VueRouter ({
    mode: 'history',
    routes : [
        { path: '/movies', component: Movies, meta: { requiresAuth: true } },
        { path: '/tv', component: TV, meta: { requiresAuth: true } },
        { path: '/search', component: Search, meta: { requiresAuth: true } },
        { path: '/search?type=movie', component: Search, meta: { requiresAuth: true } },
        { path: '/playmovie', component: PlayMovie, meta: { requiresAuth: true } },
        { path: '/playtv', component: PlayTv, meta: { requiresAuth: true } },
        { path: '/infopagetv', component: InfoPageTv, meta: { requiresAuth: true } },
        { path: '/infopagemovie', component: InfoPageMovie, meta: { requiresAuth: true } },
        { path: '/favourites', component: Favourites, meta: { requiresAuth: true } },
        { path: '/', component: Login},
    ]
})



router.beforeEach((to, from, next) => {
    const currentUser = firebase.auth().currentUser
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth) 
    console.log('user ', currentUser)
    
    if ( requiresAuth ) {
        if ( currentUser ) {
            next()
        }
        else {
            // go to login if user is not logged in
            next('/')
        }
    }
    else {
        next()
    }
})

export default router