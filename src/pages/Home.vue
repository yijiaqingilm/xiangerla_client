<template>
    <f7-page>
        <f7-navbar>
            <f7-nav-left :back-link="false" sliding></f7-nav-left>
            <f7-nav-center>香尔辣</f7-nav-center>
        </f7-navbar>
        <section>
            <f7-swiper pagination :init="false" class="swiper-container">
                <f7-swiper-slide v-for="(item,index) in banner" :key="index">
                    <img :src="item.img" class="banner_img" alt="">
                </f7-swiper-slide>
            </f7-swiper>
        </section>
        <section>
            <header class="header">推荐项目套餐</header>
            <f7-grid>
                <f7-col width="50" v-for="(combo,index) in comboTop4" :key="index">
                    <goods-item :goods="combo"></goods-item>
                </f7-col>
            </f7-grid>
        </section>
        <section>
            <header class="header">推荐项目</header>
            <f7-grid>
                <f7-col width="50" v-for="(goods,index) in goodsList" :key="index">
                    <goods-item :goods="goods"></goods-item>
                </f7-col>
            </f7-grid>
            <infinite-loading @infinite="loadData">
                <div slot="no-results">没有数据</div>
                <div slot="no-more">没有更多数据</div>
            </infinite-loading>
        </section>
    </f7-page>
</template>

<script type="text/ecmascript-6">
  import GoodsItem from 'section/goodsItem/GoodsItem'
  import ComboItem from 'section/comboItem/ComboItem'
  import { mapState } from 'vuex'
  import { globalConst as native, pageSize as size } from 'lib/const'
  import InfiniteLoading from 'vue-infinite-loading'

  export default {
    data () {
      return {
        pageIndex: 1,
        goodsList: []
      }
    },
    async created () {
      let {commit, dispatch} = this.$store
      commit('setActiveTabbarItem', 'home')
      dispatch({
        type: native.getBanner
      }).then(() => {
        this.$nextTick(() => {
          var mySwiper = this.$f7.swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            autoplay: 2000,
            speed: 500,
          })
        })
      })
      dispatch({
        type: native.getComboTop4
      })
      /* dispatch({
        type: native.getGoodsList
      })*/
    },
    methods: {
      moreCatalog (catalog) {
        this.$router.loadPage(`/catalog/list/${catalog.id}`)
      },
      loadData ($state) {
        let {dispatch} = this.$store
        dispatch({
          type: native.getGoodsList,
          page: this.pageIndex,
          size
        }).then(({data}) => {
          let result = data
          if (Array.isArray(result) && result.length > 0) {
            this.goodsList = this.goodsList.concat(result)
            $state.loaded()
            this.pageIndex += size
          } else {
            $state.complete()
          }
          if (result.length < size) {
            $state.complete()
          }
        })
      }
    },
    computed: {
      ... mapState({
        banner: ({shop}) => shop.banner,
        comboTop4: ({shop}) => shop.comboTop4,
      })
    },
    destroyed () {
      console.log('home destroyed')
    },
    components: {GoodsItem, ComboItem, InfiniteLoading}
  }
</script>
<style lang="scss" scoped type="text/css">
    @import "../css/home.scss";
</style>
