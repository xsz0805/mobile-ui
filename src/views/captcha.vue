<template>
      <div>
    <br>
    <br>
          <mycaptcha :show='show1' @success='successCapt' @error='errorCapt' :visible='show1'></mycaptcha>
    <mycaptcha :show='show2' @success='successCapt' @error='errorCapt' :visible='!show2'></mycaptcha>
    <p>滑动验证码</p>
    <!-- 滑动验证码 -->
    <myslide @success='success' @error='error'></myslide>
    <!-- 滑动验证码 -->
    <br>
    <br>
    <br>
    
    <button @click="captchabtn">选字验证码</button>
    <br>
    <br>
    <br>
    <br>
    <br>

    <button @click="captchabtn1">拼图验证码</button>
    <br>
    <br>
    <br>
    <button @click="goback">返回</button>
  </div>
</template>
           
<script>
export default {
  data() {
    return {
      show1: false,
      show2: false,
    };
  },
  methods: {
    success () {},
    error () {},
    goback() {
      this.$router.back();
    },
    captchabtn1() {
      this.show1 = true;
    },
    captchabtn() {
      this.show2 = true;
    },
    successCapt(val) {
      console.log(val, 666);
      setTimeout(() => {
        this.captshow = !val;
      }, 1000);
    },

    errorCapt() {},
  },
};
</script>
<style scoped>
</style>