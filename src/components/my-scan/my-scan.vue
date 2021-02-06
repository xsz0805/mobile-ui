<template>
   <div>
     <div v-if='type=="ipt"' class="myscan_main">
      <input class="myscan" type="text" placeholder="请输入" v-model="sonval" @input="soninput">
      <button class="scan_search" @click="myScanClick"></button>    
    </div>  
    <div  v-if='type=="btn"' class="myScanMain_search">
      <button class="scanBtn" @click="myScanClick"></button>
    </div> 
  </div>
</template>
           
<script>
export default {
  name: "myscan",
  props:{
      
      type:{
          type:String,
          default:'ipt'
      }
  },
  data() {
    return {
     
      sonval:'',
    };
  },
  methods: {
    soninput () {
        this.$emit('input',this.sonval)
    },
    myScanClick() {
    //   console.log(666);
    this.$emit('scanClick')
      this.$router.push("/scanPage");
    },
  },
};
</script>
<style scoped lang='less'>
.myscan_main {
  position: relative;
  width: 6.7rem;
  height: 0.8rem;
  margin: 0.5rem 0;
}
.myscan {
  position: absolute;
  box-sizing: border-box;
  background-color: #f5f5f5;
  border: none;
  outline: none;
  border-radius: 0.1rem;
  width: 100%;
  height: 100%;
  color: #b3b3b3;
  padding: 0 0.3rem;
  font-size: 0.3rem;
}
.scan_search {
  position: absolute;
  right: 0.3rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  background-image: url("../../assets/scan/icon_scan.png");
  width: 0.36rem;
  height: 0.36rem;
  background-size: 100%;
  border: none;
}
.myScanMain_search {
  margin: 0.3rem;
  width: 1rem;
  height: 1rem;
  background-image: url("../../assets/scan/scan_button.png");
  background-size: 100%;
  overflow: hidden;

  .scanBtn {
    width: 100%;
    height: 100%;
    background: none;
    border-radius: 50%;
    border: none;
  }
}
</style>