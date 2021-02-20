<template>
  <van-dialog v-model="show" :showConfirmButton='false'>

    <!-- 拼图验证码 -->
    <div class="mask_layer_model" v-if="visible" style="z-index: 9;">
      <div class="captcha_model">
        <div class="header">
          <span>拼图验证码</span>
          <span style="float: right" title="关闭验证码" @click="close1">
            <van-icon name="cross" />
          </span>
          <i class="" style="float: right" @click="onRefresh" title="刷新验证码">
            <van-icon name="replay" v-if="flag" />
            <van-loading size="22" v-else />
          </i>

        </div>
        <div class="content">
          <div class="sliding-pictures">

            <div id="captcha">

            </div>
          </div>
        </div>
        <div class="sliderContainer">
          <div class="sliderMask">
            <div class="slider">
              <span class="sliderIcon"></span>
            </div>
          </div>
          <span class="sliderText">向右滑动填充拼图</span>
        </div>
      </div>

    </div>

    <!-- 选字验证码 -->
    <div style="position: relative" v-else @mouseover="mode === 'pop'?(showImage = true):undefined" @mouseout="mode === 'pop'?(showImage = false):undefined">
      <div class="point_title" style="z-index:3" v-show="showRefresh">
        <span class="content fl">选字验证码</span>
        <van-icon class="rl" size=25 name="cross" @click="close" />
        <van-icon class="rl" size=25 @click="refresh" name="replay" />
      </div>
      <div class="verify-img-out" v-show="showImage" @mouseover="mode === 'pop'?(showImage = true):undefined" @mouseout="mode === 'pop'?(showImage = false):undefined" :style="mode === 'pop' ?
                                {display: 'none', position: 'absolute', bottom: '42px', height:'205px'} :
                                {position: 'relative', height: '205px'}">
        <div class="verify-img-panel" :style="{'width': setSize.imgWidth,
                                                   'height': setSize.imgHeight,
                                                   'background-size' : setSize.imgWidth + ' '+ setSize.imgHeight,
                                                   'margin-bottom': vSpace + 'px'}">
          <div :class="['notice',{'captchaSuccess':statusFlag},{'captchaFail':status}]">{{successText}}</div>
          <canvas :width="setSize.imgWidth" :height="setSize.imgHeight" ref="canvas" @click="bindingClick?canvasClick($event):undefined"></canvas>
          <div v-for="(tempPoint, index) in tempPoints" :key="index" class="point-area" :style="{
                        'background-color':'#198ff9',
                        color:'#fff',
                        'z-index':9999,
                        width:'30px',
                        height:'30px',
                        'text-align':'center',
                        'line-height':'30px',
                        'border-radius': '50%',
                        position:'absolute',
                        top:parseInt(tempPoint.y-10) + 'px',
                        left:parseInt(tempPoint.x-10) + 'px'
                     }">
            {{index + 1}}
          </div>
        </div>
      </div>
      <div class="verify-bar-area" :style="{'width':'100%',
                      'height': '68px',
                      'color': '#bfbfbf',
                      'border-color': this.barAreaBorderColor,
                      'line-height':'68px'}">
        <span class="verify-msg">{{text}}</span>
      </div>
    </div>
  </van-dialog>
</template>


<script>
import { Toast } from "vant";
import {
  resetSize,
  _code_chars,
  _code_color1,
  _code_color2,
} from "../../utils/captcha";

function getOffset(Node, offset = { top: 0, left: 0 }) {
  if (Node == document.body) {
    //当该节点为body节点时，结束递归
    return offset;
  }

  offset.top += Node.offsetTop;
  offset.left += Node.offsetLeft;

  return getOffset(Node.parentNode, offset); //向上累加offset里的值
}

