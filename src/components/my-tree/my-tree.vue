<template>
  <div class="mytree">
    <!-- 导航栏 -->
    <van-nav-bar title="树形" :right-text="edit ?  '完成' : '编辑'" left-text="返回" left-arrow  @click-left="onClickLeft" @click-right="onClickRight" />
    <!-- 树形组件 -->
    <itemtree class="item" :item="treeData" @make-folder="makeFolder" @add-item="addItem" @del-item='delitem' :edit='edit' :show='show'></itemtree>
    <!-- 弹出确认框 -->
    <van-dialog v-model="show" title="新增目录" show-cancel-button @confirm='confirm'>
      <van-radio-group v-model="radio" direction="horizontal">
        <div class="my-form">

          <van-radio-group v-model="radio" @change='change'>
            <van-radio name="1">
              同级菜单
              <template #icon="props">
                <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
              </template>
            </van-radio>
            <van-radio name="2">
              子菜单
              <template #icon="props">
                <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
              </template>
            </van-radio>
          </van-radio-group>

          <input type="text" class="ipt" v-model="iptValue" @input='input'>

        </div>
      </van-radio-group>
    </van-dialog>     
  </div>
</template>
           
<script>
import { Dialog } from "vant";
export default {
  name: "mytree",
  data() {
    return {
     edit:false,
     show:false,
      i: 0,
      newarr: [],
      treeData:this.dataTree,
      objList: [],
      radio: "1",
      activeIcon: require("../../assets/tree/selected_radio.png"),
      inactiveIcon: require("../../assets/tree/select_radio.png"),
      value: "",
      iptValue:'sh'
    };
  },
  props: {
    
    dataTree: {
      type: [Object, Array],
      default() {
        return {
          name: "一级",
          children: [
            { name: "书", id: 2 },
            { name: "本", id: 2 },
            {
              name: "二级",
              children: [
                {
                  name: "三级",
                  children: [
                    { name: "书3", id: 3 },
                    { name: "本3", id: 3 },
                  ],
                },
                { name: "书2", id: 2 },
                { name: "本2", id: 2 },
                {
                  name: "三级",
                  children: [
                    { name: "书3", id: 3 },
                    { name: "本3", id: 3 },
                  ],
                },
              ],
            },
          ],
        };
      },
    },
  },
  methods: {
    //输入事件  触发父组件
    input () {
        this.$emit('iptTree',this.iptValue)
    },
    //选择添加目录类型
    confirm() {
      if (this.radio == "1") {
        this.arrList.children.push({
          name: this.iptValue,
        });
        this.iptValue = "";
      }
      if (this.radio == "2") {
        if (this.objList.children) {
          this.objList.children.push({
            name: this.iptValue,
          });
        } else {
          this.$set(this.objList, "children", []);

          this.objList.children.push({
            name: this.iptValue,
          });
        }
        this.iptValue = "";
      }
      // console.log(this.treeData,this.dataTree);
      this.$emit('success',this.treeData)
    },
    change(name) {
      if (name == "1") {
        console.log("同级");
        // console.log(this.radio);
      }
      if (name == "2") {
        console.log("子菜单");
        // console.log(this.radio);
      }
    },

    onClickLeft () {
      

    },
    //显示编辑按钮
    onClickRight() {
      this.$emit('rightEdit',this.edit)
      this.edit = !this.edit;
      
    },

    makeFolder: function (item) {
      this.show = !this.show;
      this.objList = item;
    },
    // additem1(item) {
    //   item.children.push({
    //     name: this.iptValue,
    //   });
    // },

    //删除指定目录 递归函数
    delElement(arr, itm) {
      arr.forEach((element, index) => {
        if (element.name == itm.name) {
          this.i = index;
          this.newarr = arr;
          return;
        } else {
          if (element.children) {
            this.delElement(element.children, itm);
          }
        }
      });
    },
    //删除指定目录
    delitem(item) {
      Dialog.confirm({
        title: "确定删除该目录吗?",
        message: "删除后若有子菜单也会删除",
      })
        .then(() => {
          this.delElement(this.treeData.children, item);
          this.newarr.splice(this.i, 1);
          this.$emit('delTree',this.treeData)
        })
        .catch(() => {
          // on cancel
        });
    },
    addItem: function (item) {
      this.arrList = item;
    },
  },
};
</script>
<style scoped lang='less'>
.img-icon {
  height: 0.5rem;
  width: 0.5rem;
}
.van-radio-group {
  display: flex;
  justify-content: left;

  .van-radio {
    margin-right: 1rem;
  }
}
.van-nav-bar,
.van-hairline--bottom {
  margin-bottom: 1rem;
}

.my-form {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .ipt {
    width: 7rem;
    margin: 0.8rem 0;
    height: 1rem;
    border: 1px solid #f4f4f4;
    border-radius: 0.2rem;
  }
}
</style>