# qiniu-upload-plugin

[![npm版本](https://img.shields.io/npm/v/qiniu-upload-plugin.svg)](https://www.npmjs.com/package/qiniu-upload-plugin)
[![下载量](https://img.shields.io/npm/dm/qiniu-upload-plugin.svg)](http://npm-stat.com/charts.html?package=qiniu-upload-plugin)
[![Build Status](https://travis-ci.com/yhlben/qiniu-upload-plugin.svg?branch=master)](https://travis-ci.com/yhlben/qiniu-upload-plugin)
[![Build status](https://ci.appveyor.com/api/projects/status/i72dafha6ht7bcnk/branch/master?svg=true)](https://ci.appveyor.com/project/yhlben/qiniu-upload-plugin/branch/master)
[![Coverage Status](https://coveralls.io/repos/github/yhlben/qiniu-upload-plugin/badge.svg)](https://coveralls.io/github/yhlben/qiniu-upload-plugin)

> 将 Webpack 打包出来的 assets 上传到七牛云。

## 特点

- 上传 webpack 打包后的所有静态资源到七牛云。
- 自动忽略`.html`文件。

基于官方七牛云[Node.js SDK](https://developer.qiniu.com/kodo/sdk/1289/nodejs)。

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

## 效果截图

![上传七牛云](https://raw.githubusercontent.com/yhlben/qiniu-upload-plugin/master/screenshots/qiniu-upload.png)

## 示例项目

[Notepad](https://github.com/yhlben/notepad)一个 TypeScript 编写的记事本。
