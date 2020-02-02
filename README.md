# TopSearch

## 简介

基于node.js的抓取微博、百度热搜、知乎日报、bilibili等热榜榜爬虫，并保存到MongoDB中

环境 vue + node + MongoDB

vue前端项目代码仓库：https://github.com/ctts/hotlist

目前已抓取 百度 百度贴吧 bilibili 豆瓣top250 github每日 好奇心日报 微博 微信 吾爱破解等热榜

爬虫相关内容在handle文件夹中。

因为设置的定时抓取，所以有些网站到点才会抓取（凌晨两点），有些是每分钟更新。可以在 handle/cycle-operation中修改。

## 安装

```
// 初始化
npm install
// 启动
nodemon start
```

npm环境搭建完毕后访问 http://localhost:3000 可访问

ps: 因为前端做的是移动端，所以界面可能有些奇怪，因为用了h5+的api，也就是plus的内容，所以浏览器的手机模式可能也不兼容，需要用h5builder打包成apk可以正常使用，或者网页端凑活看吧（没做响应式……）

一开始需要注册，当然，数据保存到的是你的本地数据库。