<template>
  <!--     <span v-if="count">{{ count }}</span> -->
  <van-badge class="mybadge">
    <template slot="content">
      <div class="count" v-if="count">
        <slot name="contentCount">{{ count }}</slot>
      </div>
      <div class="imgg" v-else><slot name="contentImg"></slot></div>
    </template>
    <slot></slot>
  </van-badge>
</template>
           
<script>
export default {
  name:'mybadge',
  watch: {
    count() {
      if (!this.count) {
        this.$nextTick(() => {
          for (var i = 0; i < document.querySelectorAll(".imgg").length; i++) {
            // console.log(document.querySelectorAll(".imgg"));
            document
              .querySelectorAll(".imgg")
              [i].parentNode.classList.add("padZero");
            document.querySelectorAll(".imgg")[i].parentNode.style.border =
              "none";
            document.querySelectorAll(".imgg")[i].parentNode.style.background =
              "none";
          }
        });
      } else {
      }
    },
  },
  mounted() {
    if (!this.count) {
      this.$nextTick(() => {
        for (var i = 0; i < document.querySelectorAll(".imgg").length; i++) {
          // console.log(document.querySelectorAll(".imgg"));
          document
            .querySelectorAll(".imgg")
            [i].parentNode.classList.add("padZero");
          document.querySelectorAll(".imgg")[i].parentNode.style.border =
            "none";
          document.querySelectorAll(".imgg")[i].parentNode.style.background =
            "none";
          document.querySelectorAll(".imgg")[i].parentNode.style.minWidth =
            "unset";
        }
      });
    }
  },
  props: {
    count: {
      type: [Number, String],
    },
  },
};
</script>
<style scoped lang='less'>
.mybadge {
  margin: 10px;
}

/deep/.imgg {
  width: 100%;
  height: 100%;
  // background-color: red;
  width: 0.3rem;
  height: 0.3rem;
}
/deep/.padZero {
  padding: 0;
}
</style>