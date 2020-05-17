import MainScreen from './MainScreen.svelte'
import OneSeries from './OneSeries.svelte'

function userIsAdmin() {
  //check if user is admin and returns true or false
}

const routes = [
  {
    name: '/',
    component: MainScreen
  },
  {
    name: 'series/:id',
    component: OneSeries
  }
]

export { routes }
