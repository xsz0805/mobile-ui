<template>
    

  <li class="tree-item">

    <div :class="[{bold: isFolder},'list-item']">
      <div class="add-del" v-show="edit">
        <span @click="addclick" class="add">+</span>

        <span @click='delclick' class="del">-</span>
      </div>
      <span v-if="isFolder" @click="toggle">
        <!-- [{{ isOpen ? '-' : '+' }}] -->
        <img v-if="!isOpen" src="../../assets/tree/tree_structure_right.png" class="structure" alt="">
        <img v-else src="../../assets/tree/tree_structure_down.png" class="structure" alt="">
        </span>
      {{ item.name }}
    </div>
    <ul v-show="isOpen" v-if="isFolder">
      <itemtree class="item" v-for="(child, index) in item.children" :key="index" :item="child" @make-folder="$emit('make-folder', $event)" @del-item="$emit('del-item',$event)"  @add-item="$emit('add-item', $event)" :edit='edit' :show='show' @addclick1="addclick1"   ></itemtree>
      <!-- <li class="add" @click="$emit('add-item', item)">+</li> -->
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
      isOpen: false,
    };
  },
  computed: {
    isFolder: function () {
      return this.item.children && this.item.children.length;
    },
  },
  methods: {
    delclick(e) {
       this.$emit("del-item",this.item);
    },
    addclick() {
      // if (!this.isFolder) {
        // console.log(this.item,111222);
        this.$emit("make-folder", this.item);
        this.$emit("addclick1");
        this.isOpen = true;
      // }
      // Dialog.confirm({
      //   title: "新增目录",
      //   message: "弹窗内容",
      // })
      //   .then(() => {
      //     // on confirm
      //   })
      //   .catch(() => {
      //     // on cancel
      //   });
    },
    // delclick1 () {
    //    this.$emit('del-item', this.item)
    // },
    addclick1 () {
      this.$emit('add-item', this.item)
    },
    toggle: function () {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
      }
    },
    // makeFolder: function () {
    //   // if (!this.isFolder) {
    //   //   this.$emit("make-folder", this.item);
    //   //   this.isOpen = true;
    //   // }
    // },
  },
};
</script>
<style scoped lang='less'>
.structure {
  width: 1rem;
  height: 1rem;
  vertical-align: middle;
}
body {
  font-family: Menlo, Consolas, monospace;
  color: #444;
}
.item {
  cursor: pointer;
  border-bottom: solid 1px #f4f4f4;
  list-style: none;
}
.bold {
  // font-weight: bold;
  border-bottom: solid 1px #f4f4f4;
  font-size: 0.5rem;
}
ul {
  box-sizing: border-box;
  padding-left: 1rem;
  line-height: 1.5rem;
  list-style-type: dot;
  font-size: 0.5rem;
  
}
.heightZero {
  height: 0;
  transition: all 0.3s;
}
.list-item {
  position: relative;

  .add-del {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 0.5rem;

    .add {
      margin-right: 0.5rem;
    }
  }
}
</style>