export default {
  name: "mycaptcha",
  props: {
    visible: {
      type: [Boolean, String],
      default: false,
    },
    show: {
      type: [Boolean, String],
      default: false,
    },
    //弹出式pop，固定fixed
    mode: {
      type: String,
      default: "fixed",
    },
    //默认的文字数量
    defaultNum: {
      type: Number,
      default: 4,
    },
    //校对的文字数量
    checkNum: {
      type: Number,
      default: 3,
    },
    //间隔
    vSpace: {
      type: Number,
      default: 5,
    },
    imgUrl: {
      type: String,
      default: "https://picsum.photos/300/150/?id=",
    },
    imgName: {
      type: Array,
      default() {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9];
      },
    },
    imgSize: {
      type: Object,
      default() {
        return {
          width: "320px",
          height: "200px",
        };
      },
    },
    barSize: {
      type: Object,
      default() {
        return {
          width: "200px",
          height: "100px",
        };
      },
    },
  },
  data() {
    return {
      status: false,
      statusFlag: false,
      successText: "验证成功",

      fontPos: [], // 选中的坐标信息
      checkPosArr: [], //用户点击的坐标
      num: 1, //点击的记数
      imgRand: 0, // //随机的背景图片
      setSize: {
        imgHeight: 0,
        imgWidth: 0,
        barHeight: 0,
        barWidth: 0,
      },
      showImage: true,
      tempPoints: [],
      text: "",
      barAreaColor: undefined,
      barAreaBorderColor: undefined,
      showRefresh: true,
      bindingClick: true,
      flag: true,

      cv: {
        w: 310,
        h: 200,
      },
      block: {
        l: 42, // 滑块边长
        L: 42 + 9 * 2 + 3, // 滑块实际边长
        r: 9, // 滑块半径
      },
      randomPos: {
        x: 0,
        y: 0,
      },
      canvasCtx: null,
      blockCtx: null,
      blockDom: null,
      sliderDom: null,
      sliderContainerDom: null,
      sliderMaskDom: null,
      el: null,
      img: null,
      trail: null,
    };
  },
  computed: {
    resetSize() {
      return resetSize;
    },
  },
  watch: {
    show() {
      if (!this.visible) {
        console.log("选字");
        setTimeout(() => {
          this.init1();
        }, 0);
      }
    },
    visible() {
      // if (this.visible)
      if (this.show && this.visible) {
        setTimeout(() => {
          this.init();
        }, 0);
      }

     
    },
    // type变化则全面刷新
    type: {
      immediate: true,
      handler() {
        // this.init1();
      },
    },
  },

  mounted() {
    if (!this.visible && this.show) {
      console.log("选字");
      // this.init1();
    }
    // 禁止拖拽
    this.$el.onselectstart = function () {
      return false;
    };
  },
  methods: {
    init1() {
      //加载页面
      this.fontPos.splice(0, this.fontPos.length);
      this.checkPosArr.splice(0, this.checkPosArr.length);
      this.num = 1;
      this.imgRand = Math.floor(Math.random() * this.imgName.length);

      this.$nextTick(() => {
        this.setSize = this.resetSize(this); //重新设置宽度高度
        this.refresh();
        this.$parent.$emit("ready", this);
      });
    },
    canvasClick(e) {
      this.checkPosArr.push(this.getMousePos(this.$refs.canvas, e));
      if (this.num == this.checkNum) {
        this.num = this.createPoint(this.getMousePos(this.$refs.canvas, e));
        setTimeout(() => {
          var flag = this.comparePos(this.fontPos, this.checkPosArr);
          if (flag == false) {
            //验证失败
            this.statusFlag = false;
            this.status = true;
            this.successText = "验证失败,请重试";
            this.$emit("error");
            this.barAreaColor = "#d9534f";
            this.barAreaBorderColor = "#d9534f";
            // this.text = "验证失败";

            setTimeout(() => {
              this.status = false;
              this.refresh();
            }, 2000);
          } else {
            //验证成功
            this.successText = "验证成功";
            this.statusFlag = true;
            this.status = false;
            this.barAreaColor = "#4cae4c";
            this.barAreaBorderColor = "#5cb85c";
            // this.text = "验证成功";
            // this.showRefresh = false;
            this.bindingClick = false;
            // setTimeout(() => {
            //   this.show = false
            // }, 2000);
            this.$emit("success", this.show);
          }
        }, 400);
      }

      if (this.num < this.checkNum) {
        this.num = this.createPoint(this.getMousePos(this.$refs.canvas, e));
      }
    },
    //绘制合成的图片
    drawImg: function (obj, img) {
      //准备canvas环境
      if (!this.show || this.visible) return;
      var canvas = this.$refs.canvas;
      var ctx = canvas.getContext("2d");

      // 绘制图片
      ctx.drawImage(
        img,
        0,
        0,
        parseInt(this.setSize.imgWidth),
        parseInt(this.setSize.imgHeight)
      );

      // 绘制水印
      var fontSizeArr = [
        "italic small-caps bold 20px microsoft yahei",
        "small-caps normal 25px arial",
        "34px microsoft yahei",
      ];
      var fontStr =
        "天地玄黄宇宙洪荒日月盈昃辰宿列张寒来暑往秋收冬藏闰余成岁律吕调阳云腾致雨露结为霜金生丽水玉出昆冈剑号巨阙珠称夜光果珍李柰菜重芥姜海咸河淡鳞潜羽翔龙师火帝鸟官人皇始制文字乃服衣裳推位让国有虞陶唐吊民伐罪周发殷汤坐朝问道垂拱平章爱育黎首臣伏戎羌遐迩体率宾归王"; //不重复的汉字

      var fontChars = [];

      var avg = Math.floor(
        parseInt(this.setSize.imgWidth) / (parseInt(this.defaultNum) + 1)
      );
      var tmp_index = "";
      var color2Num = Math.floor(Math.random() * 5);

      for (var i = 1; i <= this.defaultNum; i++) {
        fontChars[i - 1] = this.getChars(fontStr, fontChars);

        tmp_index = Math.floor(Math.random() * 3);
        ctx.font = fontSizeArr[tmp_index];
        ctx.fillStyle = _code_color2[color2Num];

        if (Math.floor(Math.random() * 2) == 1) {
          var tmp_y =
            Math.floor(parseInt(this.setSize.imgHeight) / 2) +
            tmp_index * 20 +
            20;
        } else {
          var tmp_y =
            Math.floor(parseInt(this.setSize.imgHeight) / 2) - tmp_index * 20;
        }

        ctx.fillText(fontChars[i - 1], avg * i, tmp_y);
        this.fontPos[i - 1] = { char: fontChars[i - 1], x: avg * i, y: tmp_y };
      }

      for (var i = 0; i < this.defaultNum - this.checkNum; i++) {
        this.shuffle(this.fontPos).pop();
      }

      var msgStr = "";
      for (var i = 0; i < this.fontPos.length; i++) {
        msgStr += this.fontPos[i].char + ",";
      }

      this.text =
        "请顺序点击【" + msgStr.substring(0, msgStr.length - 1) + "】";

      return this.fontPos;
    },
    //获取坐标
    getMousePos: function (obj, e) {
      var x = e.offsetX - 5;
      var y = e.offsetY - 5;

      return { x, y };
    },
    //递归去重
    getChars: function (fontStr, fontChars) {
      var tmp_rand = parseInt(Math.floor(Math.random() * fontStr.length));
      if (tmp_rand > 0) {
        tmp_rand = tmp_rand - 1;
      }

      var tmp_char = fontStr.charAt(tmp_rand);
      if (fontChars.indexOf(tmp_char) == -1) {
        return tmp_char;
      } else {
        return this.getChars(fontStr, fontChars);
      }
    },
    //洗牌数组
    shuffle: function (arr) {
      var m = arr.length,
        i;
      var tmpF;
      while (m) {
        i = (Math.random() * m--) >>> 0;
        tmpF = arr[m];
        arr[m] = arr[i];
        arr[i] = tmpF;
        //[arr[m], arr[i]] = [arr[i], arr[m]];	//低版本浏览器不支持此写法
      }
      return arr;
    },
    //创建坐标点
    createPoint: function (pos) {
      this.tempPoints.push(Object.assign({}, pos));
      return ++this.num;
    },
    comparePos: function (fontPos, checkPosArr) {
      var flag = true;
      for (var i = 0; i < fontPos.length; i++) {
        if (
          !(
            parseInt(checkPosArr[i].x) + 40 > fontPos[i].x &&
            parseInt(checkPosArr[i].x) - 40 < fontPos[i].x &&
            parseInt(checkPosArr[i].y) + 40 > fontPos[i].y &&
            parseInt(checkPosArr[i].y) - 40 < fontPos[i].y
          )
        ) {
          flag = false;
          break;
        }
      }

      return flag;
    },
    close1() {
      this.show = false;
    },
    refresh: function () {
      this.statusFlag = false;
      this.tempPoints.splice(0, this.tempPoints.length);
      this.barAreaColor = "#000";
      this.barAreaBorderColor = "#ddd";
      this.bindingClick = true;

      this.fontPos.splice(0, this.fontPos.length);
      this.checkPosArr.splice(0, this.checkPosArr.length);
      this.num = 1;

      this.imgRand = Math.floor(Math.random() * this.imgName.length); //随机的背景图片
      var img = new Image();
      img.src = this.imgUrl + this.imgName[this.imgRand];
      // 加载完成开始绘制
      var _this = this;
      img.onload = function (e) {
        _this.$nextTick(() => {
          _this.fontPos = _this.drawImg(_this.$el, this);
        });
      };

      this.text = "验证失败";
      this.showRefresh = true;
    },
    close() {
      //   this.visible = false;
      this.show = false;
    },
    init() {
      this.canvasInit();
      this.initImg();
      this.bindEvents();
    },
    onRefresh() {
      this.flag = false;
      setTimeout(() => {
        this.flag = true;
      }, 1500);
      this.reset();
    },
    onSuccess() {
      Toast.success("验证成功");
      this.$emit("success", this.show);
      // setTimeout(() => {
      //   this.show = false;
      // }, 2000);
    },
    onFail() {
      Toast.fail("验证失败,请重试");
      this.$emit("error");
    },
    bindEvents() {
      this.el.onselectstart = () => false;

      let originX,
        originY,
        trail = [],
        isMouseDown = false;

      const addClass = function (tag, className) {
        tag.classList.add(className);
      };

      const removeClass = function (tag, className) {
        tag.classList.remove(className);
      };

      const handleDragStart = function (e) {
        originX = e.clientX || e.touches[0].clientX;
        originY = e.clientY || e.touches[0].clientY;
        isMouseDown = true;
        console.log(originX);
      };

      const handleDragMove = (e) => {
        if (!isMouseDown) return false;
        const eventX = e.clientX || e.touches[0].clientX;
        const eventY = e.clientY || e.touches[0].clientY;
        const moveX = eventX - originX;
        const moveY = eventY - originY;
        if (moveX < 0 || moveX + 38 >= this.cv.w) return false;
        this.sliderDom.style.left = moveX + "px";
        const blockLeft = ((this.cv.w - 40 - 20) / (this.cv.w - 40)) * moveX;
        this.blockDom.style.left = blockLeft + "px";

        addClass(this.sliderContainerDom, "sliderContainer_active");
        this.sliderMaskDom.style.width = moveX + "px";
        trail.push(moveY);
      };

      const handleDragEnd = (e) => {
        if (!isMouseDown) return false;
        isMouseDown = false;
        const eventX = e.clientX || e.changedTouches[0].clientX;
        if (eventX == originX) return false;
        removeClass(this.sliderContainerDom, "sliderContainer_active");
        this.trail = trail;
        const { spliced, verified } = this.verify();
        if (spliced) {
          if (verified) {
            addClass(this.sliderContainerDom, "sliderContainer_success");
            this.onSuccess();
          } else {
            addClass(this.sliderContainerDom, "sliderContainer_fail");
            this.onFail();
            this.reset();
          }
        } else {
          addClass(this.sliderContainerDom, "sliderContainer_fail");
          this.onFail();
          setTimeout(() => {
            this.reset();
          }, 2000);
        }
      };
      this.sliderDom.addEventListener("mousedown", handleDragStart);
      this.sliderDom.addEventListener("touchstart", handleDragStart);
      this.blockDom.addEventListener("mousedown", handleDragStart);
      this.blockDom.addEventListener("touchstart", handleDragStart);
      document.addEventListener("mousemove", handleDragMove);
      document.addEventListener("touchmove", handleDragMove);
      document.addEventListener("mouseup", handleDragEnd);
      document.addEventListener("touchend", handleDragEnd);
    },
    verify() {
      const sum = function (x, y) {
        return x + y;
      };
      const square = function (x) {
        return x * x;
      };

      const arr = this.trail; // 拖动时y轴的移动距离
      const average = arr.reduce(sum) / arr.length;
      const deviations = arr.map((x) => x - average);
      const stddev = Math.sqrt(deviations.map(square).reduce(sum) / arr.length);
      const left = parseInt(this.blockDom.style.left);
      return {
        spliced: Math.abs(left - this.randomPos.x) < 10,
        verified: stddev !== 0, // 简单验证下拖动轨迹，为零时表示Y轴上下没有波动，可能非人为操作
      };
    },
    reset() {
      this.sliderContainerDom.className = "sliderContainer";
      this.sliderDom.style.left = 0;
      this.blockDom.style.left = 0;
      this.sliderMaskDom.style.width = 0;
      this.clean();
      this.img.setSrc(this.getRandomImgSrc());
      //   this.flag = true;
    },
    clean() {
      this.canvasCtx.clearRect(0, 0, this.cv.w, this.cv.h);
      this.blockCtx.clearRect(0, 0, this.cv.w, this.cv.h);
      this.blockDom.width = this.cv.w;
    },
    draw() {
      // 随机创建滑块的位置
      this.randomPos.x = this.getRandomNumberByRange(
        this.block.L + 10,
        this.cv.w - (this.block.L + 10)
      );
      this.randomPos.y = this.getRandomNumberByRange(
        10 + this.block.r * 2,
        this.cv.h - (this.block.L + 10)
      );
      this.drawBlock(
        this.canvasCtx,
        this.randomPos.x,
        this.randomPos.y,
        "fill"
      );
      this.drawBlock(this.blockCtx, this.randomPos.x, this.randomPos.y, "clip");
    },
    drawBlock(ctx, x, y, operation) {
      let r = this.block.r,
        l = this.block.l,
        PI = Math.PI;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.arc(x + l / 2, y - r + 2, r, 0.72 * PI, 2.26 * PI);
      ctx.lineTo(x + l, y);
      ctx.arc(x + l + r - 2, y + l / 2, r, 1.21 * PI, 2.78 * PI);
      ctx.lineTo(x + l, y + l);
      ctx.lineTo(x, y + l);
      ctx.arc(x + r - 2, y + l / 2, r + 0.4, 2.76 * PI, 1.24 * PI, true);
      ctx.lineTo(x, y);
      ctx.lineWidth = 2;
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
      ctx.stroke();
      ctx[operation]();
      ctx.globalCompositeOperation = "destination-over";
    },
    initImg() {
      const img = this.createImg(() => {
        this.draw();
        this.canvasCtx.drawImage(img, 0, 0, this.cv.w, this.cv.h);
        this.blockCtx.drawImage(img, 0, 0, this.cv.w, this.cv.h);
        const y = this.randomPos.y - this.block.r * 2 - 1;
        const ImageData = this.blockCtx.getImageData(
          this.randomPos.x - 3,
          y,
          this.block.L,
          this.block.L
        );
        this.blockDom.width = this.block.L;
        this.blockCtx.putImageData(ImageData, 0, y);
      });
      this.img = img;
    },
    canvasInit() {
      const canvas = this.createCanvas(this.cv.w, this.cv.h); // 画布
      const block = canvas.cloneNode(true); // 滑块
      block.className = "block";
      const el = (this.el = document.getElementById("captcha"));
      console.log(document.getElementById("captcha"));
      el.style.position = "relative";
      el.style.width = this.cv.w + "px";
      Object.assign(el.style, {
        position: "relative",
        width: this.cv.w + "px",
        margin: "0 auto",
      });

      this.el = el;
      el.appendChild(canvas);
      el.appendChild(block);

      this.canvasCtx = canvas.getContext("2d");
      this.blockCtx = block.getContext("2d");
      this.blockDom = block;
      this.sliderDom = document.getElementsByClassName("slider")[0];
      this.sliderContainerDom = document.getElementsByClassName(
        "sliderContainer"
      )[0];
      this.sliderMaskDom = document.getElementsByClassName("sliderMask")[0];
      console.log(this.sliderDom);
    },
    createCanvas(width, height) {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      return canvas;
    },
    createImg(onload) {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = onload;
      img.onerror = () => {
        img.setSrc(this.getRandomImgSrc());
      };

      img.setSrc = (src) => {
        if (window.navigator.userAgent.indexOf("Trident") > -1) {
          const xhr = new XMLHttpRequest();
          xhr.onloadend = (e) => {
            const file = new FileReader();
            file.readAsDataURL(e.target.response);
            file.onloadend = function (e) {
              img.src = e.target.result;
            };
          };
          xhr.open("GET", src);
          xhr.responseType = "blob";
          xhr.send();
        } else img.src = src;
      };
      img.setSrc(this.getRandomImgSrc());
      return img;
    },

    getRandomNumberByRange(start, end) {
      return Math.round(Math.random() * (end - start) + start);
    },
    getRandomImgSrc() {
      return (
        "https://picsum.photos/300/150/?image=" +
        this.getRandomNumberByRange(0, 1084)
      );
      // return 'https://picsum.photos/id/407/300/150'
    },
  },
};
</script>
<style   scoped lang="less">
.notice {
  position: absolute;
  width: 100%;
  height: 0;
  line-height: 40px;
  bottom: 5px;
  z-index: 9999999;
  text-align: center;
  background-color: rgba(82, 196, 26, 0.7);
  color: white;
  transition: all 0.5s;
}
.captchaSuccess {
  height: 40px;
}
.captchaFail {
  height: 40px;
  background-color: rgba(255, 69, 69, 0.7);
}

