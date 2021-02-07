<template>
  <div class="login-container">

    <van-form @submit="onSubmit">
      <van-field @input='msginput' v-model="code" name='code' type="text" placeholder="请填写" :rules="rules.code">
        <template #button>
          <van-button @click="getCode" @click.stop='clicksend' v-if='flag' size="small" plain type="info">发送验证码</van-button>
          <van-count-down @finish='finish' v-else :time="time" format="ss (s)" />
        </template>
      </van-field>
      <div class="submit">
        <button class="codeBtn" @click='msgCodeBtn'>提交</button>
      </div>
    </van-form>
  </div>
</template>          
<script>
import { Toast } from 'vant';
export default {
  name: "mymessage",
  data() {
    return {
      code: "246810",

      time: 6 * 10000,
      flag: true,
      /* 校验 */
      rules: {
        code: [
          { required: true, message: "请填写验证码" },
          { pattern: /\d{6}/, message: "请填写六位数验证码" },
        ],
      },
    };
  },
  methods: {
    msgCodeBtn (){
        if (!this.code) return  Toast('请填写验证码');
    },
    msginput(val) {
      this.$emit("msginput", val);
    },
    onSubmit(values) {
      console.log("submit", values);
      this.$emit('msgSubmit')
    },

    clicksend() {
      console.log(this.code);
      this.$emit("send", this.code);
    },

    /* 监听时间结束 */
    finish() {
      console.log(123);
      this.flag = true;
    },
    getCode() {
      this.flag = false;
    },
  },
};
</script>
<style scoped lang='less'>
.van-button,
.van-button--info,
.van-button--small,
.van-button--plain {
  border-radius: 0.2rem;
}
/deep/.van-count-down {
  width: 78px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  border-radius: 0.2rem;
  background-color: #d6d6d6;
}
/deep/.van-field__control {
  width: 4.54rem;
  border: 1px solid #d6d6d6;
  height: 0.8rem;
  border-radius: 0.2rem;
  padding: 0 5px;
}
/deep/.van-field__button {
  margin-left: 0.16rem;
  padding: 0;
}
.login-container {
  margin-bottom: 20px;
  .van-nav-bar {
    background-color: #3296fa;
    .van-icon {
      color: #fff;
    }
    /deep/.van-nav-bar__title {
      color: #fff;
    }
  }
}
.van-cell {
  padding: 0;
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
</style>