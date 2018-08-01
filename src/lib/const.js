const modalTitle = '友情提示'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'
const REQUEST = 'REQUEST'
const ERROR_UNAUTHORIZED = 'ERROR_UNAUTHORIZED'
const globalConst = {
  getBanner: 'getBanner',
  doLoadConfig: 'doLoadConfig',
  getCompany: 'getCompany',
  getProfile: 'getProfile',
  doSetProfile: 'doSetProfile',
  getCatalogsList: 'getCatalogsList',
  getGoodsByCatalogs: 'getGoodsByCatalogs',
  getCombo: 'getCombo',
  getComboTop4: 'getComboTop4',
  getComboList: 'getComboList',
  getGoods: 'getGoods',
  getGoodsList: 'getGoodsList',
  getOrderList: 'getOrderList',
  getOrderFinsh: 'getOrderFinsh',
  loadProject: 'loadProject',
  doBuy: 'doBuy',
  doCartAddSku: 'doCartAddSku',
}
let methods = [SUCCESS.toLowerCase(), FAILURE.toLowerCase(), REQUEST.toLowerCase()]
const mutationNames = {}
for (let actionName in globalConst) {
  if (globalConst.hasOwnProperty(actionName)) {
    methods.forEach((method) => {
      if (!mutationNames[`${actionName}_${method}`]) {
        mutationNames[`${actionName}_${method}`] = `${actionName}_${method}`
      }
    })
  }
}

const pageSize = 10
const incomeStatus = {
  order: 0,
  reading: 1
}
const incomeStatusInfo = {
  [incomeStatus.order]: '订单收益',
  [incomeStatus.reading]: '阅读收益'
}
const orderStatus = {
  complete: 0,
  undone: 1,
  lose: -1
}
const depositStatus = {
  apply: 0,
  success: 1,
  fail: -1
}
const depositStatusInfo = {
  [depositStatus.apply]: {
    value: '申请中',
    mark: 'orange'
  },
  [depositStatus.success]: {
    value: '提现成功',
    mark: 'green'
  },
  [depositStatus.fail]: {
    value: '提现失败',
    mark: 'red'
  }
}
const cartGoodsType = {
  goods: 0,
  combo: 1
}
export {
  globalConst,
  modalTitle,
  pageSize,
  SUCCESS,
  FAILURE,
  REQUEST,
  ERROR_UNAUTHORIZED,
  mutationNames,
  incomeStatusInfo,
  incomeStatus,
  orderStatus,
  depositStatusInfo,
  depositStatus,
  cartGoodsType
}
