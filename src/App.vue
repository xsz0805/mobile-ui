<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style  lang="less">
body,html {
  padding: 10px;
  // width: 100%;
  // height: 100%;
  
}
#app {
  height: 100%;
  width: 100%;
}
/deep/.amap-sug-result {
  z-index: 9999;
}
</style>
