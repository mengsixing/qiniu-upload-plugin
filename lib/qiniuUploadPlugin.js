const qiniu = require('qiniu');
const path = require('path');
const ora = require('ora');

// 上传文件到七牛云
class QiniuUploadPlugin {
  constructor(qiniuConfig) {
    // 鉴权
    const mac = new qiniu.auth.digest.Mac(
      qiniuConfig.accessKey,
      qiniuConfig.secretKey
    );
    // 设置机房
    const options = {
      scope: qiniuConfig.bucket
    };
    // 创建上传token
    const putPolicy = new qiniu.rs.PutPolicy(options);
    this.uploadToken = putPolicy.uploadToken(mac);
    let config = new qiniu.conf.Config();
    // 空间对应的机房
    config.zone = qiniu.zone[qiniuConfig.zone];
    this.formUploader = new qiniu.form_up.FormUploader(config);
    this.putExtra = new qiniu.form_up.PutExtra();
    this.publicPath = qiniuConfig.publicPath;
  }
  apply(compiler) {
    compiler.hooks.compilation.tap('QiniuUploadPlugin', compilation => {
      compilation.outputOptions.publicPath = this.publicPath;
      this.absolutePath = compilation.outputOptions.path;
    });

    compiler.hooks.done.tapAsync('QiniuUploadPlugin', (data, callback) => {
      // 直接返回结果
      callback();
      let assetsPromise = [];
      const spinner = ora('开始上传七牛云...').start();
      Object.keys(data.compilation.assets).forEach(file => {
        // 上传非html文件
        if (!/.html$/.test(file)) {
          assetsPromise.push(this.uploadFile(file));
        }
      });
      Promise.all(assetsPromise).then(res => {
        spinner.succeed('七牛云上传完毕!');
      });
    });
  }
  uploadFile(filename) {
    const key = filename;
    const localFile = path.join(this.absolutePath, filename);
    return new Promise((resolve, reject) => {
      // 文件上传
      const spinner = ora(`上传文件${key}...`).start();
      this.formUploader.putFile(
        this.uploadToken,
        key,
        localFile,
        this.putExtra,
        function(respErr, respBody, respInfo) {
          if (respErr) {
            throw respErr;
          }
          if (respInfo.statusCode == 200) {
            resolve(respInfo);
            spinner.succeed(`文件：${key}，上传成功！`);
          } else {
            reject(respInfo);
            spinner.fail(`文件：${key}，上传成功！`);
          }
        }
      );
    });
  }
}

module.exports = QiniuUploadPlugin;
