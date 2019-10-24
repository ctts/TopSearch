const formidable = require('formidable')
let path = require('path');
const fs = require('fs')

module.exports = function (req) {
    let promise = new Promise((resolve, reject) => {
        let form = new formidable.IncomingForm({
            encoding: "utf-8",
            uploadDir: path.join(__dirname, '../userHead'), //文件上传地址
            keepExtensions: false //保留后缀
        });
        form.parse(req, function (err, fields, files) {
            if (!err) {
                let obj = {};
                Object.keys(fields).forEach(function (name) { //文本
                    // console.log('name:' + name + ";filed:" + fields[name]);
                    obj[name] = fields[name];
                });

                Object.keys(files).forEach(function (name) { //文件
                    // console.log('name:' + name + ";file:" + files[name].path);
                    obj[name] = files[name];
                });

                // 文件重命名
                let oldname = obj.userimg.path
                let newname = path.join(__dirname, '../userHead', obj.username + new Date().getTime() + '.png');

                fs.rename(oldname, newname, err => {
                    err ? reject(err) : resolve({
                        userimg: newname,
                        username: obj.username
                    })
                });
            } else {
                reject(err)
            }
        })
    });
    return promise
}