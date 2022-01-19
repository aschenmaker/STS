> note: this repo have been archieve. Read only.
> 
> 注意：本项目已经被⚠️废弃。

# 订阅搜索

一个功能类似于 Google Alert 的小程序，使用流程 `搜索 -> 订阅 -> 接收邮件`，能够有效的对关注内容进行持续跟踪，而对于收到的邮件，也会有新内容的大纲，和完成内容PDF两种模式。

| 订阅模式⬇️ -设置搜索时间 | 接收邮件时间      |
| ----------------------- | ----------------- |
| 有新内容                | Auto              |
| 每天一次                | 1:00-24:00 每小时 |
| 每周一次                | Monday - Sunday   |
| 每月一次                | 1st -  28th       |

由于搜索引擎采集的数据层次不齐，需要进行针对性优化，当前版本属于勉强可以用。

~~等优化完成后将发布正式版本，同时开源。~~

## 后端

使用 Flask + Nginx + Mysql，由朱sir完成✅。

https://github.com/15968865116/search

## 预览

<img src="https://user-images.githubusercontent.com/20419375/77607598-d5514d80-6f55-11ea-972c-c65527e39407.jpg" alt="首页" style="zoom: 33%;" />



<img src="https://user-images.githubusercontent.com/20419375/77607606-dbdfc500-6f55-11ea-9dd2-d6324ee7fa10.jpg" alt="创建页面" style="zoom:33%;" />

<img src="https://user-images.githubusercontent.com/20419375/77607608-dda98880-6f55-11ea-935b-788c6be2161e.jpg" alt="搜索预览" style="zoom:33%;" />

<img src="https://user-images.githubusercontent.com/20419375/77607609-df734c00-6f55-11ea-9a96-67c06c99243b.jpg" alt="订阅结果" style="zoom:33%;" />

更多截图见 ：https://github.com/aschenmaker/STS/issues/1

## 版本日志

> 版本号命名规则 vX.Y.Z
>
> X: 主版本号, Y: 次版本号, Z: 修订号
>
> 修饰后缀词(可选) - alpha: 内测版, beta: 公测版, 无(默认): 正式版

### V1.0.0 正式版

* 优化完成，即刻上线。

### v0.1.5 alpha 内测版【当前版本】

* 支持关键词进行搜索预览
* 增加了 更新日志 页面
* 重新布局优化了页面
  * 我的 页面优化了UI
  * 创建订阅 页面对搜索结果的呈现进行更新

### v0.1.4 alpha 内测版

* 支持多邮箱订阅
* 搜索界面优化

### v0.1.3 alpha 内测版

* 支持订阅增删改查
* 优化了本地存储
* 重构了搜索页面的存储

### v0.1.2 alpha 内测版

* 优化了登录授权过程
* 新建了授权页面

### v0.1.1 alpha 内测版

* 体验测试版发布

### 