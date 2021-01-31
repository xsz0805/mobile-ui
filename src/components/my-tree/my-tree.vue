<template>
      <div class="mytree">
    <van-nav-bar title="树形" :right-text="edit ? '完成' : '编辑'" left-arrow @click-right="onClickRight" />
        <itemtree class="item" :item="treeData" @make-folder="makeFolder" @add-item="addItem" @del-item='delitem' :edit='edit' :show='show'></itemtree>

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

          <input type="text" class="ipt" v-model="iptValue">

        </div>
      </van-radio-group>
    </van-dialog>
        
  </div>
</template>
           
<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      iptValue: "123",
      objList: [],
      radio: "1",
      activeIcon: require("../../assets/tree/selected_radio.png"),
      inactiveIcon: require("../../assets/tree/select_radio.png"),
      value: "",
      show: false,
      edit: true,
      treeData: {
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
      },
    };
  },
  methods: {
    confirm() {
      if (this.radio == "1") {
        this.arrList.children.push({
          name: this.iptValue,
        });
      }
      if (this.radio == "2") {
        // console.log(this.objList,3333);
        this.$set(this.objList, "children", []);
        // this.addItem(this.objList);
        this.objList.children.push({
          name: this.iptValue,
        });
      }
      console.log(this.treeData,888);

      // if (this.radio == "1") {

      // } else {

      // }
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

    onClickRight() {
      this.edit = !this.edit;
    },
    makeFolder: function (item) {
      this.show = !this.show;
      console.log(item, 222);
      this.objList = item;
      // this.$set(item, "children", []);
      // this.addItem(item);
    },
    // additem1(item) {
    //   item.children.push({
    //     name: this.iptValue,
    //   });
    // },

    delitem(item) {
      console.log(item);
      Dialog.confirm({
        title: "确定删除该目录吗?",
        message: "删除后若有子菜单也会删除",
      })
        .then(() => {
          console.log("删除");
        })
        .catch(() => {
          // on cancel
        });
    },
    addItem: function (item) {
      // this.show = !this.show;
      // console.log(this.show);
      console.log(item, 333);
      // console.log(item.target.parentNode.parentNode.parentNode.parentNode, 111);
      // var father = item.target.parentNode.parentNode.parentNode.parentNode

      this.arrList = item;
      // item.children.push({
      //   name: this.iptValue,
      // });
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