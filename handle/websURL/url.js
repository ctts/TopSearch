const getweibo = require('../find-data/weibo')
const getbaidu = require('../find-data/baidu')
const getbilibili = require('../find-data/bilibili')
// const getdouban = require('../find-data/douban')
const gethaoqixin = require('../find-data/haoqixin')
const getgithub = require('../find-data/github')
const getzhihu = require('../find-data/zhihu')


// 微博
const weiboURL = 'https://s.weibo.com/top/summary?cate=realtimehot';
//百度
const baiduURL = 'http://top.baidu.com/buzz?b=1&fr=topindex';
// github
const githubURL = 'https://github.com/trending';
// 好奇心日报
const haoqixinURL = 'http://www.qdaily.com/tags/29.html';
// 豆瓣
const doubanURL = 'https://movie.douban.com/top250?start=0&filter=';
// bilibili
const bilibiliURL = 'https://www.bilibili.com/ranking/all/0/0/1';
// 知乎
const zhihuURL = 'https://daily.zhihu.com/';

module.exports = {
    weibo: {
        func: getweibo,
        url: weiboURL,
    },
    baidu: {
        func: getbaidu,
        url: baiduURL,
    },
    github: {
        func: getgithub,
        url: githubURL,
    },
    haoqixin: {
        func: gethaoqixin,
        url: haoqixinURL,
    },
    bilibili: {
        func: getbilibili,
        url: bilibiliURL
    },
    zhihu: {
        func: getzhihu,
        url: zhihuURL,
    },
    doubanURL,
}