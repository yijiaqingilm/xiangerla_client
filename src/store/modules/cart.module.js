import api from 'api/api'
import { isEmptyObject } from 'lib/utils'
import { globalConst as native, mutationNames, cartGoodsType } from 'lib/const'
import Vue from 'vue'
import { applyClientMiddleware } from 'src/main'

let state = {
  cart: {
    goods: [],
    combo: []
  },
}
let getters = {
  getCart (state, getters, rootState) {
    return state.cart
  }
}
let actions = {
  [native.doBuy] ({commit, state}, refs) {
    return applyClientMiddleware(api.doBuy)(refs)
  },
}
let mutations = {
  [native.clearCart] (state) {
    state.cart.combo = []
    state.cart.goods = []
  },
  [mutationNames.doBuy_request] (state, refs) {},
  [mutationNames.doBuy_success] (state, {data}) {
    localStorage.removeItem('cart')
  },
  [mutationNames.doBuy_failure] (state, {error}) {},
  [native.doCartAddSku] ({cart}, {itemId, mode}) {
    let quantity = 1
    switch (mode) {
      case cartGoodsType.goods: {
        const newGoods = cart.goods.filter((goods) => {
          if (goods.goodsId === itemId) {
            quantity = goods.quantity + 1
            return false
          }
          return true
        })
        newGoods.push({
          goodsId: itemId,
          quantity
        })
        cart.goods = newGoods
        break
      }
      case cartGoodsType.combo: {
        const newCombo = cart.goods.filter((combo) => {
          if (combo.comboId === itemId) {
            quantity = combo.quantity + 1
            return false
          }
          return true
        })
        newCombo.push({
          comboId: itemId,
          quantity
        })
        cart.combo = newCombo
        break
      }
    }
    localStorage.setItem('cart', JSON.stringify(cart))
  },
  [native.doCartChangeSku] (state, {itemId, mode, quantity}) {
    let {goods, combo} = state.cart
    switch (mode) {
      case cartGoodsType.goods: {
        const newGoods = goods.filter((row) => {
          if (row.goodsId === itemId) {
            return false
          }
          return true
        })
        if (quantity > 0) {
          newGoods.push({
            goodsId: itemId,
            quantity
          })
        }
        state.cart.goods = newGoods
        break
      }
      case cartGoodsType.combo: {
        const newCombo = combo.filter((row) => {
          if (row.comboId === itemId) {
            return false
          }
          return true
        })
        if (quantity > 0) {
          newCombo.push({
            comboId: itemId,
            quantity
          })
        }
        state.cart.combo = newCombo
        break
      }

    }
    localStorage.setItem('cart', JSON.stringify(state.cart))
  },

}

export {
  state,
  getters,
  actions,
  mutations
}
