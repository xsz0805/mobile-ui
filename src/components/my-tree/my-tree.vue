<template>
  <div class="mytree">
    <!-- 导航栏 -->
    <van-nav-bar title="树形" :right-text="edit ?  '完成' : '编辑'" left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
    <!-- 树形组件 -->
    <itemtree class="item" :item="treeData" @make-folder="makeFolder" @add-item="addItem" @del-item='delitem' @edit-item='edititem' :edit='edit' :show='show'></itemtree>
    <!-- 弹出确认框 -->
    <van-dialog v-model="show" title="新增目录" show-cancel-button @confirm='confirm' :beforeClose='addBeforeClose'>
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
    <van-dialog v-model="editShow" title="修改目录" show-cancel-button @confirm='eidtConfirm' :beforeClose='editBeforeClose'>
      <van-radio-group v-model="radio" direction="horizontal">
        <div class="my-form">
          <input type="text" class="ipt eidtIpt" ref='getFocus' v-model="editIptValue" @input='input'>
        </div>
      </van-radio-group>
    </van-dialog>   
  </div>
</template>
           
<script>
import { Toast, Dialog } from "vant";
export default {
  name: "mytree",
  data() {
    return {
      eidtItem: {},
      editIptValue: "",
      editShow: false,
      edit: false,
      show: false,
      i: 0,
      newarr: [],
      treeData: this.dataTree,
      objList: [],
      arrList: [],
      radio: "1",
      activeIcon: require("../../assets/tree/selected_radio.png"),
      inactiveIcon: require("../../assets/tree/select_radio.png"),
      value: "",
      iptValue: "sh",
    };
  },
  props: {
    dataTree: {
      type: [Object, Array],
      default() {
        return {
          name: "一级",
          id: 1,
          time: +new Date(),
          children: [
            { name: "书", id: 2, time: +new Date() },
            { name: "本", id: 2, time: +new Date() },
            {
              name: "二级",
              id: 2,
              time: +new Date(),
              children: [
                {
                  name: "三级",
                  id: 3,
                  time: +new Date(),
                  children: [
                    { name: "书3", id: 4, time: +new Date() },
                    { name: "本3", id: 4, time: +new Date() },
                  ],
                },
                { name: "书3", id: 3, time: +new Date() },
                { name: "本3", id: 3, time: +new Date() },
                {
                  name: "三级",
                  id: 3,
                  time: +new Date(),
                  children: [
                    { name: "书63", id: 4, time: +new Date() },
                    { name: "本63", id: 4, time: +new Date() },
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
    addBeforeClose(action, done) {
      if (action === "confirm") {
        console.log(this.iptValue);
        if (!this.iptValue) {
          Toast.fail("名字不能为空");
          done(false);
        } else {
          this.iptValue = "";
          done();
        }
      } else {
        this.iptValue = "";
        done();
      }
    },
    editBeforeClose(action, done) {
      if (action === "confirm") {
        if (!this.editIptValue) {
          Toast.fail("名字不能为空");
          done(false);
        } else {
          done();
        }
      } else {
        done();
      }
    },
    delBeforeClose(action, done) {
      if (action === "confirm") {
        done();
      } else {
        done();
      }
    },
    //输入事件  触发父组件
    input() {
      this.$emit("iptTree", this.iptValue);
    },
    //修改目录确定
    eidtConfirm() {
      if (!this.editIptValue) return;
      console.log("修改成功");
      this.eidtItem.name = this.editIptValue;
      this.$emit("editItem", this.treeData);
    },
    //选择添加目录类型
    confirm() {
      if (this.radio == "1") {
        if (!this.iptValue) return;
        this.arrList.children.push({
          name: this.iptValue,
          id: this.arrList.id + 1,
          time: +new Date(),
        });
        // this.iptValue = "";
      }
      if (this.radio == "2") {
        if (!this.iptValue) return;
        if (this.objList.children) {
          this.objList.children.push({
            name: this.iptValue,
            id: this.objList.id + 1,
            time: +new Date(),
          });
        } else {
          this.$set(this.objList, "children", []);

          this.objList.children.push({
            name: this.iptValue,
            id: this.objList.id + 1,
            time: +new Date(),
          });
        }
        // this.iptValue = "";
      }
      // console.log(this.treeData,this.dataTree);
      this.$emit("success", this.treeData);
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

    onClickLeft() {},
    //显示编辑按钮
    onClickRight() {
      this.$emit("rightEdit", this.edit);
      this.edit = !this.edit;
    },

    makeFolder: function (item) {
      console.log(item, 888);
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
        if (
          element.name == itm.name &&
          element.id == itm.id &&
          element.time == itm.time
        ) {
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
      console.log(item.time);
      Dialog.confirm({
        title: "确定删除该目录吗?",
        message: "删除后若有子菜单也会删除",
        beforeClose: this.delBeforeClose,
      })
        .then(() => {
          this.delElement(this.treeData.children, item);
          this.newarr.splice(this.i, 1);
          this.$emit("delTree", this.treeData);
        })
        .catch(() => {
          // on cancel
        });
    },
    addItem: function (item) {
      this.arrList = item;
      console.log(item, 999);
    },
    edititem(item) {
      setTimeout(() => {
        this.$refs.getFocus.focus();
      }, 0);

      // item.name = this.editIptValue
      this.editShow = true;
      this.eidtItem = item;
      this.editIptValue = item.name;
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

.my-form {
  margin: 1rem auto;
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

  .eidtIpt {
    height: 2rem;
  }
}
</style>