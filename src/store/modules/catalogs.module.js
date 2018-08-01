import api from 'api/api'
import { isEmptyObject, margeMutations } from 'lib/utils'
import { globalConst as native, mutationNames } from 'lib/const'
import Vue from 'vue'
import { applyClientMiddleware } from 'src/main'

let state = {
  catalogs: [],
  listLoading: true,
  listError: null
}
let getters = {}
let actions = {
  [native.getCatalogsList] ({state}, refs) {
    return applyClientMiddleware(api.getCatalogsList)(refs)
  },
}
let mutations = {
  [mutationNames.getCatalogsList_request] (state) {
    state.listLoading = true
    state.listError = null
  },
  [mutationNames.getCatalogsList_failure] (state, {error}) {
    state.listLoading = false
    state.listError = error
  },
  [mutationNames.getCatalogsList_success] (state, {data}) {
    state.listLoading = false
    state.listError = null
    state.catalogs = data
  }
}
mutations = Object.assign(margeMutations(actions), mutations)
export {
  state,
  getters,
  actions,
  mutations
}