.fl {
  float: left;
}
.rl {
  float: right;
  margin-left: 1rem;
}
.point_title {
  height: 2rem;
  line-height: 2rem;
  padding: 0 0.5rem;
}
.verify-bar-area {
  width: 100%;
  text-align: center;
}
.rl {
  color: #bfbfbf;
  top: 0.6rem;
}
#captcha {
  height: 5.2rem;
}
/deep/canvas {
  position: absolute;
}
.van-icon,
.van-icon-cross {
  margin-top: 9px;
  margin-left: 20px;
  color: #bfbfbf;
}
.block {
  position: absolute;
  left: 0;
  top: 0;
  cursor: pointer;
  cursor: grab;
}

.block:active {
  cursor: pointer;
  cursor: grabbing;
}

.sliderContainer {
  position: relative;
  text-align: center;

  height: 40px;
  line-height: 40px;
  background: #f7f9fa;
  color: #45494c;
  border: 1px solid #e4e7eb;
  margin-bottom: 0.5rem;
  border-radius: 0.3rem;
}

.sliderContainer_active .slider {
  height: 38px;
  top: -1px;
  border: 1px solid #1991fa;
}

.sliderContainer_active .sliderMask {
  height: 38px;
  border-width: 1px;
}

.sliderContainer_success .slider {
  height: 38px;
  top: -1px;
  margin-left: -1px;
  border: 1px solid #52ccba;
  background-color: #52ccba !important;
}

