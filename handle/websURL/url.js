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
const getdoubannews = require('../find-data/doubannews')
const gethupunba = require('../find-data/hupunba')
const getqidian = require('../find-data/qidian')
const getshenmezhidemai = require('../find-data/shenmezhidemai')
const gettaptap = require('../find-data/taptap')
const getithome = require('../find-data/ithome')

// 微博
const weiboURL = 'https://s.weibo.com/top/summary?cate=realtimehot'
//百度
const baiduURL = 'http://top.baidu.com/buzz?b=1&fr=topindex'
// github
const githubURL = 'https://github.com/trending'
// 好奇心日报
const haoqixinURL = 'http://www.qdaily.com/tags/29.html'
// 豆瓣top250
const doubanURL = 'https://movie.douban.com/top250?start=0&filter='
// 豆瓣新片榜
const doubannewsURL = 'https://movie.douban.com/chart'
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
// 虎扑nba
const hupunbaURL = 'https://bbs.hupu.com/all-nba'
// 起点中文网月票榜
const qidianURL = 'https://www.qidian.com/rank/recom'
// 什么值得买白菜党
const shenmezhidemaiURL = 'https://search.smzdm.com/?c=home&s=%E7%99%BD%E8%8F%9C%E5%85%9A&v=a'
// taptap
const taptapURL = 'https://www.taptap.com/top/download'
// it之家
const ithomeURL = 'https://www.ithome.com/'

module.exports = {
    douban: {
        url: doubanURL,
        info: {
            "webname": "douban",
            "weblocalname": "豆瓣top250",
            "weblogo": "douban.png",
            "tag": "other"
        },
    },
    weibo: {
        func: getweibo,
        url: weiboURL,
        info: {
            "webname": "weibo",
            "weblocalname": "微博",
            "weblogo": "weibo.png",
            "tag": "hot"
        },
    },
    baidu: {
        func: getbaidu,
        url: baiduURL,
        info: {
            "webname": "baidu",
            "weblocalname": "百度",
            "weblogo": "baidu.png",
            "tag": "hot"
        },
    },
    github: {
        func: getgithub,
        url: githubURL,
        info: {
            "webname": "github",
            "weblocalname": "github",
            "weblogo": "github.png",
            "tag": "hot"
        },
    },
    haoqixin: {
        func: gethaoqixin,
        url: haoqixinURL,
        info: {
            "webname": "haoqixin",
            "weblocalname": "好奇心日报",
            "weblogo": "haoqixin.png",
            "tag": "hot"
        },
    },
    bilibili: {
        func: getbilibili,
        url: bilibiliURL,
        info: {
            "webname": "bilibili",
            "weblocalname": "bilibili",
            "weblogo": "bilibili.png",
            "tag": "hot"
        },
    },
    zhihu: {
        func: getzhihu,
        url: zhihuURL,
        info: {
            "webname": "zhihu",
            "weblocalname": "知乎日报",
            "weblogo": "zhihu.png",
            "tag": "hot"
        },
    },
    weixin: {
        func: getweixin,
        url: weixinURL,
        info: {
            "webname": "weixin",
            "weblocalname": "微信",
            "weblogo": "weixin.png",
            "tag": "hot"
        },
    },
    wuaipojie: {
        func: getwuaipojie,
        url: wuaipojieURL,
        info: {
            "webname": "wuaipojie",
            "weblocalname": "吾爱破解",
            "weblogo": "wuaipojie.png",
            "tag": "other"
        },
    },
    baidutieba: {
        func: getbaidutieba,
        url: baidutiebaURL,
        info: {
            "webname": "baidutieba",
            "weblocalname": "百度贴吧",
            "weblogo": "baidu.png",
            "tag": "hot"
        },
    },
    doubannews: {
        func: getdoubannews,
        url: doubannewsURL,
        info: {
            "webname": "doubannews",
            "weblocalname": "豆瓣新片榜",
            "weblogo": "douban.png",
            "tag": "hot"
        },
    },
    hupunba: {
        func: gethupunba,
        url: hupunbaURL,
        info: {
            "webname": "hupunba",
            "weblocalname": "虎扑NBA",
            "weblogo": "hupu.png",
            "tag": "hot"
        }
    },
    qidian: {
        func: getqidian,
        url: qidianURL,
        info: {
            "webname": "qidian",
            "weblocalname": "起点中文网",
            "weblogo": "qidian.png",
            "tag": "other"
        }
    },
    shenmezhidemai: {
        func: getshenmezhidemai,
        url: shenmezhidemaiURL,
        info: {
            "webname": "shenmezhidemai",
            "weblocalname": "什么值得买",
            "weblogo": "shenmezhidemai.png",
            "tag": "other"
        }
    },
    taptap: {
        func: gettaptap,
        url: taptapURL,
        info: {
            "webname": "taptap",
            "weblocalname": "TapTap",
            "weblogo": "taptap.png",
            "tag": "hot"
        }
    },
    ithome: {
        func: getithome,
        url: ithomeURL,
        info: {
            "webname": "ithome",
            "weblocalname": "IT之家",
            "weblogo": "ithome.png",
            "tag": "other"
        }
    }
}