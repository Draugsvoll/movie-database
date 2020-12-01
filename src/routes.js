import Movies from './components/sites/Movies'
import TV from './components/sites/TV'
import Search from './components/sites/Search'
import PlayMovie from './components/sites/PlayMovie'
import PlayTv from './components/sites/PlayTv'


export const routes = [
    { path: '/movies', component: Movies},
    { path: '/tv', component: TV},
    { path: '/search', component: Search},
    { path: '/playmovie', component: PlayMovie},
    { path: '/playtv', component: PlayTv},
]