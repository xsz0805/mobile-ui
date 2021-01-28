<template>
      

  <van-button round type="info" class="mybtn"><slot></slot></van-button>
</template>
           
<script>
export default {
  props: {
    count: {
      default: 666,
    },
  },
};
</script>
<style scoped lang='less'>
* {
  margin: 0;
  padding: 0;
}
.mybadge {
  margin: 0.8rem 0.6rem;

  .mybtn {
    min-width: 1.8rem;
    height: 1rem;
    font-size: 0.47rem;
    border-radius: 1rem;
  }
}
</style>