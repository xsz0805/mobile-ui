<template>
      
  <div>
        <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索内容"
      @search="onSearch(value)"
      @input="oninput (value)"
    >
      <template #action>
        <div @click="onSearch(value)">搜索</div>
      </template> </van-search
    >    
    <!-- 有热搜样式 -->
    <div v-if="hotStyle">
      <van-cell title="搜索历史">
        <template #right-icon>
          <van-icon name="delete-o" @click="delAll" />
        </template>
      </van-cell>
      <div class="history-list">
        <van-tag
          v-for="(item, index) in history"
          :key="index"
          color="#f5f5f5"
          text-color="#222222"
          round
          size="large"
          >{{ item }}</van-tag
        >
      </div>
      <van-cell title="热门搜索">
        <template #right-icon>
          <van-icon name="replay" v-if="flag" @click="refresh" />
          <van-loading size="15" v-else />
        </template>
      </van-cell>
      <div class="hot-list">
        <van-tag
          v-for="(item, index) in hot"
          :key="index"
          color="#f5f5f5"
          text-color="#222222"
          round
          size="large"
          >{{ item }}</van-tag
        >
      </div>
    </div>

    <!-- 默认样式 -->
    <div v-else>
      <van-cell title="搜索历史">
        <template #right-icon>
          <van-icon name="delete-o" @click="delAll" />
        </template>
      </van-cell>

      <van-cell
        :title="item"
        icon="clock-o"
        v-for="(item, index) in history"
        :key="index"
      >
      </van-cell>
    </div>
  </div>
</template>
           
<script>
export default {
  name:'mysearch',
  props: {
    hotStyle: {
      type: [String, Boolean],
      default: "",
    },
    history:{
      type:Array,
      default() {
        return []
      }
    }
    
  },
  data() {
    return {
      flag: true,
      value: "",
      
      hot: [],
    };
  },
  methods: {
      oninput (val) {
        //   console.log(val);
          this.value = val
             this.$emit('input',this.value)
      },
    //刷新热搜
    refresh() {
      this.flag = false;
      setTimeout(() => {
        this.flag = true;
      }, 3000);
    },
    //清空搜索历史
    delAll() {
      localStorage.removeItem("history");
      this.history = []
      
    },
    //点击搜索 本地储存搜索历史
    onSearch(val) {
      this.value = "";
      this.$emit('onsearch',val)

      // let index = this.history.findIndex((item) => {
      //   return item == val;
      // });
      // if (index != -1) {
       // }    
      // if (val) {
      //   this.history.unshift(val);
      //   localStorage.setItem("history", JSON.stringify(this.history));
      // }
    },
  },
};
</script>
<style scoped lang='less'>
.history-list {
  margin-bottom: 0.5rem;
}
.van-tag,
.van-tag--round,
.van-tag--large,
.van-tag--default {
  margin: 0 0.1rem;
}
.van-search__content,
.van-search__,
.content--square {
  border-radius: 0.38rem;
}
.van-search__action {
  text-align: center;
  font-size: 0.33rem;
  width: 1.28rem;
  // height: 0.72rem;
  // line-height: 0.72rem;
  background-color: #1989fa;
  border-radius: 0.5rem;
  margin-left: 0.16rem;
  color: white;
}
.custom-title {
  margin-right: 4px;
  vertical-align: middle;
}

.search-icon {
  font-size: 16px;
  line-height: inherit;
}
.van-icon,
.van-icon-delete-o {
  display: flex;
  align-items: center;
}
.van-icon,
.van-icon-clock-o,
.van-cell__left-icon {
  color: #b6b6b6;
}
</style>