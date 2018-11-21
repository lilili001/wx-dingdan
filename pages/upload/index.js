//index.js
var demoSdk = require('../../utils/demo-sdk');
var demoNoSdk = require('../../utils/demo-no-sdk');

var option = {
    data: {
        list: []
    }
};

//使用cos sdk : list ['PostObject','PutObject'] 测的 sts.php 上传 成功
for (var key in demoSdk) {
    if (demoSdk.hasOwnProperty(key)) {
        option.data.list.push(key);
        option[key] = demoSdk[key];
    }
}

//使用 no-sdk, 原生上传 sts-auth.php
option.simpleUpload = demoNoSdk;

//获取应用实例
Page(option);
