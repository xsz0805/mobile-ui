<template>
  <div>
    <div class="header" v-if='uploadIpt'>
      <p>基本信息</p>
      <div class=" info name">
        <span>真实姓名</span>
        <input type="text" placeholder="请输入" v-model="info.name" @input="uploadIptFn">
      </div>
      <div class=" info number">
        <span>身份证号</span>
        <input type="text" placeholder="请输入" v-model='info.number' @input="uploadIptFn">
      </div>
    </div>
    <div :class="[{myfileColumn:!row},{myfileRow:row}] ">
      <p class="title">上传有效二代身份证</p>
      <div class="fileBox">
        <div>
          <span class="fileinput-button fileinput1">
            <img :src="srcOthers1" alt="" class="imgUpload">
            <input class="upload" type="file" @change="getFileOthers1">
          </span>
        </div>
        <div class="tips">点击上传身份证正面</div>
      </div>
      <div class="fileBox">
        <div>
          <span class="fileinput-button fileinput2">
            <img :src="srcOthers2" alt="" class="imgUpload">
            <input class="upload" type="file" @change="getFileOthers2">
          </span>
        </div>
        <div class="tips">点击上传身份证反面</div>
      </div>
      <button class="uploadSub" @click="uploadbtn">提交</button>    
    </div>
    <van-popup v-model="show">
      <img v-if="flag" src="../../assets//upload/popup_successful.png" alt="">
      <img v-else src="../../assets//upload/popup_error.png" alt="">
      <p>验证通过</p>
    </van-popup>
  </div>
</template>
           
