<template>
  <div class="sancPage">
    <van-nav-bar title="标题" left-text="返回" right-text="按钮" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
    <div class="scan">
      <div id="bcid">
        <div style="height:40%"></div>
        <p class="tip">...载入中...</p>
      </div>
    </div>
  </div>
</template>
                   
<script>
let scan = null;
export default {
  data() {
    return {
      codeUrl: "",
    };
  },
  mounted() {
    this.startRecognize();
  },
  methods: {
    onClickRight() {},

    onClickLeft() {
      this.closeScan();
      this.$router.back();
    },
    //创建扫描控件
    startRecognize() {
      let that = this;
      if (!window.plus) return;
      scan = new plus.barcode.Barcode("bcid");
      scan.onmarked = onmarked;
      that.startScan();
      function onmarked(type, result, file) {
        switch (type) {
          case plus.barcode.QR:
            type = "QR";
            break;
          case plus.barcode.EAN13:
            type = "EAN13";
            break;
          case plus.barcode.EAN8:
            type = "EAN8";
            break;
          default:
            type = "其它" + type;
            break;
        }
        result = result.replace(/\n/g, "");
        that.codeUrl = result;
        alert(result);
        that.closeScan();
      }
    },
    //开始扫描
    startScan() {
      if (!window.plus) return;
      scan.start();
    },
    //关闭扫描
    cancelScan() {
      if (!window.plus) return;
      scan.cancel();
    },
    //关闭条码识别控件
    closeScan() {
      if (!window.plus) return;
      scan.close();
    },
  },
};
</script>
<style scoped lang='less'>
.sancPage {
  height: 100%;
  //   width: 100%;
}
.scan {
  height: 100%;
  #bcid {
    // width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 2rem;
    bottom: 0rem;
    text-align: center;
    color: #fff;
    background: #ccc;
  }
  footer {
    position: absolute;
    left: 0;
    bottom: 1rem;
    height: 2rem;
    line-height: 2rem;
    z-index: 2;
  }
}
</style>