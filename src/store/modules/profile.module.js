import api from 'api/api'
import { isEmptyObject, margeMutations } from 'lib/utils'
import { globalConst as native, mutationNames } from 'lib/const'
import Vue from 'vue'
import { applyClientMiddleware } from 'src/main'

let state = {
  profile: {},
}
let getters = {}
let actions = {
  [native.getProfile] ({state}, refs) {
    return applyClientMiddleware(api.getProfile)(refs)
  },
}
let mutations = {}
mutations = Object.assign(margeMutations(actions), mutations)
export {
  state,
  getters,
  actions,
  mutations
}
