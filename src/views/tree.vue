<template>
      <div>
          
    <!-- 树形展示组件 -->
    <mytree :dataTree='dataTree' @rightEdit='rightEdit' @iptTree='iptTree' @editItem='editItem' @success='success' @delTree='delTree'></mytree>
    <!-- 树形展示组件 -->
        
  </div>
</template>
           
<script>
export default {
  data() {
    return {
      dataTree: {
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
                  { name: "书3", id: 4, time: +new Date() },
                  { name: "本3", id: 4, time: +new Date() },
                ],
              },
            ],
          },
        ],
      },
    };
  },
  methods: {
    iptTree(val) {
      console.log(val);
    },
    rightEdit(val) {
      console.log(val);
    },
    delTree(result) {
      // console.log(result);
    },
    success() {},
    editItem(data) {
      console.log(data, 666);
    },
  },
};
</script>
<style scoped>
</style>