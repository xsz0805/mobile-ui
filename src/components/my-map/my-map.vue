<template>
      <div class="myMap">
    <van-nav-bar title="地图" left-arrow @click-left="onClickLeft" />

        <van-search id='address' ref="searchIpt" @blur='blur' @focus='focus' :show-action='action' shape='round' @cancel='searchAbolish' left-icon='search' v-model="valueAddress" placeholder="请输入搜索内容"
      @search="onSearch()" @input="oninput ()">

      <template slot='left'>
        <div @click="citySelect(valueAddress)" class="chooseCity">
          {{city.name ? city.name : '武汉市'}}
          <img src='../../assets/map/arrow_down.png' alt="">
        </div>
      </template>
    </van-search>   

         <div id="container"></div>

    <div id="panel"></div>

    <button id="pantoBtn" class="mapbtn" @click='markerFocus'>
      <img src="../../assets/map/map_current.png" alt="">
    </button>
    <button id="navigation" class="mapbtn" @click='navigationBtn'>
      <img src="../../assets/map/map_navigation.png" alt="">
    </button>
    <button id="refurbish" class="mapbtn">
      <img src="../../assets/map/map_refresh.png" alt="">
    </button>
      
    <van-popup v-model="show" position="top" :style="{ height: '50%' }">  
      <van-area title="标题" :area-list="areaList" :columns-num="2" @confirm='addressComplate' @cancel='cancel' />
    </van-popup>
    <van-popup v-model="show1" position="top" :style="{ height: '25%' }" class="navigationSearch">
      <van-search id='address1' shape='round' @cancel='searchAbolish' v-model="startAddress" placeholder="请输入起始地" @input="oninput ()">
        <template slot='left'>
          <div class="chooseCity">
            <span>起始地</span>
            <!-- <img src='../../assets/map/arrow_down.png' alt=""> -->
          </div>
        </template>
      </van-search>  
      <van-search id='address2' shape='round' @cancel='searchAbolish' v-model="endAddress" placeholder="请输入目的地" @input="oninput ()">
        <template slot='left'>
          <div class="chooseCity">
            <span>目的地</span>
            <!-- <img src='../../assets/map/arrow_down.png' alt=""> -->
          </div>
        </template>
      </van-search>    
      <button class="sbtn" @click="sbtn">搜索</button>
    </van-popup>
    <myloading type=1 :loading='load2'></myloading>
  </div>
</template>
           
