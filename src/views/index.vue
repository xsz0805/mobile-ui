<template>
      
  <div>

    <div>
      <van-nav-bar title="移动端组件示例" />
      <van-tabs animated swipeable @change='tabschange' >
        <van-tab title="搜索">
          <!-- 搜索框 -->
          <!-- 默认样式 -->
          <!--v-model 双向数据绑定    input  输入事件 val 回调参数 当前输入框值  onsearch 搜索点击事件   searchVal 回调参数 当前输入框的值   Attr : history  搜索历史  type []  -->
          <mysearch v-model="value" @input='myinput' @onsearch='mysearch' :history='history'> </mysearch>
              <br><br><br>
          <!-- 热搜样式     Attr  hotStyle  type  boolean  default  false-->
          <mysearch hotStyle='true' :history='history'> </mysearch>
          <!-- 搜索框 -->
        </van-tab>
        <van-tab title="徽标">
          <mybadge count="666">
            <my-button>按钮</my-button>
          </mybadge>
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
        </van-tab>
        <van-tab title="步骤条">
          <!-- 步骤条 -->
          <mystep @stepClick='stepClick' :stepList='stepList' :active='active'></mystep>
          <my-button @click='next'>下一步</my-button>
          <!-- 步骤条 -->
        </van-tab>
        <van-tab title="树形控件">
          <button @click="treeClick" class="treebtn">点击进入树形展示页面</button>
        </van-tab>
        <van-tab title="进度条">
          <!-- 进度条 -->
          <myprogress hook precent='70'></myprogress>
          <br>
          <myprogress warn hook precent='100'></myprogress>
          <br>
          <myprogress error hook precent='100'></myprogress>
          <br>
          <myprogress hook precent='100'></myprogress>
          <br>
          <!-- 进度条 -->
        </van-tab>
        <van-tab title="环形进度">
          <!-- 环形条 -->
          <mycircle rate='80' modifyColor='skyblue'></mycircle>
          <mycircle warn></mycircle>
          <mycircle finish></mycircle>
          <mycircle error></mycircle>
          <!-- 环形条 -->
        </van-tab>
        <van-tab title="上传身份证">
          <!-- 上传 -->
          <h3>有输入框</h3>
          <myupload @upload='upload' v-model='info'></myupload>
          <h3>无输入框</h3>
          <myupload @upload='upload' v-model='info' :row='false' :uploadIpt='false'></myupload>
          <!-- 上传 -->
        </van-tab>
        <van-tab title="地图">
          <!-- 地图 -->
          <br>
          <button @click="mapclick">点击进入地图页面</button>
          <!-- 地图 -->
        </van-tab>
        <van-tab title="验证码">
          <!-- 运算验证码 -->
          <mycompute @success='success' @error='error'></mycompute>
          <!-- 运算验证码 -->
          <h5>短信验证码</h5>
          <!-- 短信验证码 -->
          <mymessage @msginput='msginput' @send='send'></mymessage>
          <!-- 短信验证码 -->
          <h5>图片字母数字验证码</h5>
          <!-- 图片字母数字 验证码 -->
          <mycode v-model="codeValue" @codeSubmitSuccess='codeSubmit' @codeSubmitError='codeSubmitError'></mycode>

        </van-tab>
        <van-tab title="扫一扫">
          <button @click="saoClick" class="scanbtn">点击进入扫一扫演示页面</button>
        </van-tab>
        <van-tab title="选字/拼图/滑动验证码">
          <button @click="captchaClick" class="scanbtn">点击进入验证码演示页面</button>
        </van-tab>
        <van-tab title="加载">
          <button @click="saoClick1" class="scanbtn">点击显示正在加载样式1</button>
          <button @click="saoClick2" class="scanbtn">点击显示正在加载样式2</button>
          <button @click="saoClick3" class="scanbtn">点击显示正在加载样式3</button>

        </van-tab>
      </van-tabs>
      <myloading type=0 :loading='load1'></myloading>
      <myloading type=1 :loading='load2'></myloading>
      <myloading type=2 :loading='load3'></myloading>
    </div>
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
      show1: false,
      show2: false,
      load1: false,
      load2: false,
      load3: false,
      codeValue: "",
      info: {},
      iptval: "",
      captshow: true,
      status: false,
      iptValue: "123",
      precent: 100,

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
    mapclick() {
      this.$router.push("/map");
    },
    captchabtn1() {
      this.show1 = true;
    },
    captchabtn() {
      this.show2 = true;
    },
    captchaClick() {
      this.$router.push("/captcha");
    },
    saoClick1() {
      this.load1 = true;
      setTimeout(() => {
        this.load1 = false;
      }, 2000);
    },
    saoClick2() {
      this.load2 = true;
      setTimeout(() => {
        this.load2 = false;
      }, 2000);
    },
    saoClick3() {
      this.load3 = true;
      setTimeout(() => {
        this.load3 = false;
      }, 2000);
    },
    treeClick() {
      this.$router.push("/tree");
    },
    saoClick() {
      this.$router.push("/scan");
    },
    tabschange() {
      // // console.log(111);
      // this.load = true;
      // setTimeout(() => {
      //   this.load = false;
      // }, 1000);
    },
    codeSubmitError() {
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
.scanbtn {
  margin-top: 0.8rem;
}
.treebtn {
  margin-top: 0.8rem;
}
/deep/img {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}
/deep/.amap-sug-result {
  z-index: 9999;
}
</style>