<script>
import { Toast } from "vant";
export default {
  name: "myupload",
  props: {
    row: {
      type:[Boolean,String],
      default: true,
    },
    uploadIpt: {
       type:[Boolean,String],
      default: true,
    },
  },
  data() {
    return {
      flag: true,
      show: false,
      info: {
        name: "1",
        number: "2",
      },

      srcOthers1: null,
      srcOthers2: null,
      result: [],
      oldval: {},
    };
  },
  watch: {
    deepInfo: {
      deep: true,
      handler(newval, oldval) {
        // console.log(newval, "new");
        // console.log(oldval, "old");
        // this.oldval = oldval
        this.oldval = newval;
      },
    },
  },
  computed: {
    deepInfo() {
      return JSON.parse(JSON.stringify(this.info));
    },
  },
  methods: {
    uploadIptFn() {
      this.$emit("input", this.info);
    },
    uploadbtn() {
      if (!this.result[0]) return Toast.fail("请上传身份证正面");
      if (!this.result[1]) return Toast.fail("请上传身份证反面");
      this.info.name = "";
      this.info.number = "";
      this.$emit("upload", this.result, this.oldval);
    },
    getFileOthers1(e) {
      let _this = this;
      var files = e.target.files[0];
      console.log(e.target.files[0]);
      if (!e || !window.FileReader || !files) return;
      const reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onloadend = function () {
        _this.srcOthers1 = this.result;
        _this.result[0] = this.result;
        // console.log(this.result);
      };
    },

    getFileOthers2(e) {
      let _this = this;
      var files = e.target.files[0];
      console.log(e.target.files[0]);
      if (!e || !window.FileReader || !files) return;
      const reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onloadend = function () {
        _this.srcOthers2 = this.result;
        _this.result[1] = this.result;
      };
    },
  },
};
</script>
<style scoped lang='less'>
.van-popup,
.van-popup--center {
  width: 4rem;
  height: 3rem;
  border-radius: 0.1rem;

  img {
    position: absolute;
    top: 0.6rem;
    left: 50%;
    transform: translateX(-50%);
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    margin-bottom: 0.4rem;
  }

  p {
    position: absolute;
    top: 2rem;
    left: 50%;
    transform: translateX(-50%);
    color: #222222;
    font-size: 0.3rem;
  }
}
.myfileColumn {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title {
    font-size: 0.3rem;
    color: #222222;
    font-weight: 700;
    margin: 0.4rem 0 0 0;
  }
  .uploadSub {
    width: 6.7rem;
    height: 0.8rem;
    text-align: center;
    color: #ffffff;
    font-size: 0.32rem;
    border: none;
    background-color: #1989fa;
    border-radius: 0.4rem;
    line-height: 0.8rem;
    margin: 0.6rem;
  }
  .tips {
    font-size: 0.24rem;
    color: #b3b3b3;
  }
  .imgUpload {
    position: absolute;
    vertical-align: middle;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 106%;
    height: 106%;
    //   border-radius: 0.3rem;
  }
  .fileBox {
    margin-top: 0.4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
  }
  .fileBox-word {
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .fileinput2 {
    background: url("../../assets/upload/identity_back_320.png") no-repeat;
  }
  .fileinput1 {
    background: url("../../assets/upload/identity_front_320.png") no-repeat;
  }
  .fileinput-button {
    width: 4.8rem;
    height: 3.6rem;

    display: flex;

    line-height: 150px;
    position: relative;
    display: inline-block;
    overflow: hidden;
    color: #ccc;

    background-size: 100%;
    background-position: center;
  }
  .fileinput-button input {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    opacity: 0;
    //   -ms-filter: "alpha(opacity=0)";
  }
  .fileinput-word {
    display: flex;
    width: 100px;
    text-align: center;
    //   float: left;
    margin-top: 10px;
    position: relative;
    display: inline-block;
    overflow: hidden;
    color: #666;
    font-size: 14px;
  }
}
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    width: 6.8rem;
    margin-left: 0.4rem;
    font-weight: 700;
    font-size: 0.3rem;
    color: #222222;
  }
  .info {
    display: flex;
    align-items: center;
    margin-bottom: 0.24rem;
    span {
      font-size: 0.3rem;
      color: #808080;
      margin: 0 0.4rem;
    }

    input {
      box-sizing: border-box;
      height: 0.8rem;
      width: 5.1rem;
      padding: 0 0.3rem;
      border: none;
      border-radius: 0.1rem;
      background-color: #f5f5f5;
      font-size: 0.3rem;
      color: #b3b3b3;
    }
  }
}
.myfileRow {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .title {
    margin: 0;
    font-size: 16px;
    // flex: 100%;
    width: 6.4rem;
    font-size: 0.3rem;
    font-weight: 700;
  }
  .uploadSub {
    width: 6.7rem;
    height: 0.8rem;
    text-align: center;
    color: #ffffff;
    font-size: 0.32rem;
    border: none;
    background-color: #1989fa;
    border-radius: 0.4rem;
    line-height: 0.8rem;
    margin: 0.6rem;
  }
  .tips {
    font-size: 0.24rem;
    color: #b3b3b3;
  }
  .imgUpload {
    position: absolute;
    vertical-align: middle;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 106%;
    height: 106%;
    //   border-radius: 0.3rem;
  }
  .fileBox {
    margin-top: 0.3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
  }
  .fileBox-word {
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .fileinput2 {
    margin-left: 0.15rem;
    background: url("../../assets/upload/identity_back_320.png") no-repeat;
  }
  .fileinput1 {
    margin-right: 0.15rem;
    background: url("../../assets/upload/identity_front_320.png") no-repeat;
  }
  .fileinput-button {
    width: 3.2rem;
    height: 2.4rem;
    // margin-left: 0.3rem;
    display: flex;

    line-height: 150px;
    position: relative;
    display: inline-block;
    overflow: hidden;
    color: #ccc;

    background-size: 100%;
    background-position: center;
  }
  .fileinput-button input {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    opacity: 0;
    //   -ms-filter: "alpha(opacity=0)";
  }
  .fileinput-word {
    display: flex;
    width: 100px;
    text-align: center;
    //   float: left;
    margin-top: 10px;
    position: relative;
    display: inline-block;
    overflow: hidden;
    color: #666;
    font-size: 14px;
  }
}
</style>