<script>
import { Toast } from "vant";
export default {
  name: "mymap",
  data() {
    return {
      load2: false,
      startAddress: "",
      endAddress: "",
      hMax: false,
      hZero: false,
      show1: false,
      flag: true,
      action: false,
      areaList: {
        province_list: {
          110000: "北京市",
          120000: "天津市",
          130000: "河北省",
          140000: "山西省",
          150000: "内蒙古自治区",
          210000: "辽宁省",
          220000: "吉林省",
          230000: "黑龙江省",
          310000: "上海市",
          320000: "江苏省",
          330000: "浙江省",
          340000: "安徽省",
          350000: "福建省",
          360000: "江西省",
          370000: "山东省",
          410000: "河南省",
          420000: "湖北省",
          430000: "湖南省",
          440000: "广东省",
          450000: "广西壮族自治区",
          460000: "海南省",
          500000: "重庆市",
          510000: "四川省",
          520000: "贵州省",
          530000: "云南省",
          540000: "西藏自治区",
          610000: "陕西省",
          620000: "甘肃省",
          630000: "青海省",
          640000: "宁夏回族自治区",
          650000: "新疆维吾尔自治区",
          710000: "台湾省",
          810000: "香港特别行政区",
          820000: "澳门特别行政区",
          900000: "海外",
        },
        city_list: {
          110100: "北京市",
          120100: "天津市",
          130100: "石家庄市",
          130200: "唐山市",
          130300: "秦皇岛市",
          130400: "邯郸市",
          130500: "邢台市",
          130600: "保定市",
          130700: "张家口市",
          130800: "承德市",
          130900: "沧州市",
          131000: "廊坊市",
          131100: "衡水市",
          140100: "太原市",
          140200: "大同市",
          140300: "阳泉市",
          140400: "长治市",
          140500: "晋城市",
          140600: "朔州市",
          140700: "晋中市",
          140800: "运城市",
          140900: "忻州市",
          141000: "临汾市",
          141100: "吕梁市",
          150100: "呼和浩特市",
          150200: "包头市",
          150300: "乌海市",
          150400: "赤峰市",
          150500: "通辽市",
          150600: "鄂尔多斯市",
          150700: "呼伦贝尔市",
          150800: "巴彦淖尔市",
          150900: "乌兰察布市",
          152200: "兴安盟",
          152500: "锡林郭勒盟",
          152900: "阿拉善盟",
          210100: "沈阳市",
          210200: "大连市",
          210300: "鞍山市",
          210400: "抚顺市",
          210500: "本溪市",
          210600: "丹东市",
          210700: "锦州市",
          210800: "营口市",
          210900: "阜新市",
          211000: "辽阳市",
          211100: "盘锦市",
          211200: "铁岭市",
          211300: "朝阳市",
          211400: "葫芦岛市",
          220100: "长春市",
          220200: "吉林市",
          220300: "四平市",
          220400: "辽源市",
          220500: "通化市",
          220600: "白山市",
          220700: "松原市",
          220800: "白城市",
          222400: "延边朝鲜族自治州",
          230100: "哈尔滨市",
          230200: "齐齐哈尔市",
          230300: "鸡西市",
          230400: "鹤岗市",
          230500: "双鸭山市",
          230600: "大庆市",
          230700: "伊春市",
          230800: "佳木斯市",
          230900: "七台河市",
          231000: "牡丹江市",
          231100: "黑河市",
          231200: "绥化市",
          232700: "大兴安岭地区",
          310100: "上海市",
          320100: "南京市",
          320200: "无锡市",
          320300: "徐州市",
          320400: "常州市",
          320500: "苏州市",
          320600: "南通市",
          320700: "连云港市",
          320800: "淮安市",
          320900: "盐城市",
          321000: "扬州市",
          321100: "镇江市",
          321200: "泰州市",
          321300: "宿迁市",
          330100: "杭州市",
          330200: "宁波市",
          330300: "温州市",
          330400: "嘉兴市",
          330500: "湖州市",
          330600: "绍兴市",
          330700: "金华市",
          330800: "衢州市",
          330900: "舟山市",
          331000: "台州市",
          331100: "丽水市",
          340100: "合肥市",
          340200: "芜湖市",
          340300: "蚌埠市",
          340400: "淮南市",
          340500: "马鞍山市",
          340600: "淮北市",
          340700: "铜陵市",
          340800: "安庆市",
          341000: "黄山市",
          341100: "滁州市",
          341200: "阜阳市",
          341300: "宿州市",
          341500: "六安市",
          341600: "亳州市",
          341700: "池州市",
          341800: "宣城市",
          350100: "福州市",
          350200: "厦门市",
          350300: "莆田市",
          350400: "三明市",
          350500: "泉州市",
          350600: "漳州市",
          350700: "南平市",
          350800: "龙岩市",
          350900: "宁德市",
          360100: "南昌市",
          360200: "景德镇市",
          360300: "萍乡市",
          360400: "九江市",
          360500: "新余市",
          360600: "鹰潭市",
          360700: "赣州市",
          360800: "吉安市",
          360900: "宜春市",
          361000: "抚州市",
          361100: "上饶市",
          370100: "济南市",
          370200: "青岛市",
          370300: "淄博市",
          370400: "枣庄市",
          370500: "东营市",
          370600: "烟台市",
          370700: "潍坊市",
          370800: "济宁市",
          370900: "泰安市",
          371000: "威海市",
          371100: "日照市",
          371300: "临沂市",
          371400: "德州市",
          371500: "聊城市",
          371600: "滨州市",
          371700: "菏泽市",
          410100: "郑州市",
          410200: "开封市",
          410300: "洛阳市",
          410400: "平顶山市",
          410500: "安阳市",
          410600: "鹤壁市",
          410700: "新乡市",
          410800: "焦作市",
          410900: "濮阳市",
          411000: "许昌市",
          411100: "漯河市",
          411200: "三门峡市",
          411300: "南阳市",
          411400: "商丘市",
          411500: "信阳市",
          411600: "周口市",
          411700: "驻马店市",
          419000: "省直辖县",
          420100: "武汉市",
          420200: "黄石市",
          420300: "十堰市",
          420500: "宜昌市",
          420600: "襄阳市",
          420700: "鄂州市",
          420800: "荆门市",
          420900: "孝感市",
          421000: "荆州市",
          421100: "黄冈市",
          421200: "咸宁市",
          421300: "随州市",
          422800: "恩施土家族苗族自治州",
          429000: "省直辖县",
          430100: "长沙市",
          430200: "株洲市",
          430300: "湘潭市",
          430400: "衡阳市",
          430500: "邵阳市",
          430600: "岳阳市",
          430700: "常德市",
          430800: "张家界市",
          430900: "益阳市",
          431000: "郴州市",
          431100: "永州市",
          431200: "怀化市",
          431300: "娄底市",
          433100: "湘西土家族苗族自治州",
          440100: "广州市",
          440200: "韶关市",
          440300: "深圳市",
          440400: "珠海市",
          440500: "汕头市",
          440600: "佛山市",
          440700: "江门市",
          440800: "湛江市",
          440900: "茂名市",
          441200: "肇庆市",
          441300: "惠州市",
          441400: "梅州市",
          441500: "汕尾市",
          441600: "河源市",
          441700: "阳江市",
          441800: "清远市",
          441900: "东莞市",
          442000: "中山市",
          445100: "潮州市",
          445200: "揭阳市",
          445300: "云浮市",
          450100: "南宁市",
          450200: "柳州市",
          450300: "桂林市",
          450400: "梧州市",
          450500: "北海市",
          450600: "防城港市",
          450700: "钦州市",
          450800: "贵港市",
          450900: "玉林市",
          451000: "百色市",
          451100: "贺州市",
          451200: "河池市",
          451300: "来宾市",
          451400: "崇左市",
          460100: "海口市",
          460200: "三亚市",
          460300: "三沙市",
          460400: "儋州市",
          469000: "省直辖县",
          500100: "重庆市",
          500200: "县",
          510100: "成都市",
          510300: "自贡市",
          510400: "攀枝花市",
          510500: "泸州市",
          510600: "德阳市",
          510700: "绵阳市",
          510800: "广元市",
          510900: "遂宁市",
          511000: "内江市",
          511100: "乐山市",
          511300: "南充市",
          511400: "眉山市",
          511500: "宜宾市",
          511600: "广安市",
          511700: "达州市",
          511800: "雅安市",
          511900: "巴中市",
          512000: "资阳市",
          513200: "阿坝藏族羌族自治州",
          513300: "甘孜藏族自治州",
          513400: "凉山彝族自治州",
          520100: "贵阳市",
          520200: "六盘水市",
          520300: "遵义市",
          520400: "安顺市",
          520500: "毕节市",
          520600: "铜仁市",
          522300: "黔西南布依族苗族自治州",
          522600: "黔东南苗族侗族自治州",
          522700: "黔南布依族苗族自治州",
          530100: "昆明市",
          530300: "曲靖市",
          530400: "玉溪市",
          530500: "保山市",
          530600: "昭通市",
          530700: "丽江市",
          530800: "普洱市",
          530900: "临沧市",
          532300: "楚雄彝族自治州",
          532500: "红河哈尼族彝族自治州",
          532600: "文山壮族苗族自治州",
          532800: "西双版纳傣族自治州",
          532900: "大理白族自治州",
          533100: "德宏傣族景颇族自治州",
          533300: "怒江傈僳族自治州",
          533400: "迪庆藏族自治州",
          540100: "拉萨市",
          540200: "日喀则市",
          540300: "昌都市",
          540400: "林芝市",
          540500: "山南市",
          540600: "那曲市",
          542500: "阿里地区",
          610100: "西安市",
          610200: "铜川市",
          610300: "宝鸡市",
          610400: "咸阳市",
          610500: "渭南市",
          610600: "延安市",
          610700: "汉中市",
          610800: "榆林市",
          610900: "安康市",
          611000: "商洛市",
          620100: "兰州市",
          620200: "嘉峪关市",
          620300: "金昌市",
          620400: "白银市",
          620500: "天水市",
          620600: "武威市",
          620700: "张掖市",
          620800: "平凉市",
          620900: "酒泉市",
          621000: "庆阳市",
          621100: "定西市",
          621200: "陇南市",
          622900: "临夏回族自治州",
          623000: "甘南藏族自治州",
          630100: "西宁市",
          630200: "海东市",
          632200: "海北藏族自治州",
          632300: "黄南藏族自治州",
          632500: "海南藏族自治州",
          632600: "果洛藏族自治州",
          632700: "玉树藏族自治州",
          632800: "海西蒙古族藏族自治州",
          640100: "银川市",
          640200: "石嘴山市",
          640300: "吴忠市",
          640400: "固原市",
          640500: "中卫市",
          650100: "乌鲁木齐市",
          650200: "克拉玛依市",
          650400: "吐鲁番市",
          650500: "哈密市",
          652300: "昌吉回族自治州",
          652700: "博尔塔拉蒙古自治州",
          652800: "巴音郭楞蒙古自治州",
          652900: "阿克苏地区",
          653000: "克孜勒苏柯尔克孜自治州",
          653100: "喀什地区",
          653200: "和田地区",
          654000: "伊犁哈萨克自治州",
          654200: "塔城地区",
          654300: "阿勒泰地区",
          659000: "自治区直辖县级行政区划",
          710100: "台北市",
          710200: "高雄市",
          710300: "台南市",
          710400: "台中市",
          710500: "金门县",
          710600: "南投县",
          710700: "基隆市",
          710800: "新竹市",
          710900: "嘉义市",
          711100: "新北市",
          711200: "宜兰县",
          711300: "新竹县",
          711400: "桃园县",
          711500: "苗栗县",
          711700: "彰化县",
          711900: "嘉义县",
          712100: "云林县",
          712400: "屏东县",
          712500: "台东县",
          712600: "花莲县",
          712700: "澎湖县",
          712800: "连江县",
          810100: "香港岛",
          810200: "九龙",
          810300: "新界",
          820100: "澳门半岛",
        },
      },
      show: false,
      valueAddress: "",
      map: null,
      position: {},
      lat: "",
      lng: "",
      marker: "",
      marker1: "",
      markerIcon1: require("../../assets/map/map_position.png"),
      markerIcon: require("../../assets/map/map_my_address.png"),
      startIcon: "",
      startIcon1: "",
      city: "",
      driving: "",
      infoWindow: "",
      lnglat: "",
      address: "",
      geocoder: "",
      placeSearch: "",
      auto: "",
      searchadd: "",
    };
  },
  // computed:{
  //   initCity () {
  //     return this.city.name
  //   }
  // },
  methods: {
    inputTips() {
      // var that = this;
      var auto = new AMap.Autocomplete({
        input: "address",
      });

      AMap.event.addListener(auto, "select", (e) => {
        console.log(e.poi.name);
        // this.searchadd = e.poi.name;
        this.valueAddress = e.poi.name;
      });
    },
    sbtn() {
      console.log(666);
      this.show1 = false;
      this.navigation(this.startAddress, this.endAddress);
    },
    infoDetail() {
      AMap.service(["AMap.PlaceSearch"], () => {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
          pageSize: 3, // 单页显示结果条数
          pageIndex: 1, // 页码
          // city: "010", // 兴趣点城市
          // citylimit: true, //是否强制限制在设置的城市内搜索
          map: this.map, // 展现结果的地图实例
          panel: "panel", // 结果列表将在此容器中进行展示。
          autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        //关键字查询
        placeSearch.search(this.valueAddress);
      });
    },
    // createInfoWindow(title, content) {
    //   var info = document.createElement("div");
    //   info.className = "custom-info input-card content-window-card";

    //   //可以通过下面的方式修改自定义窗体的宽高
    //   //info.style.width = "400px";
    //   // 定义顶部标题
    //   var top = document.createElement("div");
    //   var titleD = document.createElement("div");
    //   var closeX = document.createElement("img");
    //   top.className = "info-top";
    //   titleD.innerHTML = title;
    //   closeX.src = "https://webapi.amap.com/images/close2.gif";
    //   closeX.onclick = closeInfoWindow;

    //   top.appendChild(titleD);
    //   top.appendChild(closeX);
    //   info.appendChild(top);

    //   // 定义中部内容
    //   var middle = document.createElement("div");
    //   middle.className = "info-middle";
    //   middle.style.backgroundColor = "white";
    //   middle.innerHTML = content;
    //   info.appendChild(middle);

    //   // 定义底部内容
    //   var bottom = document.createElement("div");
    //   bottom.className = "info-bottom";
    //   bottom.style.position = "relative";
    //   bottom.style.top = "0px";
    //   bottom.style.margin = "0 auto";
    //   var sharp = document.createElement("img");
    //   sharp.src = "https://webapi.amap.com/images/sharp.png";
    //   bottom.appendChild(sharp);
    //   info.appendChild(bottom);
    //   return info;
    // },

    navigationBtn() {
      // this.navigation();

      this.show1 = true;
      setTimeout(() => {
        var auto1 = new AMap.Autocomplete({
          input: "address1",
        });
        var auto2 = new AMap.Autocomplete({
          input: "address2",
        });
        AMap.event.addListener(auto1, "select", (e) => {
          console.log(e.poi.name);
          // this.searchadd = e.poi.name;
          this.startAddress = e.poi.name;
        });

        AMap.event.addListener(auto2, "select", (e) => {
          console.log(e.poi.name);
          // this.searchadd = e.poi.name;
          this.endAddress = e.poi.name;
        });
      }, 100);
    },
    navigation(start, end) {
      var that = this;
      if (!start || !end) {
        return Toast.fail("地址不能空");
      }
      this.load2 = true;
      if (this.driving) {
        this.driving.clear();
      }
      this.driving = new AMap.Driving({
        map: this.map,
        // panel: "panel",
      });
      this.driving.search(
        [{ keyword: start }, { keyword: end }],
        function (status, result) {
          if (status === "complete") {
            that.load2 = false;
          } else {
          }
        }
      );
    },
    geoCode() {
      this.geocoder = new AMap.Geocoder({
        //默认：“全国”
        city: this.city.name ? this.city.name : "武汉市",
      });
      var that = this;
      this.marker1 = new AMap.Marker({
        icon: this.startIcon1,
      });
      this.infoWindow = new AMap.InfoWindow({
        // isCustom: true, //使用自定义窗体
        anchor: "bottom-center",

        offset: new AMap.Pixel(-2, -36),
      });
      AMap.event.addListener(this.marker1, "click", (e) => {
        document.querySelector("#panel").style.height = "5rem";
        this.hMax = true;

        this.asyncInfo();
        this.infoWindow.open(this.map, this.marker1.getPosition());
        document.querySelector("#panel").onclick = (e) => {
          console.log(e);
          if (
            e.pageX <= 348 &&
            e.pageX >= 338 &&
            e.pageY >= 457 &&
            e.pageY <= 467
          ) {
            document.querySelector("#panel").style.height = 0;

            this.placeSearch.clear();
          }
        };
      });

      this.geocoder.getLocation(this.valueAddress, function (status, result) {
        if (status === "complete" && result.geocodes.length) {
          var lnglat = result.geocodes[0].location;

          that.lnglat = lnglat;

          that.marker1.setPosition(lnglat);
          that.map.add(that.marker1);
          that.map.setFitView(that.marker1);
        } else {
          if (!that.valueAddress) return;
          Toast.fail("请重新设置城市");
        }
      });
      // console.log(111);

      // this.geocoder.getAddress(this.lnglat, (status, result) => {
      //   if (status === "complete" && result.regeocode) {
      //     console.log(result.regeocode.formattedAddress);
      //     this.address = result.regeocode.formattedAddress;
      //     // document.getElementById("address").value = address;
      //     this.infoWindow.setContent(result.regeocode.formattedAddress);
      //   } else {
      //     // log.error("根据经纬度查询地址失败");
      //   }
      // });
    },
    asyncContent() {
      return new Promise((resolve) => {
        this.geocoder.getAddress(this.lnglat, (status, result) => {
          // console.log(result.regeocode.formattedAddress);
          resolve((this.address = result.regeocode.formattedAddress));

          // document.getElementById("address").value = address;
          //this.infoWindow.setContent(this.address)
        });
      });
    },
    async asyncInfo() {
      const abc = await this.asyncContent();
      // console.log(abc);
      // console.log(this.address);
      // this.infoWindow.setSize(new AMap.Size(55,30))
      this.infoWindow.setContent(
        `<div style='font-size:0.36rem'>${this.valueAddress}</div>`
      );
      AMap.service(["AMap.PlaceSearch"], () => {
        //构造地点查询类
        this.placeSearch = new AMap.PlaceSearch({
          pageSize: 5, // 单页显示结果条数
          // pageIndex: 2, // 页码
          // city: "010", // 兴趣点城市
          // citylimit: true, //是否强制限制在设置的城市内搜索
          map: this.map, // 展现结果的地图实例
          panel: "panel", // 结果列表将在此容器中进行展示。
          // autoFitView: true, // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        //关键字查询
        this.placeSearch.search(this.valueAddress);
      });
    },
    blur() {
      this.action = false;
      // this.flag = true;
      this.map.remove(this.marker1);
      this.map.remove(this.infoWindow);
      document.querySelector("#panel").style.height = 0;
      if (this.placeSearch) {
        this.placeSearch.clear();
      }
      if (!this.valueAddress) return;
      this.load2 = true;
      setTimeout(() => {
        this.load2 = false;
        this.geoCode();
      }, 1000);
    },
    focus() {
      this.action = true;
    },
    oninput() {},
    onSearch() {},
    searchAbolish() {
      this.action = false;
    },
    cancel() {
      this.show = false;
    },
    addressComplate(city) {
      console.log(city);
      this.show = false;
      this.city = city[1];
    },
    citySelect() {
      console.log(666);
      this.show = true;
    },
    onClickLeft() {
      this.$router.back();
    },
    createIcon() {
      this.startIcon = new AMap.Icon({
        // 图标尺寸
        // size: new AMap.Size(25, 34),
        // 图标的取图地址
        image: this.markerIcon,
        // 图标所用图片大小
        // imageSize: new AMap.Size(135, 40),
        // 图标取图偏移量
        // imageOffset: new AMap.Pixel(-9, -3),
      });
    },
    createIcon1() {
      this.startIcon1 = new AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(15, 25),
        // 图标的取图地址
        image: this.markerIcon1,
        // 图标所用图片大小
        // imageSize: new AMap.Size(135, 40),
        // 图标取图偏移量
        // imageOffset: new AMap.Pixel(-9, -3),
      });
    },
    markerFocus() {
      this.map.setFitView(this.marker);
    },
    initMap(a = 114.06038, b = 30.62933, c = 11) {
      this.map = new AMap.Map("container", {
        resizeEnable: true, //是否监控地图容器尺寸变化
        zoom: c, //初始化地图层级
        // center: [a, b], //初始化地图中心点
      });
      this.map.on("click", function (e) {
        // console.log(e);
        // document.getElementById("lnglat").value = e.lnglat.getLng() + ',' + e.lnglat.getLat()
      });
      AMap.plugin(["AMap.ToolBar"], () => {
        // 在图面添加工具条控件, 工具条控件只有缩放功能
        this.map.addControl(new AMap.ToolBar());
      });
    },
    getLocation() {
      this.load2 = true;
      let _this = this;
      AMap.plugin("AMap.Geolocation", function () {
        var geolocation = new AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          // timeout: 5000,
        });
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, "complete", onComplete);
        AMap.event.addListener(geolocation, "error", onError);
        // data是具体的定位信息
        function onComplete(data) {
          _this.load2 = false;
          console.log("具体的定位信息", data);
          _this.position = data.position;
          _this.lat = _this.position.lat;
          _this.lng = _this.position.lng;
          console.log(_this.lat, _this.lng);
          _this.marker = new AMap.Marker({
            icon: _this.startIcon,
            autoRotation: true,
            position: [_this.lng, _this.lat],
          });
          _this.map.add(_this.marker);
          _this.map.panTo([_this.lng, _this.lat]);
          //   _this.map.setFitView();

          //   _this.initMap(this.lng, this.lat, 16);
        }
        function onError(data) {
          // 失败 启用 ip定位
          AMap.plugin("AMap.CitySearch", function () {
            var citySearch = new AMap.CitySearch();
            citySearch.getLocalCity(function (status, result) {
              if (status === "complete" && result.info === "OK") {
                // 查询成功，result即为当前所在城市信息
                console.log("通过ip获取当前城市：", result);
              }
            });
          });
        }
      });
    },
  },
  created() {},
  mounted() {
    this.initMap();
    this.createIcon();
    this.createIcon1();
    this.getLocation();
    this.inputTips();
  },
};
</script>
<style scoped lang='less'>
/deep/ [data-v-42386d2f] .amap-logo {
  display: none;
  opacity: 0;
}
// .amap-copyright {
//     opacity:0;
// }
.sbtn {
  margin: 0.3rem;
  width: 8rem;
  height: 0.72rem;
  font-size: 0.5rem;
  background-color: #d4d4db;
  border: none;
  border-radius: 15px;
}
.navigationSearch {
  padding: 0.5rem 0;
  text-align: center;
}

