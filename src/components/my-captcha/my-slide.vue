<template>
  <div class="drag" ref="dragDiv">
    <div :class="['drag_bg',{'drag_success':confirmSuccess}]"></div>
    <div class="drag_text">{{confirmWords}}</div>
    <div ref="moveDiv" @touchstart="mousedownFn($event)" :class="['handler','handler_bg',{'handler_ok_bg':confirmSuccess},{'handler_move_bg':mouseMoveStata},{'handler_fail':mouseMovefail}]"
      style="position: absolute;top: 0px;left: 0px;"></div>
  </div>
</template>
 
<script>
export default {
  name: "myslide",
  data() {
    return {
      mouseMovefail: false,
      beginClientX: 0 /*距离屏幕左端距离*/,
      mouseMoveStata: false /*触发拖动状态  判断*/,
      maxwidth: "" /*拖动最大宽度，依据滑块宽度算出来的*/,
      confirmWords: "拖动滑块验证" /*滑块文字*/,
      confirmSuccess: false /*验证成功判断*/,
    };
  },
  methods: {
    mousedownFn: function (e) {
      if (!this.confirmSuccess) {
        e.preventDefault && e.preventDefault(); //阻止文字选中等 浏览器默认事件
        this.mouseMoveStata = true;
        this.beginClientX = e.changedTouches[0].clientX;
        document.getElementsByClassName("drag_bg")[0].style.border =
          " 1px solid #1989ff";
      }
    }, //mousedoen 事件
    successFunction() {
      this.confirmSuccess = true;
      this.confirmWords = "验证成功";
      this.$emit('success')
      document.getElementsByClassName("drag_bg")[0].style.border =
        " 1px solid #52c419";
      if (window.addEventListener) {
        document
          .getElementsByTagName("html")[0]
          .removeEventListener("touchmove", this.mouseMoveFn);
        document
          .getElementsByTagName("html")[0]
          .removeEventListener("touchend", this.moseUpFn);
      } else {
        document
          .getElementsByTagName("html")[0]
          .removeEventListener("touchend", () => {});
      }
      document.getElementsByClassName("drag_text")[0].style.color = "#52c41a";
      document.getElementsByClassName("handler")[0].style.left =
        this.maxwidth + "px";
      document.getElementsByClassName("drag_bg")[0].style.width =
        this.maxwidth + "px";
    }, //验证成功函数
    mouseMoveFn(e) {
      if (this.mouseMoveStata) {
        let width = e.changedTouches[0].clientX - this.beginClientX;
        if (width > 0 && width <= this.maxwidth) {
          this.mouseMovefail = false;

          document.getElementsByClassName("handler")[0].style.transition =
            "none";
          document.getElementsByClassName("drag_bg")[0].style.transition =
            "none";
          // document.getElementsByClassName("drag_bg")[0].style.backgroundColor =
          //   "#cce7ff";
          // document.getElementsByClassName("drag_bg")[0].style.border =
          //   "1px solid #1989ff";
          document.getElementsByClassName("handler")[0].style.left =
            width + "px";
          document.getElementsByClassName("drag_bg")[0].style.width =
            width + "px";
        } else if (width > this.maxwidth) {
          this.successFunction();
        }
      }
    }, //mousemove事件
    moseUpFn(e) {
      this.mouseMoveStata = false;
      var width = e.changedTouches[0].clientX - this.beginClientX;
      // console.log(width);
      if (width < this.maxwidth) {
        this.mouseMovefail = true;
        this.$emit('error')
        setTimeout(() => {
          this.mouseMovefail = false;
        }, 500);
        document.getElementsByClassName("handler")[0].style.transition =
          ".5s all";
        document.getElementsByClassName("drag_bg")[0].style.transition =
          ".5s all";

        document.getElementsByClassName("handler")[0].style.left = 0 + "px";
        // document.getElementsByClassName("handler")[0].classList.add("aaa");
        console.log(document.getElementsByClassName("handler")[0]);

        document.getElementsByClassName("drag_bg")[0].style.width = 0 + "px";
        // document.getElementsByClassName("drag_bg")[0].style.backgroundColor =
        //   "#ffcccc";
        document.getElementsByClassName("drag_bg")[0].style.border =
          " 1px solid #ff4545";
        // document.getElementsByClassName("drag_bg")[0].style.backgroundColor =
        //   "cce7ff";
      }
    }, //mouseup事件
  },
  mounted() {
    this.maxwidth =
      this.$refs.dragDiv.clientWidth - this.$refs.moveDiv.clientWidth;
    document
      .getElementsByTagName("html")[0]
      .addEventListener("touchmove", this.mouseMoveFn);
    document
      .getElementsByTagName("html")[0]
      .addEventListener("touchend", this.moseUpFn);
  },
};
</script>
 
<style scoped lang='less'>
.drag {
  position: relative;
  background-color: #e8e8e8;
  width: 100%;

  line-height: 34px;
  text-align: center;
  font-size: 0.5rem;
}
.handler {
  width: 33px;
  height: 100%;
  // border: 1px solid #ccc;
  cursor: move;
}
.handler_bg {
  background: #fff url("../../assets/captcha/verification_arrow.png");
  background-size: 108%;
}
.handler_move_bg {
  background: #fff url("../../assets/captcha/verification_ing.png");
  background-size: 108%;
}
.handler_ok_bg {
  background: #fff url("../../assets/captcha/verification_success.png");
  background-size: 100%;
}
.handler_fail {
  background: #fff url("../../assets/captcha/verification_error.png");
  background-size: 108%;
}
.drag_bg {
  background-color: #cce7ff;
  height: 34px;
  width: 0px;
  border: 1px solid #1989ff;
}
.drag_text {
  position: absolute;
  top: 1px;
  width: 100%;
  text-align: center;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  -o-user-select: none;
  -ms-user-select: none;
}
.drag_success {
  border: 1px solid #52c419;
  background-color: #c1f0aa;
}
</style>