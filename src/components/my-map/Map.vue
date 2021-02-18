<template>
  <div @click="close">
    1111
    <div class="search">
      <div class="position">
        <div v-if="MapType">
          <label for="position">
            省市 <input type="text" id="position">
          </label>
          <label for="address">
            地址 <input type="text" id="address">
          </label>
        </div>
        <div v-else>
          <label for="start">
            起始点 <input type="text" id="start" v-model="start" @focus="getTips('start',start)">
          </label>
          <div class="StartTips">
            <div class="tips_item" v-for="(v,i) in StartTipsList" :key="i" @click="tipsSelect(v,'start')"><span v-html="HeightLight((v.district + v.name),start)"></span></div>
          </div>
          <label for="end">
            终止点 <input type="text" id="end" v-model="end" @focus="getTips('end',end)">
          </label>
          <div class="EndTips">
            <div class="tips_item" v-for="(v,i) in EndTipsList" :key="i" @click="tipsSelect(v,'end')"><span v-html="HeightLight((v.district + v.name),end)"></span></div>
          </div>
        </div>
        <div class="button" @click="BuildPath">查询</div>
      </div>
    </div>
    <div id="mapp">
      <button class="ol-zoom-current" type="button" title="Zoom position" @click="CurrentCenterOrClear"> <img :src="MapType ? require('@/static/map_current.png') : require('@/static/map_refresh.png')"></button>
    </div>
    <div class="loading" v-if="loading">
      <div class="warpper">
        <div class="img"></div>
        <div class="text">正在生成路线...</div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/axios.js";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { transform, fromLonLat } from "ol/proj";
import Draw from "ol/interaction/Draw";
// 图上图标相关
import OlFeature from "ol/Feature";
import OlGeomPoint from "ol/geom/Point";
import OlLayerVector from "ol/layer/Vector";
import OlSourceVector from "ol/source/Vector";
import Overlay from "ol/Overlay";
// 用来添加相关文字描述的
import Text from "ol/style/Text";
import Fill from "ol/style/Fill";

import { Map, View } from "ol";
import { Style, Icon, Stroke, Circle } from "ol/style";
import LineString from "ol/geom/LineString";

