<template>
  <div>
    <div class="countTitle" style="height:10px">
      <span class="Cfl" style="font-size:16px;font-weight:700">运算验证码</span>
      <span class="Crl">tips : 点击验证图片刷新图片</span>
    </div>
    <div class="cerify-code-panel">
      <div class="verify-code-area">
        <div class="verify-input-area">
          <input type="text" v-model="inputValue" @change="iptchange" placeholder="请输入" class="varify-input-code" style="width:110%" />
        </div>
      </div>
      <div class="verify-code" @click="setCode" :style="{
                    'width': width,
                    'height': height,
                    'line-height': height,
                    'font-size': fontSize,
                    'background-color': containerBackgroundColor,
                    'color': containerColor
                }">
        <!-- 显示字符串 -->
        <span :style="code.style" v-for="(code,index) in codeShow" :key="index">
          {{code.char || code}}
        </span>

      </div>
      <!-- <div class="verify-change-area" @click="setCode"><a class="verify-change-code">换一张</a></div> -->

    </div>
  </div>
</template>
<script type="text/babel">
import { _code_chars, _code_color1, _code_color2 } from "../../utils/captcha";

export default {
  name: "mycompute",
  props: {
    type: {
      type: String,
      default: "2",
    },
    //位数，仅在type=2时生效
    figure: {
      type: Number,
      default: 100,
    },
    //算法，支持加减乘，0为随机，仅在type=2时生效
    arith: {
      type: Number,
      default: 0,
    },
    width: {
      type: String,
      default: "100px",
    },
    height: {
      type: String,
      default: "30px",
    },
    fontSize: {
      type: String,
      default: "16px",
    },
    codeLength: {
      type: Number,
      default: 6,
    },
  },
  data() {
    return {
      isEnd: false,
      // 输入的值
      inputValue: "",
      // 颜色
      containerBackgroundColor: "#fff",
      containerColor: "#fff",

      codeChose: "", // 应该输入的code
      codeShow: [], // 显示用的
    };
  },
  methods: {
    init() {
      this.setCode();

      this.$parent.$emit("ready", this);
    },

    /**
     * setCode
     * @description 设置验证码
     * */
    setCode() {
      if (this.isEnd == false) {
        this.containerBackgroundColor =
          _code_color1[Math.floor(Math.random() * 3)];
        this.containerColor = _code_color2[Math.floor(Math.random() * 5)];

        this.inputValue = "";

        this.codeShow = [];
        this.codeChose = "";

        if (this.type === "1") {
          //普通验证码 图片选择
          for (var i = 0; i < this.codeLength; i++) {
            var charNum = Math.floor(Math.random() * 52);
            var tmpStyle =
              charNum % 2 == 0
                ? "font-style:italic;margin-right: 10px"
                : "font-weight:bolder";
            tmpStyle +=
              Math.floor(Math.random() * 2) == 1 ? "font-weight:bolder" : "";

            this.codeChose += _code_chars[charNum];
            this.codeShow.push({
              style: tmpStyle,
              char: _code_chars[charNum],
            });
          }
        } else if (this.type === "2") {
          // 算法验证码
          var num1 = Math.floor(Math.random() * this.figure);
          var num2 = Math.floor(Math.random() * this.figure);

          let codeShow = "";

          if (this.arith == 0) {
            var tmparith = Math.floor(Math.random() * 3);
          }

          switch (tmparith) {
            case 1:
              this.codeChose = parseInt(num1) + parseInt(num2);
              codeShow = num1 + " + " + num2 + " = ?";
              break;
            case 2:
              if (parseInt(num1) < parseInt(num2)) {
                var tmpnum = num1;
                num1 = num2;
                num2 = tmpnum;
              }
              this.codeChose = parseInt(num1) - parseInt(num2);
              codeShow = num1 + " - " + num2 + " = ?";
              break;
            default:
              this.codeChose = parseInt(num1) * parseInt(num2);
              codeShow = num1 + " × " + num2 + " = ?";
              break;
          }

          this.codeShow = codeShow.split(""); // 转数组
        }
      }
    },
    /**
     * checkCode
     * @description 验证验证码
     * */
    iptchange() {
      this.checkCode();
    },
    checkCode() {
      let inputValue;
      let codeChose;
      if (this.type === "1") {
        //普通验证码
        inputValue = this.inputValue.toUpperCase();
        codeChose = this.codeChose.toUpperCase();
      } else {
        inputValue = this.inputValue;
        codeChose = this.codeChose;
      }

      console.log(inputValue);
      console.log(codeChose);
      console.log(inputValue == codeChose);

      if (inputValue == codeChose) {
        this.isEnd = true;
        this.$emit("success");
        console.log("成功");
      } else {
        this.$emit("error");
        console.log("失败");
        this.setCode();
      }
    },
    /**
     * refresh
     * @description 刷新
     * */
    refresh() {
      this.isEnd = false;
      this.inputValue = "";
      this.setCode();
    },
  },
  watch: {
    // type变化则全面刷新
    type: {
      immediate: true,
      handler() {
        this.init();
      },
    },
  },
  mounted() {
    // 禁止拖拽
    this.$el.onselectstart = function () {
      return false;
    };
  },
  i18n: {
    messages: {
      "en-US": {},
      "zh-CN": {},
    },
  },
};
</script>

<style lang="less" scoped>
.countTitle {
  font-size: 0.2rem;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  height: 10px;
  line-height: 10px;
}

.cerify-code-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .verify-code-area {
    margin-right: 5px;
    width: 200px;

    .varify-input-code {
      box-sizing: border-box;
      border-radius: 0.2rem;
      border: 1px solid #b3b3b3;
      color: #b3b3b3;
      font-size: 0.3rem;
      height: 0.7rem;
      padding: 0 10px;
      vertical-align: middle;
    }
  }
  .verify-code {
    text-align: center;
  }
}
</style>