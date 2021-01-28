<template>
      
  <div class="vicon">
    <div>
      <slot name="coustom"> <van-icon name="bell" /></slot>
    </div>
  </div>
</template>
           
<script>
export default {
  name:'myicon',
  props: {},
};
</script>
<style scoped lang='less'>
.vicon {
  font-size: 0.28rem;
  width: 0.8rem;
  height: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1989fa;
  color: white;
  border-radius: 0.1rem;
}
</style>