# sh_mobile_ui

# 基于Vant-ui封装的简单组件
##  版本更新至  0.2.5
## 安装
```js
已经集成 Vant@2.12.6  无需重复install vant 
```
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
```js
count    数字内容        type: Number   String
```

## slots
```js
contentImg    自定义徽标内容 
```

# 按钮

```html
<mybutton>按钮</mybutton>
```
## Events
```js
click       点击事件
```

# mysearch  搜索组件

```html
 <mysearch hotStyle='true'> </mysearch>
```
 
## Props
```js
v-model  当前输入的值      type:String  

```

## Attributes
```js
history    搜索历史列表      type:Array
```
```js
hotStyle   是否显示热搜样式   type:boolean   Default  false
```

## Events
```js 
input      	输入框内容变化时触发   回调参数   value  type:String  (当前输入框的值)
```
```js
onsearch    确定搜索时触发         回调参数   value   type:String (当前输入的值)   
```
# mystep步骤条

```html
<mystep></mystep> 
```
## props

```js
stepList   自定义步骤名称及简介  目前仅支持三步   type  Array    
```
```js
active     当前选中步骤      type  Number  String    default  0   
```
```js
exampie
  [
  {step:'步骤自定义',synopsis:'简介自定义'},
  {step:'步骤自定义',synopsis:'简介自定义'}, 
  {step:'步骤自定义',synopsis:'简介自定义'},
  ]
``` 


## Attributes 

```
```

## Events

```js
stepClick      点击步骤的标题或图标时触发      回调参数  index:number
```

# progress进度条

```html
<myprogress precent='70' hook></myprogress>
```

## Props

```js
precent       当前进度百分数      type Number  String    default  70
```

```js
modifyColor         进度条颜色         type  String
```

## Attributes
```js
warn     警告样式           type Boolean       default  false
```
```js
error    错误样式           type Boolean       default  false
```
```js
hook    完成是否显示打钩(默认样式下 'precent' = 100)     type Boolean       default  
```


# circle 环形进度条

```html
<mycricle rate='60' color='red' ></mycricle>
```
## Props

```js
rate       当前进度百分数      type Number  String    default  70
```

```js
modifyColor         进度条颜色         type  String
``` 

## Attributes 
```js
warn     警告样式           type Boolean       default  false
```
```js
error    错误样式           type Boolean       default  false
```
```js
finish   成功样式           type Boolean       default  false
```

#  myloading  加载...

使用
```js
import lottie from 'vue-lottie';
Vue.component('lottie', lottie)

```

```html
<myloading type=2 loading></loading>
```

## Props

```js
loading        是否显示遮罩层       type Boolean     default  false
```

## Attributes

```js
type      加载样式     type  Number(0、1、2) 三种样式    default  2
```
  

# 树形组件 mytree

```html
<mytree></mytree>
```

Props

```js
treeData   树形组件数据     type Object      固定格式   
```
```
example   
```
```js
 {
          name: "一级",
          children: [
            { name: "书", id: 1 },
            { name: "本", id: 1 },
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
        }
```

## Events

```js
rightEdit       右侧编辑按钮点击事件      
```
```js
iptTree        弹出框修改目录名称输入事件         回调参数   val    当前输入框的值
```
```js
success        确认修改目录触发事件              回调参数   data    返回修改后的目录数据  
```
```js
delTree        确认删除目录触发事件              回调参数   result  返回删除后的目录数据
```