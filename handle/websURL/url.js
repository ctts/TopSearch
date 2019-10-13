const getweibo = require('../find-data/weibo')
const getbaidu = require('../find-data/baidu')


// 微博
const weiboURL = 'https://s.weibo.com/top/summary?cate=realtimehot';
//百度
const baiduURL = 'http://top.baidu.com/buzz?b=1&fr=topindex';
// github
const githubURL = 'https://github.com/search?o=desc&p=1&q=stars%3A%3E50000&s=stars&type=Repositories';
// 好奇心日报
const haoqixinURL = 'http://www.qdaily.com/tags/29.html';
// 豆瓣
const doubanURL = 'https://movie.douban.com/top250';
// bilibili
const bilibiliURL = 'https://www.bilibili.com/ranking';
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
    githubURL,
    haoqixinURL,
    doubanURL,
    bilibiliURL,
    zhihuURL,
}