import Vue from 'vue'
import Vuex from 'vuex'
import * as profile from './modules/profile.module'
import * as shop from './modules/shop.module'
import * as order from './modules/order.module'
import * as auth from './modules/auth.module'
import * as catalogs from './modules/catalogs.module'
import * as cart from './modules/cart.module'
import { globalConst as native } from 'lib/const'

Vue.use(Vuex)

export default new Vuex.Store({
  /* actions,*/
  state: {
    showLoading: false,
    loadingMsg: 'Loading...',
    sessionkey: '',
    credential: {
      token: '',
      expireTime: ''
    },
    activeTabbarItem: 'home',
  },
  mutations: {
    setActiveTabbarItem (state, item = 'home') {
      state.activeTabbarItem = item
    },
    setCredential (state, nowCredential) {
      state.credential = nowCredential
    },
  },
  actions: {},
  modules: {profile, shop, order, auth, catalogs, cart}
})
