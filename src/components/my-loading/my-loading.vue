<template>
      <div v-if="loading" class="mymainload">
    <van-overlay show z-index='999'>
      <lottie :options="defaultOptions" :height="100" :width="100" v-on:animCreated="handleAnimation" class="myloading" />
    </van-overlay>     
  </div>
</template>
                  
<script>
const animationData = [
  require("../../assets/loading/annularloading.json"),
  require("../../assets/loading/indicatorloading.json"),
  require("../../assets/loading/shenghuilogo.json"),
];

export default {
  name: "myloading",
  props: {
    type: {
      type: [Number,String],
      default: 2,
    },
    loading: {
      type: [Boolean, String],
      default: false,
    },
  },

  data() {
    return {
      show: true,
      defaultOptions: { animationData: animationData[this.type], loop: true },
      animObj: {},
    };
  },

  methods: {
    handleAnimation: function (animate) {
      this.animObj = animate;
    },
  },
};
</script>
<style scoped  lang='less'>
.van-overlay {
  background-color: rgba(0, 0, 0, 0.5);
}

.myloading {
  position: absolute;

  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>