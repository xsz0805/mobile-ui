<template>
  <div>      
     
    <van-circle v-model="currentRate" v-if="finish" :rate='100' :stroke-width="60" :speed='100' color='#52c41a'>
      <img class="circleImg" src="../../assets/progress-circle/progress_loop_finish.png" alt="">
    </van-circle>     
    <van-circle v-model="currentRate" v-else-if="warn" :rate='50' :stroke-width="60" :speed='100' color='#faaa33'>
      <img class="circleImg" src="../../assets/progress-circle/progress_loop_warn.png" alt="">
    </van-circle>     
    <van-circle v-model="currentRate" v-else-if="error" :rate='50' :stroke-width="60" :speed='100' color='#ff4545'>
      <img class="circleImg" src="../../assets/progress-circle/progress_loop_error.png" alt="">
    </van-circle>     
    <van-circle v-model="currentRate" v-else :rate='rate' :stroke-width="60" :text="text" :speed='100' :color='modifyColor' />    
  </div>
</template>
            
<script>
export default {
  name: "mycircle",
  props: {
    rate: {
      type: String,
      default: "60",
    },
    finish: {
      type: [Boolean, String],
      default: false,
    },
    warn: {
      type: [Boolean, String],
      default: false,
    },
    error: {
      type: [Boolean, String],
      default: false,
    },
    modifyColor: {
      type: String,
      default: "#1989ff",
    },
  },
  data() {
    return {
      currentRate: 0,
    };
  },
  computed: {
    text() {
      return this.currentRate.toFixed(0) + "%";
    },
  },
};
</script>
<style scoped lang='less'>
.circleImg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0.5rem;
  height: 0.5rem;
}
</style>  