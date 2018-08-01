<template>
    <!-- App -->
    <div id="app" class="">
        <Loading></Loading>
        <!-- Statusbar -->
        <f7-statusbar></f7-statusbar>
        <!-- Main Views -->
        <f7-views>
            <f7-view id="main-view" navbar-through :toolbar-fixed="true" :dynamic-navbar="true" main :domCache="false">
                <!-- Navbar -->
                <f7-navbar title="" :back-link="false" sliding></f7-navbar>
                <!-- Pages -->
                <f7-pages>
                    <f7-page>&nbsp;</f7-page>
                </f7-pages>
                <f7-toolbar class="menus" bottom tabbar labels>
                    <f7-link icon="iconfont icon-home" tab-link :active="activeTabbarItem==='home'" text="首页"
                             @click="loadPage('/home')"></f7-link>
                    <f7-link icon="iconfont icon-similar" tab-link :active="activeTabbarItem==='catalog'" text="分类"
                             @click="loadPage('/catalogs')"></f7-link>
                    <f7-link icon="iconfont icon-cart" tab-link :active="activeTabbarItem==='cart'" text="购物车"
                             @click="loadPage('/cart')"></f7-link>
                    <f7-link icon="iconfont icon-my" tab-link :active="activeTabbarItem==='my'" text="我的"
                             @click="loadPage({url:'/my'})"></f7-link>
                </f7-toolbar>
            </f7-view>
        </f7-views>
    </div>
</template>
<script>
  import Loading from 'components/loading/loading.vue'
  import globalMixin from 'mixins/globalMixin'

  export default {
    mixins: [globalMixin],
    data () {
      return {}
    },
    created: function () {
    },
    methods: {
      loadPage (url) {
        this.$router.loadPage(url)
      }
    },
    computed: {
      activeTabbarItem () {
        return this.$store.state.activeTabbarItem
      }
    },
    components: {Loading}
  }
</script>
<style lang="scss" type="text/css">
    @import "css/global.scss";
</style>
