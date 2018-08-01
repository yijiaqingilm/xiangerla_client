<template>
    <f7-page no-toolbar @page:init="init">
        <f7-navbar>
            <f7-nav-left>
                <f7-link @click="goHome"><i class="icon icon-back"></i><span>返回</span></f7-link>
            </f7-nav-left>
            <f7-nav-center>{{ detail && detail.name}}</f7-nav-center>
            <f7-nav-right>
                <cart-icon></cart-icon>
            </f7-nav-right>
        </f7-navbar>
        {{detail}}
        <section v-if="goodsLoading">
            <preloader title="正在加载商品信息"></preloader>
        </section>
        <section v-if="!goodsLoading && goodsError">
            <err-panel @onRefresh="refresh" :msg="goodsError"></err-panel>
        </section>
        <section class="wrap" v-if="!goodsLoading && !goodsError && detail">
            <section class="sku_detail">
                <img :src="mediaUrl()" class="goods_img" alt="">
                <div class="title">{{detail.name}}</div>
                <div v-if="detail.remark" class="remark">{{detail.remark}}</div>
                <div class='remarkcontainer'>
                    <div v-if="detail.oprice" class='originalprice'>原价：<strike>¥{{detail.oprice
                        | toFixed}}</strike></div>
                    <div class='price'>现价：¥{{detail.price | toFixed}}</div>

                    <span class='unit'>{{detail.unit}}</span>
                    <div v-if="detail.score > 0" class='score'>可用积分：{{detail.score}}</div>
                    <!-- <div v-if="arrStock[material] < 10" class='stock'>仅剩余：{{arrStock[material]}}{{detail.unit}}</div>-->
                </div>
            </section>
            <section class="detailcontainer">
                <header class="header">商品详情</header>
                <!--<div v-if="detail.detailPicCount > 0">
                    <img v-for="(index,i) in detail.detailPicCount" :key="i" :src="mediaUrlForPic(i)" alt=""
                         class="goods_img">
                </div>
                <div v-else>
                    <p class='text-center' key='nosku'>暂时未有商品详情</p>
                </div>-->
            </section>
        </section>
        <div slot="fixed" class="m-toolbar">
            <f7-grid class="toolbar-inner">
                <f7-col>
                    <f7-button active color="orange" @click="toCart">加入购物车</f7-button>
                </f7-col>
                <f7-col>
                    <f7-button active color="green" @click="toBuy">立即购买</f7-button>
                </f7-col>
            </f7-grid>
        </div>
    </f7-page>
</template>

<script type="text/ecmascript-6">
  import { globalConst as native, modalTitle, cartGoodsType } from 'lib/const'
  import { getMediaUrl } from 'lib/common'
  import moment from 'lib/moment'
  import globalMixin from 'mixins/globalMixin'
  import { mapState } from 'vuex'
  import { wx_share } from 'lib/utils'

  export default {
    data () {
      return {
        goodsId: -1,
        checked: true,
        material: 0
      }
    },
    mixins: [globalMixin],
    created () {
      if (this.$route.params && this.$route.params.goodsId) {
        this.goodsId = this.$route.params.goodsId
      }
      let {dispatch} = this.$store
      dispatch({
        type: native.getGoods,
        goodsId: this.goodsId
      }).then(() => {
        /* wx.ready(() => {
          let url = `${shareSkuUrl}?shopid=${this.shopId}&goodsId=${this.goodsId}`
          wx_share(this.detail.name, url, this.mediaUrl(), '')
        })*/
      })
    },
    methods: {
      init () {
        this.$f7.hideToolbar('.toolbar')
      },
      goHome () {
        if (history.length === 1) {
          this.$router.loadPage('/home')
        } else {
          this.$router.back()
        }
      },
      refresh () {
        let {dispatch} = this.$store
        dispatch({
          type: native.getGoods,
          goodsId: this.goodsId
        })
      },
      mediaUrl () {
        return `${getMediaUrl()}sku_main_${this.goodsId}_0.jpg`
      },
      mediaUrlForPic (index) {
        return `${getMediaUrl()}sku_detail_${this.goodsId}_${index}.jpg`
      },
      materialChange (index) {
        this.material = index
      },
      addCart () {
        let {commit} = this.$store
        commit(native.doCartAddSku, {
          itemId: this.goodsId,
          mode: cartGoodsType.goods
        })
      },
      toCart () {
        this.addCart()
        this.$f7.alert('加入购物车成功', modalTitle)
      },
      toBuy () {
        this.addCart()
        this.$router.load({url: '/cart'})
      }
    },
    computed: {
      ...mapState({
        goodsLoading: ({shop}) => shop.goodsLoading,
        goodsError: ({shop}) => shop.goodsError,
      }),
      detail () {
        let {shop} = this.$store.state
        return shop.goods[`detail_${this.goodsId}`]
      },
    }
  }
</script>
<style lang="scss" scoped type="text/css">
    @import "../../css/goods.scss";
</style>
