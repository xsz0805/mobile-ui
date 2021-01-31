<template>
      <div class="myprogress">
    <template v-if="warn">   
      <van-progress :percentage="100" :color="'#faaa33'" />
      <div class="precent">
        <span><img src="../../assets/step/progress_bar_warn.png" alt=""></span>
      </div>     
    </template> 
    <template v-else-if="error">   
      <van-progress :percentage="100" :color='"#ff4545"' />
      <div class="precent">
        <span><img src="../../assets/step/progress_bar_error.png" alt=""></span>
      </div>     
    </template> 
    <template v-else>   
      <van-progress :percentage="precent" :color="precent == 100 ? '#52c41a' : modifyColor" />
      <div class="precent">
        <span v-if="hook && precent == 100 "><img src="../../assets/step/progress_bar_finish.png" alt=""></span>
        <span v-else>{{precent}}%</span>
      </div>     
    </template> 
  </div>
</template>   
           
<script>
export default {
  name: "myprogress",
  watch: {},
  mounted() {
    var pre = document.querySelectorAll(".van-progress__pivot");
    for (var i = 0; i < pre.length; i++) {
      pre[i].classList.add("mp");
    }
  },
  props: {
    hook: {
      type: [Boolean, String],
      default: false,
    },
    precent: {
      type: [Number, String],
      default: 70,
    },
    modifyColor: {
      type: String,
      default: "#1989ff",
    },
    warn: {
      type: [Boolean, String],
      default: false,
    },
    error: {
      type: [Boolean, String],
      default: false,
    },
  },
  data() {
    return {
      selfColor: "",
    };
  },
  computed: {},
};
</script>
<style scoped lang='less'>
.myprogress {
  display: flex;
  align-items: center;

  .precent {
    margin-left: 0.4rem;
    font-size: 0.26rem;
    width: 0.5rem;
    height: 0.5rem;
  }
}

/deep/.van-progress__pivot,
.mp {
  display: none;
}
.van-progress {
  height: 0.12rem;
  width: 100%;
}
</style>