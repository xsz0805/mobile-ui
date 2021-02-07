# sh_mobile_ui

# 基于Vant-ui封装的简单组件
##  版本更新至  0.2.7
## 安装
```js
集成 Vant@2.12.6  无需重复install vant 
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
example
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

# 验证码

## 拼图验证码/选字验证码
```js
import { Toast } from "vant";
```
```html
 <mycaptcha :show='captshow' @success='successCapt' @error='errorCapt' :visible='true'></mycaptcha>
```
## Props
```js
show       是否显示验证码       type  Boolean    default  false
```
```js
visible     拼图/选字验证码切换      type  Boolean   default   fasle
```

## Events
```js
success    验证成功回调           回调参数   show  type  Boolean   
```
```js
error      验证失败回调
```

## 滑动验证
```html
<myslide  @success='success' @error='error'></myslide>
```

## Events
```js
success    验证成功回调            
```
```js
error      验证失败回调
```

## 运算验证码   
```html
<mycompute @success='success' @error='error'></mycompute>
```
## Events
```js
success    验证成功回调            
```
```js
error      验证失败回调
```

## 短信验证码
```html
<mymessage @msginput='msginput'></mymessage>
```

## Events

```js
msginput   触发输入事件       回调参数   val  输入框的值
```
```js
send       发送验证码         回调参数   code   输入框的值
```
## 数字图片验证码
```html
<mycode v-model="codeValue" @codeSubmit='codeSubmit'></mycode>
```
## Props
```js
v-model   当前输入的值      
```
## Events
```js
codeSubmit    点击提交验证的回调函数
```
 
# 扫一扫   myScan

```html
 <myscan type='ipt' v-model='value'></myscan>
```
## Attributes
```js
type    扫一扫控件模式  type = 'ipt' or type = 'btn'      Default   'ipt'   
```

## Props 
```js
v-model      当前输入框的值  
```
## Events
```js
scanClick    点击扫一扫图标回调函数   
```

# 身份证上传

```html
<myupload @upload='upload' v-model='info'></myupload>
```
## Props 
```js
v-model      当前输入框的值  
```
## Events
```js
upload    点击点击上传回调函数      回调参数  (result,formData)    result:'图片信息'  formData:'输入框的值'
```

