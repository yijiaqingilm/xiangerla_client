import { globalConst as native } from 'lib/const'

class ApiConfig {
  constructor (name, url, config, method = 'post') {
    this.name = name
    this.url = url
    this.method = method
    if (config && typeof config === 'object') {
      this.config = config
      this.method = method
    } else if (config && typeof config === 'string') {
      this.method = config
    } else {
      this.config = {}
    }

  }
}

let apiConfig = [
  new ApiConfig(native.doLoadConfig, '/api/wechat/config'),
  new ApiConfig(native.getBanner, '/api/common/banner'),
  new ApiConfig(native.getCompany, '/api/company/info'),
  new ApiConfig(native.getProfile, '/api/user/profile'),
  new ApiConfig(native.doSetProfile, '/api/user/set'),
  new ApiConfig(native.getCatalogsList, '/api/shop/catalogs/list'),
  new ApiConfig(native.getGoodsByCatalogs, '/api/shop/catalogs/goods'),
  new ApiConfig(native.getCombo, '/api/shop/combo/info'),
  new ApiConfig(native.getComboTop4, '/api/shop/combo/top4'),
  new ApiConfig(native.getComboList, '/api/shop/combo/list'),
  new ApiConfig(native.getGoods, '/api/shop/goods/info'),
  new ApiConfig(native.getGoodsList, '/api/shop/goods/list'),
  new ApiConfig(native.getOrderList, '/api/order/list'),
  new ApiConfig(native.getOrderFinsh, '/api/order/finsh'),
  new ApiConfig(native.loadProject, '/api/user/project'),
  new ApiConfig(native.doBuy, '/api/user/buy')
]
export default apiConfig
