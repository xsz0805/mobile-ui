# sh_mobile_ui

# 基于vant-ui搜索组件封装的简单组件
##  版本更新至  0.2.0
## 安装
```js
npm  i  sh_mobile    
```
```js
main.js  导入

import  sh_mobile from 'sh_mobile'
import  Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant);
Vue.use(sh_mobile); 
```
# mybadge   徽标

```html
 <mybadge count="1"> 这是文字 </mybadge>

  <mybadge>
    这是文字
    <template slot="contentImg"><img src="../xxx.png" alt="" /></template>
  </mybadge>
```
## Attributes
```
count    数字内容        type: Number   String
```

## slots
```
contentImg    自定义徽标内容 
```



# mysearch  搜索组件

```html
 <mysearch hotStyle='true'> </mysearch>
```
 
## Props
```
v-model  当前输入的值      type:String  

```

## Attributes
```
history    搜索历史列表      type:Array
```
```
hotStyle   是否显示热搜样式   type:boolean   Default  false
```

## Events
``` 
input      	输入框内容变化时触发   回调参数   value  type:String  (当前输入框的值)
```
```
onsearch    确定搜索时触发         回调参数   value   type:String (当前输入的值)   
```
# 步骤条

```html
<mystep></mystep> 
```
## props
```
active        当前步骤        default  0
```
