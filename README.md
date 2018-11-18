# qiniu-upload-plugin

> 将 Webpack 打包出来的 assets 上传到七牛云。

## 安装

```js
npm install qiniu-upload-plugin --save-dev
```

## 使用方法

```js
const QiniuUploadPlugin = require('./QiniuUploadPlugin');

plugins: [
  new MyQiniuUploadPlugin({
    publishPath: 'http://cdn.xxx.com', // 七牛云域名，自动替换publicPath
    accessKey: 'your qiniu accessKey', // 个人中心，秘钥管理，AK
    secretKey: 'your qiniu secretKey', // 个人中心，秘钥管理，SK
    bucket: 'your qiniu bucket', // 存储空间名称
    zone: 'Zone_z2' // 存储地区
  })
];
```
