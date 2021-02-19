<template>
      <div>
          <h5>扫一扫</h5>
    <p>有输入框</p>
    <!-- 扫一扫 -->
    <myscan v-model="iptval" type='ipt' @scanClick='scanClick'></myscan>
    <!-- 扫一扫 -->
    <p>按钮</p>
    <myscan v-model="iptval" type='btn' @scanClick='scanClick'></myscan>
        <br>
    <button @click="goBack">返回</button>
  </div>
</template>
           
<script>
export default {
    data () {
        return {
            iptval:"",
        }
    },
    methods:{
        scanClick () {},
        goBack () {
            this.$router.back()
        },
    }
};
</script>
<style scoped>
</style>