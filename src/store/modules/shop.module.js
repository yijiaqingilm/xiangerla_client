import api from 'api/api'
import { isEmptyObject, margeMutations } from 'lib/utils'
import { globalConst as native, mutationNames } from 'lib/const'
import Vue from 'vue'
import { applyClientMiddleware } from 'src/main'

let state = {
  comboTop4: [],
  goodsLoading: true,
  goodsError: null,
  goods: {}
}
let getters = {}
let actions = {
  [native.getGoodsList] ({state}, refs) {
    return applyClientMiddleware(api.getGoodsList)(refs)
  },
  [native.getComboTop4] ({state}, refs) {
    return applyClientMiddleware(api.getComboTop4)(refs)
  },
  [native.getBanner] ({state}, refs) {
    return applyClientMiddleware(api.getBanner)(refs)
  },
  [native.getComboList] ({state}, refs) {
    return applyClientMiddleware(api.getComboList)(refs)
  },
  [native.getCombo] ({state}, refs) {
    return applyClientMiddleware(api.getCombo)(refs)
  },
  [native.getCatalogsList] ({state}, refs) {
    return applyClientMiddleware(api.getCatalogsList)(refs)
  },
  [native.getGoodsByCatalogs] ({state}, refs) {
    return applyClientMiddleware(api.getGoodsByCatalogs)(refs)
  },
  [native.getGoods] ({state}, refs) {
    let {goodsId} = refs
    console.log('state====', state)
    if (!state.goods[`detail_${goodsId}`]) {
      return applyClientMiddleware(api.getGoods)(refs)
    } else {
      state.goodsLoading = false
      state.goodsError = null
      return Promise.resolve(state.goods[`detail_${goodsId}`])
    }
  },

}
let mutations = {
  [mutationNames.getGoods_request] (state) {
    state.goodsLoading = true
    state.goodsError = null
  },
  [mutationNames.getGoods_failure] (state, {error}) {
    state.goodsLoading = false
    state.goodsError = error
  },
  [mutationNames.getGoods_success] (state, {data, refs}) {
    state.goodsLoading = false
    state.goodsError = null
    let {goodsId} = refs
    Vue.set(state.goods, `detail_${goodsId}`, data)
  },
  [mutationNames.getComboTop4_success] (state, {data}) {
    state.comboTop4 = data
  }
}
mutations = Object.assign(margeMutations(actions), mutations)
export {
  state,
  getters,
  actions,
  mutations
}
