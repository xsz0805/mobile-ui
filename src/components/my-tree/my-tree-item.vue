<template>
    

  <li class="tree-item">
    <van-swipe-cell>
      <div :class="[{bold: isFolder},'list-item']">
        <div class="add-del" v-show="edit">
          <img @click='editclick' class="editimg" src="../../assets/tree/tree_edit.png" alt="">
          <span @click="addclick" class="add">+</span>
          <span @click='delclick' class="del">-</span>
        </div>
        <span v-if="isFolder" @click="toggle">
          <img v-if="!isOpen" src="../../assets/tree/tree_structure_right.png" class="structure" alt="">
          <img v-else src="../../assets/tree/tree_structure_down.png" class="structure" alt="">
          <img class="structure" src='../../assets/tree/file.png' alt="">
        </span>
        {{ item.name }}
      </div>
      <template #right>
        <van-button square text="编辑" @click="editBtnClick" color='#198ff9' class="delete-button btn" style="height:100%;" />
        <van-button square text="添加" @click="addBtnClick" color='#ff8800' class="delete-button btn" style="height:100%;" />
        <van-button square text="删除" @click="delBtnClick" color='#ff4545' class="delete-button btn" style="height:100%;" />
      </template>
    </van-swipe-cell>
    <ul v-if="isFolder" :class="['myul',{ani:!isOpen}]">

      <itemtree class="item" v-for="(child, index) in item.children" :key="index" :item="child" @make-folder="$emit('make-folder', $event)" @edit-item="$emit('edit-item',$event)" @del-item="$emit('del-item',$event)"
        @add-item="$emit('add-item', $event)" :edit='edit' :show='show' @addclick1="addclick1"></itemtree>
    </ul>

  </li>  
</template> 
           
<script>
export default {
  name: "itemtree",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
    },
    edit: {
      type: Boolean,
    },
  },

  data: function () {
    return {
      open: false,
      isOpen: false,
    };
  },
  computed: {
    isFolder: function () {
      return this.item.children && this.item.children.length;
    },
  },
  methods: {
    delBtnClick() {
      this.delclick();
    },
    addBtnClick() {
      this.addclick();
    },
    editBtnClick() {
      this.editclick();
    },
    editclick() {
      this.$emit("edit-item", this.item);
    },
    delclick(e) {
      this.$emit("del-item", this.item);
    },
    addclick() {
      this.$emit("make-folder", this.item);
      this.$emit("addclick1");
      this.isOpen = true;
    },
    addclick1() {
      this.$emit("add-item", this.item);
    },
    toggle: function () {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
        this.open = !this.open;
      }
    },
  },
};
</script>
<style scoped lang='less'>
/deep/.van-button__content {
  display: unset;
}
/deep/.van-swipe-cell__right {
  right: -1px;
}
.van-button__text {
  color: #ffffff;
}
span {
  color: #cfcfcf;
}
.editimg {
  width: 0.7rem;
  height: 0.7rem;
  vertical-align: middle;
  margin-right: 0.3rem;
}
.myul {
  max-height: 1000px;
  transition: all 0.4s;
  overflow: hidden;
}
.ani {
  max-height: 0;
}
.structure {
  width: 0.6rem;
  height: 0.6rem;
  vertical-align: middle;
}
body {
  font-family: Menlo, Consolas, monospace;
  color: #444;
  line-height: 1.3rem;
}
.item {
  // cursor: pointer;
  border-bottom: solid 1px #f4f4f4;
  list-style: none;
}
.bold {
  border-bottom: solid 1px #f4f4f4;
  font-size: 0.4rem;
}
ul {
  box-sizing: border-box;
  padding-left: 1rem;
  line-height: 1.3rem;
  list-style-type: dot;
  font-size: 0.4rem;
}
.heightZero {
  height: 0;
  transition: height 0.3s;
}
.list-item {
  position: relative;
  font-size: 0.4rem;
  line-height: 1.3rem;

  .add-del {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 0.4rem;
    .add {
      margin-right: 0.5rem;
    }
  }
}
</style>