.sliderContainer_success .sliderMask {
  height: 38px;
  border: 1px solid #52ccba;
  background-color: #d2f4ef;
}

.sliderContainer_success .sliderIcon {
  background-position: 0 0 !important;
}

.sliderContainer_fail .slider {
  height: 38px;
  top: -1px;
  border: 1px solid #f57a7a;
  background-color: #f57a7a !important;
}

.sliderContainer_fail .sliderMask {
  height: 38px;
  border: 1px solid #f57a7a;
  background-color: #fce1e1;
}

.sliderContainer_fail .sliderIcon {
  top: 14px;
  background-position: 0 -82px !important;
}
.sliderContainer_active .sliderText,
.sliderContainer_success .sliderText,
.sliderContainer_fail .sliderText {
  display: none;
}

.sliderMask {
  position: absolute;
  left: 0;
  top: 0;
  height: 40px;
  border: 0 solid #1991fa;
  background: #d1e9fe;
}

.slider {
  position: absolute;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  background: #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  transition: background 0.2s linear;
  cursor: pointer;
  cursor: grab;
}

.slider:active {
  cursor: grabbing;
}

.slider:hover {
  background: #1991fa;
}

.slider:hover .sliderIcon {
  background-position: 0 -13px;
}

.sliderIcon {
  position: absolute;
  top: 15px;
  left: 13px;
  width: 14px;
  height: 12px;
  background: url(http://cstaticdun.126.net//2.6.3/images/icon_light.f13cff3.png)
    0 -26px;
  background-size: 34px 471px;
}

// .refreshIcon {
//   position: absolute;
//   right: 0;
//   top: 0;
//   width: 34px;
//   height: 34px;
//   cursor: pointer;
//   background: url(http://cstaticdun.126.net//2.6.3/images/icon_light.f13cff3.png)
//     0 -437px;
//   background-size: 34px 471px;
// }

.captcha_model {
  background-color: white;
  //   margin-left: 5%;
  //   margin-right: 5%;
  .header {
    height: 1rem;
    line-height: 1rem;
    font-size: 0.5rem;
    padding: 2% 5%;
    border-bottom: 1px solid #ccc;
  }
  .content {
    padding: 0.5rem 0;
    .sliding-pictures {
      position: relative;
      i {
        position: absolute;
        right: 7%;
        z-index: 9;
        font-size: 0.22rem;
      }
    }
  }
}

.mask_layer_model {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  font-size: 0.13rem;
}
</style>