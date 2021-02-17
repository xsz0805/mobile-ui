<template>
      
  <div>

    <div>
      <!-- 地图 -->
      <mymap></mymap>
      <!-- 地图 -->

      <!-- 上传 -->
      <myupload @upload='upload' v-model='info'></myupload>{{info}}
      <!-- 上传 -->
      <!-- 扫一扫 -->
      <myscan v-model="iptval" type='ipt' @scanClick='scanClick'></myscan>{{iptval}}
      <!-- 扫一扫 -->
      <!-- 短信验证码 -->
      <mymessage @msginput='msginput' @send='send'></mymessage>
      <!-- 短信验证码 -->
      <!-- 运算验证码 -->
      <mycompute @success='success' @error='error'></mycompute>
      <!-- 运算验证码 -->

      <!-- 拼图验证 -->
      <mycaptcha :show='false' @success='successCapt' @error='errorCapt' :visible='false'></mycaptcha>
      <!-- 拼图验证 -->

      <!-- 树形展示组件 -->
      <mytree :dataTree='dataTree' @rightEdit='rightEdit' @iptTree='iptTree' @editItem='editItem' @success='success' @delTree='delTree'></mytree>
      <!-- 树形展示组件 -->

      <!-- 徽标 -->
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
    <mystep @stepClick='stepClick' :stepList='stepList' :active='active'></mystep>
    <my-button @click='next'>下一步</my-button>

    <!-- 步骤条 -->

    <!-- 进度条 -->
    <myprogress hook precent='100'></myprogress>
    <!-- 进度条 -->
    <!-- 环形条 -->
    <mycircle rate='80'></mycircle>
    <!-- 环形条 -->

    <!-- 加载 -->
    <myloading type=2></myloading>
    <!-- 加载 -->
    <!-- 滑动验证码 -->
    <!-- <myslide  @success='success' @error='error'></myslide> -->
    <!-- 滑动验证码 -->
    <!-- 选字验证 -->
    <!-- <mypoints></mypoints> -->
    <!-- 选字验证 -->
    <!-- 图片字母数字 验证码 -->
    <mycode v-model="codeValue" @codeSubmitSuccess='codeSubmit' @codeSubmitError='codeSubmitError'></mycode>
    {{codeValue}}
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
      codeValue: "",
      info: {},
      iptval: "",
      captshow: true,
      status: false,
      iptValue: "123",
      precent: 100,
      dataTree: {
        name: "一级",
        id: 1,
        time: +new Date(),
        children: [
          { name: "书", id: 2, time: +new Date() },
          { name: "本", id: 2, time: +new Date() },
          {
            name: "二级",
            id: 2,
            time: +new Date(),
            children: [
              {
                name: "三级",
                id: 3,
                time: +new Date(),
                children: [
                  { name: "书3", id: 4, time: +new Date() },
                  { name: "本3", id: 4, time: +new Date() },
                ],
              },
              { name: "书3", id: 3, time: +new Date() },
              { name: "本3", id: 3, time: +new Date() },
              {
                name: "三级",
                id: 3,
                time: +new Date(),
                children: [
                  { name: "书3", id: 4, time: +new Date() },
                  { name: "本3", id: 4, time: +new Date() },
                ],
              },
            ],
          },
        ],
      },
      active: 0,
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
    codeSubmitError () {
      console.log(112111);
    },
    codeSubmit() {
      console.log(666);
    },
    editItem(data) {
      console.log(data, 666);
    },
    upload(result, formData) {
      console.log(result);
      console.log(formData);
      console.log(this.info);
    },
    scanClick() {
      console.log(133113);
    },
    send(code) {
      console.log(code);
    },
    msginput(val) {
      console.log(val);
    },
    error() {
      console.log(313);
    },
    errorCapt() {
      console.log(665566);
    },
    successCapt(val) {
      console.log(val, 666);
      setTimeout(() => {
        this.captshow = !val;
      }, 1000);
    },
    delTree(result) {
      // console.log(result);
    },
    success(data) {
      // console.log(data);
      console.log(131);
    },
    iptTree(val) {
      console.log(val);
    },
    rightEdit(val) {
      console.log(val);
    },
    next() {
      this.active++;
      if (this.active == 4) {
        this.active = 0;
      }
      console.log(this.active);
    },
    btnclick() {},
    stepClick(num) {},
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
    myinput(val) {},
    click1() {},
  },
  mounted() {},
  created() {},
};
</script>
<style scoped lang='less'>
/deep/img {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}
</style>