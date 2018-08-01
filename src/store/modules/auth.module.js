import api from 'api/api'
import { isEmptyObject, margeMutations } from 'lib/utils'
import { globalConst as native, mutationNames } from 'lib/const'
import Vue from 'vue'
import { applyClientMiddleware } from 'src/main'

let state = {
  wxConfig: {}
}
let getters = {}
let actions = {
  [native.doLoadConfig] ({state}, refs) {
    if (isEmptyObject(state.wxConfig)) {
      return applyClientMiddleware(api.doLoadConfig)(refs)
    }
  }
}
let mutations = {}
mutations = Object.assign(margeMutations(actions), mutations)
export {
  state,
  getters,
  actions,
  mutations
}
