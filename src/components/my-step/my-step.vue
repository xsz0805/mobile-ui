<template>
      
  <div>
          
    <van-steps :active="active" active-color="#198ff9">
      <van-step v-for="(item, index) in stepList" :key="index">
        <template slot="active-icon">
          <img :src="imgActives[index]" alt="" :class="[
              'imgActive',
              { imgActive2: index == 1 },
              { imgActive3: index == 2 },
            ]" />
        </template>
        <template slot="inactive-icon">
          <img :src="imgInactives[index]" alt="" :class="[
              'imgActive',
              { imgActive2: index == 1 },
              { imgActive3: index == 2 },
            ]" />
        </template>

        <p class="mystep">{{ item.step }}</p>
        <p class="mysynopsis">{{ item.synopsis }}</p>
      </van-step>
    </van-steps>
    <my-button @click="btnclick" >下一步</my-button>
    <!-- <div class="van-step__line"></div> -->
  </div>
</template>
           
<script>
export default {
  name: "mystep",
 
  props: {
    active: {
      default: 0,
    },
  },
  data() {
    return {
      imgActives: [
        require("@/assets/step/1.png"),
        require("@/assets/step/2.png"),
        require("@/assets/step/3.png"),
      ],
      imgInactives: [
        require("@/assets/step/progress_bar_finish.png"),
        require("@/assets/step/steps_two.png"),
        require("@/assets/step/steps_three.png"),
      ],
      stepList: [
        { step: "步骤一", synopsis: "简介一" },
        { step: "步骤二", synopsis: "简介二" },
        { step: "步骤三", synopsis: "简介三" },
      ],
    };
  },
  methods: {
    btnclick(val) {
      
      this.active++;
      if (this.active == 2) {
        this.imgInactives[1] = require("@/assets/step/progress_bar_finish.png");
      }
      if (this.active == 3) {
        this.imgInactives[2] = require("@/assets/step/progress_bar_finish.png");
      }
      if (this.active == 4) {
        this.active = 0;
        this.imgInactives = [
          require("@/assets/step/progress_bar_finish.png"),
          require("@/assets/step/steps_two.png"),
          require("@/assets/step/steps_three.png"),
        ];
      }
    },
  },
};
</script>
<style scoped lang='less'>
/deep/ .van-steps__items {
  .van-step__circle-container {
    .imgActive2 {
      position: absolute;
      top: -0.4rem;
      left: -0.1rem;
    }
    /deep/.imgActive3 {
      position: absolute;
      top: -0.4rem;
      left: -0.5rem;
    }
  }
}

.imgActive {
  width: 0.8rem;
  height: 0.8rem;
}
/deep/.van-step__title,
.van-step__title--active {
  margin-top: 1rem;
}
/deep/.van-step__line {
  top: 0.8rem;
  left: 0;
  width: 100%;
  height: 0.026667rem;
}
</style>