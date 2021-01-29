<template>
      
  <div>
    <!-- 徽标 -->
    <div>
      <!-- 徽标数 -->
      <mybadge count="666">
        <my-button>按钮</my-button>
      </mybadge>
      <!-- 自定义徽标图片  slot='contentImg'-->
      <mybadge>
        <my-button @click='btnclick'>按钮</my-button>
        <template slot="contentImg"><img src="../assets/badge_icon.png" alt="" /></template>
      </mybadge>
      <mybadge>
        <my-button>按钮</my-button>
        <template slot="contentImg"><img src="../assets/badge_dot.png" alt="" /></template>
      </mybadge>
      <!-- 文字徽标 自定义图片 -->
      <mybadge>
        这是文字
        <template slot="contentImg"><img src="../assets/badge_dot.png" alt="" /></template>
      </mybadge>
      <!-- 文字徽标   数字 -->
      <mybadge count="1"> 这是文字 </mybadge>

      <!-- 图标徽标 -->
      <mybadge count="123">
        <myicon>111</myicon>
      </mybadge>

      <!-- 自定义图标内容 徽标   -->
      <mybadge>
        <myicon><template slot="coustom">111</template></myicon>
        <template slot="contentImg"><img src="../assets/badge_icon.png" alt="" /></template>
      </mybadge>
    </div>
    <!-- 徽标 -->

    <!-- 搜索框 -->
    <!-- 默认样式 -->
    <!--v-model 双向数据绑定    input  输入事件 val 回调参数 当前输入框值  onsearch 搜索点击事件   searchVal 回调参数 当前输入框的值   Attr : history  搜索历史  type []  -->
    <mysearch v-model="value" @input='myinput' @onsearch='mysearch' :history='history'> </mysearch>

    <!-- 热搜样式     Attr  hotStyle  type  boolean  default  false-->
    <mysearch hotStyle='true'> </mysearch>
    <!-- 搜索框 --> 

    <!-- 步骤条 -->
      <mystep  @stepClick='stepClick' :stepList='stepList' :active='active'></mystep>
      <my-button @click='next'>下一步</my-button>

    <!-- 步骤条 -->
  </div> 
</template>            
           
<script>
export default {
  watch: {
    value(val) {
      console.log(val);
    },
  },
  data() {
    return {
      active:0,
      stepList: [
        { step: "步骤一", synopsis: "简介" },
        { step: "步骤二", synopsis: "简介二" },
        { step: "步骤三", synopsis: "简介三" },
      ],
      value: "",
      history: JSON.parse(localStorage.getItem("history")) || [],
    };
  },
  methods: {
    next () {
      this.active++
      if (this.active == 4) {
        this.active = 0
      }
      console.log(this.active);
    },
    btnclick () {
      // console.log(666777);
    },
    stepClick (num) {
      // console.log(num,666);
    },
    mysearch(searchVal) {
      // console.log(searchVal, 777);
      let index = this.history.findIndex((item) => {
        return item == searchVal;
      });
      if (index != -1) {
        this.history.splice(index, 1);
      }
      if (searchVal) {
        this.history.unshift(searchVal);
        localStorage.setItem("history", JSON.stringify(this.history));
      }
    },
    myinput(val) {
      // console.log(val, 666);
    },
    click1() {
      // console.log(666);
    },
  },
  mounted() {},
  created() {},
};
</script>
<style scoped lang='less'>
/deep/img {
  width: 100%;
  height: 100%;
  // vertical-align: middle;
}
</style>