.chooseCity {
  font-size: 0.26rem;
  margin-right: 0.16rem;
  img {
    margin-left: 0.16rem;
    width: 0.16rem;
    height: 0.1rem;
  }
}
.heightZero {
  height: 0;
}
.heightMax {
  height: 6rem;
}
.myMap {
  position: relative;
  .mapbtn {
    border: none;
    background: none;

    position: absolute;
    right: 0;

    img {
      height: 1.12rem;
      width: 0.72rem;
    }
  }
  #pantoBtn {
    bottom: 3.44rem;
  }
  #navigation {
    bottom: 1.95rem;
  }
  #refurbish {
    bottom: 0.4rem;
  }
  /deep/.amap-icon {
    width: 0.6rem;
    height: 0.6rem;
    img {
      width: 100%;
    }
  }
}
/deep/.amap_lib_placeSearch_page {
  display: none;
}
#container {
  width: 100%;
  height: 13.9rem;
}

/deep/.amap-zoomcontrol {
  left: -260px;
  z-index: 1;
}
/deep/.poi-img {
  display: none;
}
#panel {
  box-sizing: border-box;
  transition: all 0.5s;
  border: none;
  border-radius: 10px;
  background-color: #fff;
  overflow-y: auto;
  position: absolute;
  bottom: 0;
  height: 0;
  width: 101%;
  // max-height: 5rem;
  z-index: 998;
  // padding: 0.5rem 0;
  // pointer-events: none;
  /deep/.amap_lib_placeSearch {
    border: none;
  }
  &::before {
    content: "×";
    // pointer-events: auto;
    font-size: 0.5rem;
    text-align: center;
    line-height: 0.5rem;
    position: absolute;
    z-index: 999;
    top: 0;
    right: 5px;
    width: 0.5rem;
    height: 0.5rem;
    background-color: white;
    border-radius: 50%;
  }
}
// .showinfo {
//   display: none;
// }
// .van-search__content,
// .van-search__,
// .content--square {
//   border-radius: 0.38rem;
// }
// .van-search__action {
//   text-align: center;
//   font-size: 0.33rem;
//   width: 1.28rem;
//   // height: 0.72rem;
//   // line-height: 0.72rem;
//   background-color: #1989fa;
//   border-radius: 0.5rem;
//   margin-left: 0.16rem;
//   color: white;
// }
// /deep/.amap-lib-marker-from {
//   width: 0.44rem;
//   height: 0.5rem;

//     background-image: url('../../assets/map/map_starting_point.png');
// }
</style>