import ScaleLine from "ol/control/ScaleLine";
export default {
  name: "yourMap",
  props: {
    MapType: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      map: null,
      draw: null,
      drawLayer: null,
      source: null,
      pointSource: null,
      measureTooltip: null,
      measureTooltipElement: null,
      start: "",
      end: "",
      isStart: "",
      isEnd: "",
      StartPoint: "",
      EndPoint: "",
      StartTipsList: [],
      EndTipsList: [],
      lineList: null,
      plan: null,
      loading: false,
      basePath: "http://192.168.1.13:8081/shenghuimap/",
      // MapType : false,
      currentLocation: [114.066912, 30.634955], //默认地址
      size: 1,
    };
  },
  methods: {
    //获取地图
    getMap() {
      //高德地图
      var gaodeMapLayer = new TileLayer({
        source: new XYZ({
          url: this.basePath + "/goldMap/getImage/V1/{z}/{x}/{y}.png",
        }),
      });
      var center = transform([114.066912, 30.634955], "EPSG:4326", "EPSG:3857");
      this.map = new Map({
        target: "mapp",
        layers: [gaodeMapLayer],
        view: new View({
          center: center, //wuhan
          zoom: 8,
          maxZoom: 15,
        }),
      });
      // 地图上绘画 点线
      this.source = new OlSourceVector();
      // 添加一个绘制的线使用的layer
      this.drawLayer = new OlLayerVector({
        //layer所对应的source
        source: this.source,
        style: new Style({
          fill: new Fill({
            color: "rgba(255,255,255,0.2)",
          }),
          stroke: new Stroke({
            color: "#3f94f2",
            width: 2,
          }),
          image: new Icon({
            src: require("@/static/position_architecture.png"),
            anchor: [0.5, 1],
          }),
        }),
      });
      this.pointSource = new OlSourceVector();
      var vector_point = new OlLayerVector({
        source: this.pointSource,
        style: new Style({
          image: new Icon({
            src: require("@/static/map_current_location.png"),
            anchor: [0.5, 1],
          }),
        }),
      });
      this.map.addLayer(this.drawLayer);
      this.map.addLayer(vector_point);
    },
    //更改视图变大变小图标
    ChangeZoomIcon() {
      var zoom = document.getElementsByClassName("ol-zoom")[0];
      var zoomin = document.getElementsByClassName("ol-zoom-in")[0];
      var zoomout = document.getElementsByClassName("ol-zoom-out")[0];
      zoomin.innerHTML =
        " <img src=" + require("@/static/map_enlarge.png") + " />";
      zoomout.innerHTML =
        " <img src=" + require("@/static/map_reduce.png") + " />";
    },
    //定位当前地址
    CurrentCenterOrClear() {
      if (this.MapType) {
        var Location = transform(
          [115.066912, 30.634955],
          "EPSG:4326",
          "EPSG:3857"
        );
        this.map.getView().setCenter(Location); //设置坐标为中心
        var point = new OlGeomPoint(Location);
        //将该点要素添加到矢量数据源中
        this.map.removeOverlay(this.measureTooltip);
        this.pointSource.clear();
        this.createMeasureTooltip();
        this.measureTooltip.setPosition(Location);
        this.measureTooltipElement.innerHTML = "详细地址信息";
        this.pointSource.addFeature(new OlFeature(point));
        this.map.getView().setZoom(15);
      } else {
        this.pointSource.clear();
        this.source.clear();
        this.map.removeOverlay(this.measureTooltip);
      }
    },
    //位置、公交站、地铁站 提示选择
    tipsSelect(data, type) {
      switch (type) {
        case "start":
          this.start = this.isStart = data.district + data.name;
          this.StartTipsList = "";
          this.StartPoint = data.location;
          if (this.StartPoint == undefined) {
            this.getTips("start", start);
          }
          break;
        case "end":
          this.end = this.isEnd = data.district + data.name;
          this.EndTipsList = "";
          this.EndPoint = data.location;
          if (this.EndPoint == undefined) {
            this.getTips("end", end);
          }
          break;
      }
    },
    //搜索地址
    ToSearch() {
      if (this.MapType) {
        this.SearchSetPoint();
      } else {
        this.RoadLine();
      }
    },
    SearchSetPoint() {
      // if(this.currentSearchlLocation != '' && this.currentSearchlLocation != undefined){
      this.InputTips = "";
      //根据鼠标点击位置生成一个点
      var Location = transform(this.currentLocation, "EPSG:4326", "EPSG:3857");
      this.map.getView().setCenter(Location); //设置坐标为中心
      var point = new OlGeomPoint(Location);
      //将该点要素添加到矢量数据源中
      this.map.removeOverlay(this.measureTooltip);
      this.pointSource.clear();
      this.createMeasureTooltip();
      this.measureTooltip.setPosition(Location);
      this.measureTooltipElement.innerHTML = "详细地址信息";
      this.pointSource.addFeature(new OlFeature(point));
      this.map.getView().setZoom(15);
      // }else{
      //     Message.error('未查询到地址信息,请将地址填写详细')
    },
    //生成路线
    BuildPath() {
      if (this.StartPoint == "") {
        console.log(this.StartPoint);
        this.$message({
          text: "请将起点位置信息填写详细",
          type: "error",
        });
        return false;
      }
      if (this.EndPoint == "") {
        console.log(this.EndPoint);
        this.$message({
          text: "请将终点位置信息填写详细",
          type: "error",
        });
        return false;
      }
      // const loading = Loading.service({
      //     lock: true,
      //     text: '正在生成路线...',
      //     background: 'rgba(0, 0, 0, 0.7)'
      //   });
      this.loading = true;
      request
        .get(
          `${this.basePath}goldMap/direction/truck?originAd=${this.start}&destinationAd=${this.end}&version="V1"&size=${this.size}`
        )
        .then((res) => {
          let data = res.data;
          if (data.status == 1) {
            var startPoint = transform(
              this.StartPoint.split(","),
              "EPSG:4326",
              "EPSG:3857"
            );
            var endPoint = transform(
              this.EndPoint.split(","),
              "EPSG:4326",
              "EPSG:3857"
            );
            this.map.getView().setCenter(startPoint); //设置坐标为中心
            this.map.getView().setZoom(10);
            var startP = new OlFeature(new OlGeomPoint(startPoint)); //路线起始点
            startP.setStyle(
              new Style({
                image: new Icon({
                  anchor: [0.5, 1],
                  src: require("@/static/map_point_starting.png"),
                }),
              })
            );
            var endP = new OlFeature(new OlGeomPoint(endPoint)); //路线起始点
            this.pointSource.clear();
            this.pointSource.addFeature(startP);
            this.pointSource.addFeature(endP);
            endP.setStyle(
              new Style({
                image: new Icon({
                  anchor: [0.5, 1],
                  src: require("@/static/map_point_end.png"),
                }),
              })
            );
            this.lineList = [];
            this.source.clear();
            this.plan = data.route.paths;
            for (var i = 0; i < data.route.paths.length; i++) {
              //驾车的方案
              var steps = data.route.paths[i].steps;
              var lineListNumber = []; //保存每条线路的坐标连线// $("#showLineDiv" + lineNumber).append('<div style="margin-left:5%;display: none">'+'<img src="images/icon_qidian_nor.png" />'+'<span><p>'+startAreaText+'</p></span></div>');
              for (var j = 0; j < steps.length; j++) {
                //每个方案的具体路段
                var polyline = steps[j].polyline; //每个路段具体的坐标点
                var lonAndLats = polyline.split(";");
                if (lonAndLats.length > 1) {
                  for (var t = 0; t < lonAndLats.length - 1; t++) {
                    var start = lonAndLats[t].split(",");
                    var end = lonAndLats[t + 1].split(",");
                    for (var mm = 0; mm < start.length; mm++) {
                      //接口返回的集合中的数据是字符串，转换为数字
                      start[mm] = Number(start[mm]);
                    }
                    for (var nn = 0; nn < end.length; nn++) {
                      end[nn] = Number(end[nn]);
                    }
                    if (j == 0 && t == 0) {
                      //将起点和第一点连起来
                      var startline = this.insertLine(
                        this.StartPoint.split(","),
                        start
                      );
                      lineListNumber.push(startline);
                    }
                    var line = this.insertLine(start, end);
                    lineListNumber.push(line);
                  }
                }
              }
              this.lineList.push(lineListNumber);
            }
            var firstList = this.lineList[0];
            for (var i = 0; i < firstList.length; i++) {
              this.source.addFeature(firstList[i]);
            }
            // loading.close()
            this.loading = false;
          } else {
            // loading.close()
            this.loading = false;
            this.$message({
              text: res.data.resp_msg,
              type: "error",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createMeasureTooltip() {
      //创建测量提示框的div
      this.measureTooltipElement = document.createElement("div");
      this.measureTooltipElement.setAttribute("id", "lengthLabel");
      //设置测量提示要素的样式
      this.measureTooltipElement.className = "tooltip tooltip-static";
      //创建一个测量提示的覆盖标注
      this.measureTooltip = new Overlay({
        element: this.measureTooltipElement,
        offset: [0, -47],
        positioning: "bottom-center",
      });
      //将测量提示的覆盖标注添加到地图中
      this.map.addOverlay(this.measureTooltip);
    },
    //搜索框获取提示信息
    getTips(type, value) {
      clearTimeout(this.timer); //清除延迟执行
      this.timer = setTimeout(() => {
        console.log(value);
        request(`${this.basePath}goldMap/getInputtips/`, {
          area: value,
        })
          .then((res) => {
            if (res.data.status == 1) {
              var tips = res.data.tips;
              switch (type) {
                case "InputTips":
                  this.InputTips = tips;
                  break;
                case "start":
                  this.StartTipsList = tips;
                  break;
                case "end":
                  this.EndTipsList = tips;
                  break;
                default:
                  break;
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, 500);
    },
    HeightLight(val, keyword) {
      // 方法2：用正则表达式
      const Reg = new RegExp(keyword, "i");
      if (val) {
        const res = val.replace(
          Reg,
          `<span style="color: #0069c4;font-size : 16px ">${keyword}</span>`
        );
        return res;
      }
    },
    close() {
      this.StartTipsList = "";
      this.EndTipsList = "";
    },
    insertLine(startPoint, endPoint) {
      var line = new OlFeature({
        geometry: new LineString([
          fromLonLat(startPoint),
          fromLonLat(endPoint),
        ]),
      });
      line.setStyle(
        new Style({
          stroke: new Stroke({
            width: 3,
            color: "green",
          }),
        })
      );
      return line;
    },
  },
  watch: {
    start(e) {
      if (e && this.isStart != e) {
        console.log(e, this.isStart);
        this.getTips("start", e);
      } else {
        this.StartTipsList = "";
      }
    },
    end(e) {
      if (e && this.isEnd != e) {
        this.getTips("end", e);
      } else {
        this.EndTipsList = "";
      }
    },
  },
  mounted() {
    this.getMap(); //加载地图
    this.ChangeZoomIcon(); //更改视图变大变小图标
  },
};
</script>

<style scoped lang="less">
.search {
  margin-bottom: 20px;
  position: relative;
  z-index: 10;
  .position {
    font-size: 14px;
    height: 32px;
    line-height: 32px;
    display: flex;
    box-sizing: border-box;
    input#position {
      width: 150px;
      height: 32px;
      outline: none;
      border: 1px solid #cccccc;
      box-sizing: border-box;
      margin-left: 8px;
      padding-left: 8px;
      background-image: url("~@/static/arrow_down.png");
      background-repeat: no-repeat;
      background-position: 95% 50%;
      margin-right: 40px;
    }
    input#address {
      width: 250px;
      height: 32px;
      box-sizing: border-box;
      outline: none;
      border: 1px solid #cccccc;
      margin-left: 8px;
      padding-left: 8px;
      margin-right: 40px;
    }
    #start,
    #end {
      width: 250px;
      height: 32px;
      outline: none;
      border: 1px solid #cccccc;
      margin-left: 8px;
      padding-left: 8px;
      margin-right: 40px;
      background-image: url("~@/static/arrow_down.png");
      background-repeat: no-repeat;
      background-position: 95% 50%;
    }
    .StartTips,
    .EndTips {
      position: absolute;
      width: 262px;
      background: #ffffff;
      top: 40px;
      border-radius: 3px;
      box-sizing: border-box;
      box-shadow: 0px 2px 6px rgba(1, 25, 25, 0.2);
      .tips_item {
        font-size: 14px;
        text-align: left;
        min-height: 20px;
        line-height: 20px;
        // padding-left: 7px;
        padding: 5px 7px;
        cursor: pointer;
        &:hover {
          background: rgba(0, 105, 196, 0.2);
        }
      }
    }
    .StartTips {
      left: 53px;
    }
    .EndTips {
      left: 415px;
    }
    .button {
      display: inline-block;
      width: 64px;
      height: 32px;
      font-size: 14px;
      color: #ffffff;
      background-color: #198ff9;
      text-align: center;
      line-height: 32px;
      border-radius: 2px;
      cursor: pointer;
    }
  }
}
#mapp {
  position: relative;
  height: 568px;
  width: 100%;
}
.ol-zoom {
  bottom: 8px;
  top: unset !important;
  right: 8px;
  left: unset !important;
}
.ol-control {
  background-color: unset !important;
}
.ol-zoom .ol-zoom-in {
  margin-bottom: 9px;
}
.ol-zoom .ol-zoom-in,
.ol-zoom .ol-zoom-out {
  border-radius: 4px !important;
}
.ol-control button {
  width: 32px;
  height: 32px;
  box-shadow: 0 2px 4px 0px rgba(0, 0, 0, 0.3);
  outline: none;
  cursor: pointer;
}
.ol-zoom-current {
  position: absolute;
  width: 32px;
  height: 32px;
  z-index: 10;
  right: 4px;
  bottom: 72px;
  padding: 0;
  border: 0;
  border-radius: 4px !important;
  box-shadow: 0 2px 4px 0px rgba(0, 0, 0, 0.3);
  outline: none;
  cursor: pointer;
}
.tooltip {
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  color: white;
  padding: 0px 8px;
  white-space: nowrap;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3);
  font-size: 14px;
  color: #333333;
  min-width: 88px;
  min-height: 32px;
  line-height: 32px;
  text-align: center;
}
.tooltip-static {
  background-color: #ffffff;
  color: black;
  border: 1px solid white;
}
.loading {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.5);
  .warpper {
    // width: 40px;
    height: 40px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    .img {
      width: 40px;
      height: 40px;
      margin-left: 50%;
      margin-top: 50%;
      transform: translate(-50%, -50%);
      background: url("~@/static/loading.gif") center center no-repeat;
    }
    .text {
      color: #198ff9;
    }
  }
}
</style>