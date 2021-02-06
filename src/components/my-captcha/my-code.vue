<template>
  <div class="mycode">
    <div class="codediv">
      <input type="text" @input="inputEvent" placeholder="请输入" class="codeipt" v-model="codeValue" />
    </div>
       <div class="code" @click="refreshCode">
      <!--   ：fresh：父组件向子组件传送刷新验证码的信号；
    @makedCode：子组件向父组件传送验证码的值-->
      <mycodeimg :fresh="flag" @makedCode="getMakedCode"></mycodeimg>
    </div>
    <div class="submit">
      <button class="codeBtn" @click="codeBtnClick">提交</button>
    </div>
  </div>
</template>
           
<script>
import { Toast } from 'vant';
import mycodeimg from "./my-imgCode";
export default {
  name: "mycode",
  components: {
    mycodeimg,
  },

  data() {
    return {
      codeValue: "",
      flag: true, //触发刷新
      code: "", //刷新后的验证码
    };
  },
  mounted() {
    this.flag = !this.flag;
  },
  methods: {
    inputEvent() {
      this.$emit("input", this.codeValue);
    },
    codeBtnClick() {
      if (this.codeValue == this.code.toLowerCase()) {
          Toast.success('验证成功');
          this.$emit('codeSubmit')
      }else {
        Toast.fail('验证失败,请重试');
        this.refreshCode()
        this.codeValue = ''
      }
    },
    // 切换验证码
    refreshCode() {
      this.flag = !this.flag;
    },
    getMakedCode(code) {
      this.code = code;
      console.log("getMakedCode:", this.code);
    },
  },
};
</script>
<style scoped lang='less'>
.mycode {
  display: flex;
  align-items: center;
  justify-content: left;
  flex-wrap: wrap;

  .codediv {
    width: 4.54rem;
    height: 0.88rem;
    margin-right: 0.16rem;
    .codeipt {
      box-sizing: border-box;
      vertical-align: middle;
      width: 4.54rem;
      height: 0.88rem;
      height: 100%;
      font-size: 0.3rem;
      color: #b3b3b3;
      padding: 0 0.24rem;
      border-radius: 0.1rem;
      border: 1px solid #cccccc;
    }
  }
  .submit {
    margin-top: 0.3rem;
    // margin-right: auto;
    .codeBtn {
      width: 3rem;
      height: 0.88rem;
      background-color: #198ff9;
      color: #feffff;
      border: none;
      border-radius: 0.1rem;
      font-size: 0.3rem;
    }
  }
}
</style>