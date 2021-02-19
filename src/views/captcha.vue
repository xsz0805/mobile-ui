<template>
      <div>
          <button @click="click">拼图验证码</button>
          <button  @click="click1">选自验证码</button>
    <!-- 拼图验证 -->
    <!-- <mycaptcha :show='show' @success='successCapt' @error='errorCapt' :visible='false'></mycaptcha> -->
    <!-- 拼图验证 -->
        <mycaptcha :show='show1' @success='successCapt' @error='errorCapt' :visible='true'></mycaptcha>
  </div>
</template>
           
<script>
export default {
    data () {
        return {
            show:false,
            show1:false,
        }
    },
    methods:{
         successCapt(val) {
      console.log(val, 666);
      setTimeout(() => {
        this.captshow = !val;
      }, 1000);
    },
       
        errorCapt() {},
        click () {
            this.show = true
            
        },
        click1 () {
            this.show1 = true
        },

    }
};
</script>
<style scoped>
</style>