<template>
    <section @click="goodsDetail(goods)">
        <f7-card>
            <f7-card-content>
                <div>
                    <img :src="goods.img" class="goods_img" alt="">
                </div>
                <div>{{goods.name}}</div>
                <div>原价：<strike>¥{{goods.oprice | toFixed}}</strike></div>
                <div class="content">
                    <div class='price'>现价：¥{{goods.price | toFixed}}</div>
                    <div class="unit">/元</div>
                </div>
            </f7-card-content>
        </f7-card>
    </section>
</template>

<script type="text/ecmascript-6">
  import { globalConst as native } from '../../lib/const'
  import { getMediaUrl } from 'lib/common'
  import { mapState } from 'vuex'

  export default {
    props: {
      goods: Object
    },
    data () {
      return {}
    },
    created () {
    },
    methods: {
      goodsDetail (goods) {
        console.log('???')
        this.$router.loadPage(`/catalogs/goods/${goods.goodsId}`)
      }
    },
    computed: {
      ...mapState({})
    }
  }
</script>
<style lang="scss" scoped type="text/css">
    @import "./goodsItem.scss";
</style>
