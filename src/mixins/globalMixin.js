import { mapState } from 'vuex'
import { globalConst as native } from 'lib/const'
import { isEmptyObject } from 'lib/utils'

const globalMixin = {
  created () {
    console.log('loadconfig', this.$store)
    this.$store.dispatch({
      type: native.doLoadConfig
    })
  },
  computed: mapState({}),
}
export default globalMixin
