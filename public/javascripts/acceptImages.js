const formidable = require('formidable')

module.exports = function (req, callback) {

    var form = new formidable.IncomingForm({
        encoding: "utf-8",
        uploadDir: "public/userImage", //文件上传地址
        keepExtensions: true //保留后缀
    });
    form.parse(req, function (err, fields, files) {
        var obj = {};
        Object.keys(fields).forEach(function (name) { //文本
            console.log('name:' + name + ";filed:" + fields[name]);
            obj[name] = fields[name];
        });

        Object.keys(files).forEach(function (name) { //文件
            console.log('name:' + name + ";file:" + files[name].path);
            obj[name] = files[name];
        });

        callback(err, obj);
    });
}