<template>
    <f7-page @page:init="init">
        <f7-navbar>
            <f7-nav-left :back-link="false" sliding></f7-nav-left>
            <f7-nav-center>购物车</f7-nav-center>
        </f7-navbar>

        {{cart}}
        <div>test :{{cart.goods}}</div>
        <section class="cart" v-if="cart.combo.length>0 || cart.goods.length>0">
            <header>商品</header>
            <f7-list media-list class="cart-list">
                <f7-list-item v-if="detail(goods) && detail(goods).detail" v-for="(goods,index) in cart" :key="index"
                              :media="itemMedia(goods)"
                              :title="detail(row).detail.name"
                              :subtitle="subtitleSku(goods)">
                    <div slot="after">
                        <counter :max-value="1000" :min-value="0" theme-style="amount-max"
                                 v-model="goods.quality" @changeValue="changeCounter" :baseData="goods"></counter>
                    </div>
                </f7-list-item>
                <f7-list-label>
                    <div class="total price">
                        <span>合计：</span>
                        <strong>{{totalGoods | toFixed}}</strong>
                        <span>元</span>
                    </div>
                </f7-list-label>
            </f7-list>
            <header>套餐</header>
            <f7-list media-list class="cart-list">
                <f7-list-item v-if="detail(goods) && detail(goods).detail" v-for="(goods,index) in cart" :key="index"
                              :media="itemMedia(goods)"
                              :title="detail(row).detail.name"
                              :subtitle="subtitleSku(goods)">
                    <div slot="after">
                        <counter :max-value="1000" :min-value="0" theme-style="amount-max"
                                 v-model="goods.quality" @changeValue="changeCounter" :baseData="goods"></counter>
                    </div>
                </f7-list-item>
                <f7-list-label>
                    <div class="total price">
                        <span>合计：</span>
                        <strong>{{totalGoods | toFixed}}</strong>
                        <span>元</span>
                    </div>
                </f7-list-label>
            </f7-list>
            <f7-list>
                <f7-list-item>
                    <f7-label>备注</f7-label>
                    <f7-input type="text" v-model="remark"/>
                </f7-list-item>
            </f7-list>
            <f7-block>
                <f7-button big active color="green" @click="pay">确定</f7-button>
            </f7-block>
        </section>
        <section v-else>
            <err-panel :showRefresh="false" msg="购物车还是空的哦～" iconName='iconfontgouwuchefuzhi'></err-panel>
        </section>
    </f7-page>
</template>

<script type="text/ecmascript-6">
  import Counter from 'components/counter/Counter'
  import { globalConst as native } from 'lib/const'
  import { mapState } from 'vuex'
  import { getMediaUrl } from 'lib/common'
  import { round, isEmptyObject } from 'lib/utils'
  import globalMixin from 'mixins/globalMixin'
  import { handleJump } from 'lib/common'

  export default {
    data () {
      return {
        gift: 0,
        addressTitle: '选择收货地址',
        score: -1,
        isStick: 0,
        remark: '',
        customDistrict: '',
        district: '',
        jianmian: {
          name: '',
          skuId: [],
          rule: []
        },
        currentRule: null,
        queryRule: {}
      }
    },
    mixins: [globalMixin],
    async created () {
      let {commit, dispatch} = this.$store
      commit('setActiveTabbarItem', 'cart')
      dispatch({
        type: native.doLoadDashboard
      })
      dispatch({
        type: native.doListAddress
      })
      dispatch({
        type: native.doLoadProfile
      })
    },
    methods: {
      init () {
        this.$f7.showToolbar('.toolbar')
      },
      subtitleSku (row) {
        const arrMater = this.detail(row).detail.material.split(',')
        const material = arrMater[row.material]
        const detail = this.detail(row).detail
        let html = ''
        return html + `<span class="price"><span>单价：</span><strong>${round(detail.price, 2)}</strong><span>元&nbsp;&nbsp;</span><span >${material}</span></span>`
      },
      // 单个商品详情
      detail (row) {
        return this.sku[`detail_${row.skuId}`]
      },
      itemMedia (row) {
        if (!this.detail(row)) {
          return
        }
        let mark = ''
        if (row.userId) {
          mark = '<span class=\'img-mark\'></span>'
        }
        return `<div class="wrap-img"><img src='${getMediaUrl()}sku_main_${this.detail(row).detail.id}_0.jpg' class='media_img'>${mark}</div>`
      },
      changeCounter ({baseData, value}) {
        this.$store.commit(native.doCartChangeSku, {
          skuId: baseData.skuId,
          material: baseData.material,
          quality: parseInt(value, 10)
        })
      },
      pay () {
        const {remark} = this
        const {cart} = this
        let {dispatch, commit} = this.$store
        let {skus} = cart
        const values = {
          skus: JSON.stringify(skus),
          remark,
        }
        dispatch(native.doBuy, {
          type: native.doBuy,
          ...values,
        }).then(({data}) => {
          commit(native.clearCart)
          commit(native.clearOrder)
          handleJump(data)
        }).catch((err) => {
          this.$f7.addNotification({
            media: '<span className=\'iconfont icon-error\'></span>',
            title: '错误',
            message: err,
            closeOnClick: true
          })
        })
      }
    },
    computed: {
      ...mapState({
        sku: ({catalogs}) => catalogs.sku,
      }),
      cart () {
        return this.$store.getters.getCart
      },
      /**
       * 商品总价格
       * @returns {number}
       */
      totalGoods () {
        return 0
      },
    },
    destroyed () {
      console.log('cart component destroyed')
    },
    components: {Counter}
  }
</script>
<style lang="scss" type="text/css">
    @import "../css/cart.scss";
</style>
