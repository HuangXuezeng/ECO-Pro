<template>
  <div class="index" >
    <magazine v-if="isMag" :Mag="isMag" ></magazine>
    <one v-else :one="!isMag" ></one>
  </div>
</template>

<script>
import Magazine from './magazine/magazine'
import One from './one/one'
import { ifOne } from './api.js'
export default {
  data () {
    return {
      isMag: true,
    }
  },
  created () {
    ifOne().then(res => {
      if (res.data.type == 1) {
        // 单篇
        this.isMag = false
      }
    })
  },
  methods: {

  },
  components: {
    Magazine,
    One
  }
}
</script>
<style lang="stylus" scoped>
  .index {
    height: 92vh
    overflow hidden
    box-sizing border-box
  }
</style>