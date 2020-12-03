import Movies from './components/sites/Movies'
import TV from './components/sites/TV'
import Search from './components/sites/Search'
import PlayMovie from './components/sites/PlayMovie'
import PlayTv from './components/sites/PlayTv'
import InfoPageTv from './components/sites/InfoPageTv'
import InfoPageMovie from './components/sites/InfoPageMovie'
import Favourites from './components/sites/Favourites'


export const routes = [
    { path: '/movies', component: Movies},
    { path: '/tv', component: TV},
    { path: '/search', component: Search},
    { path: '/search?type=movie', component: Search},
    { path: '/playmovie', component: PlayMovie},
    { path: '/playtv', component: PlayTv},
    { path: '/infopagetv', component: InfoPageTv},
    { path: '/infopagemovie', component: InfoPageMovie},
    { path: '/favourites', component: Favourites},
]