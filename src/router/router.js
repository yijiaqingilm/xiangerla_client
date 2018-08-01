import Jump from 'src/pages/Jump'
import Err from 'src/pages/Err'
import myRouter from './myRouter'
import Home from 'src/pages/Home'
import Catalogs from 'src/pages/catalogs/Catalogs'
import Goods from 'src/pages/catalogs/Goods'
import Cart from 'src/pages/Cart'

let router = [
  {path: '/jump', component: Jump},
  {path: '/error', component: Err},
  {path: '/home', component: Home},
  {path: '/catalogs', component: Catalogs},
  {path: '/catalogs/goods/:goodsId', component: Goods},
  {path: '/cart', component: Cart}
]
export default [].concat(router).concat(myRouter)
