<template>
  <div class="mycode">
    <div class="codediv">
      <input type="text" placeholder="请输入" class="codeipt"/>
    </div>
       <div class="code" @click="refreshCode">
      <!--   ：fresh：父组件向子组件传送刷新验证码的信号；
    @makedCode：子组件向父组件传送验证码的值-->
      <mycodeimg :fresh="flag" @makedCode="getMakedCode"></mycodeimg>
    </div>
  </div>
</template>
           
<script>
import mycodeimg from "./my-imgCode";
export default {
  name: "mycode",
  components: {
    mycodeimg,
  },
  data() {
    return {
      flag: true, //该值变化，就会触发刷新
      code: "", //刷新后的验证码
    };
  },
  mounted() {
    this.flag = !this.flag;
  },
  methods: {
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

    .codediv {
        width: 4.54rem;
        height: 0.88rem;
        .codeipt {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
        }
    }
    
}
</style>