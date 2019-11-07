const getweibo = require('../find-data/weibo')
const getbaidu = require('../find-data/baidu')
const getbilibili = require('../find-data/bilibili')
// const getdouban = require('../find-data/douban')
const gethaoqixin = require('../find-data/haoqixin')
const getgithub = require('../find-data/github')
const getzhihu = require('../find-data/zhihu')
const getweixin = require('../find-data/weixin')
const getwuaipojie = require('../find-data/wuaipojie')
const getbaidutieba = require('../find-data/baidutieba')


// 微博
const weiboURL = 'https://s.weibo.com/top/summary?cate=realtimehot'
//百度
const baiduURL = 'http://top.baidu.com/buzz?b=1&fr=topindex'
// github
const githubURL = 'https://github.com/trending'
// 好奇心日报
const haoqixinURL = 'http://www.qdaily.com/tags/29.html'
// 豆瓣
const doubanURL = 'https://movie.douban.com/top250?start=0&filter='
// bilibili
const bilibiliURL = 'https://www.bilibili.com/ranking/all/0/0/1'
// 知乎
const zhihuURL = 'https://daily.zhihu.com/'
// 微信
const weixinURL = 'http://www.gsdata.cn/rank/wxarc'
// 吾爱破解
const wuaipojieURL = 'https://www.52pojie.cn/forum.php?mod=guide&view=hot'
// 贴吧
const baidutiebaURL = 'http://tieba.baidu.com/hottopic/browse/topicList?res_type=1&red_tag=w0084651866'

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
    weixin: {
        func: getweixin,
        url: weixinURL,
    },
    wuaipojie: {
        func: getwuaipojie,
        url: wuaipojieURL,
    },
    baidutieba: {
        func: getbaidutieba,
        url: baidutiebaURL,
    },
    doubanURL,
}