<template>
<div>
  <div>{{ hitokoto.hitokoto }}</div>
  <div>{{ hitokoto.from }}</div>
  <div>{{ hitokoto.from_who }} </div>
</div>
</template>

<script>
import {hitokoto} from 'api/api'
export default {
  data () {
    return {
      hitokoto: ''
    }
  },

  methods: {
    getHitokoto () {
      hitokoto().then(res => {
        console.log(res)
        const {status, data} = res;
        if (status === 200) {
          this.hitokoto = data
          console.log(this.hitokoto)
        } else {
          this.$message.error('hitokoto service error')
        }
      })
    }
  },
  
  mounted () {
    this.getHitokoto();
  }
}
</script>

<style lang="less" scoped>

</style>