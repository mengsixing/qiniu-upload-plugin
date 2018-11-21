const QiniuUploadPlugin = require('../lib/qiniuUploadPlugin');

const mock = {
  publicPath: 'http://cdn.xxx.com',
  accessKey: 'usrU1J2-BTCqaODu',
  secretKey: 'Ff0Ggl7l8XdVL1uHVl6Mge',
  bucket: 'xxx',
  zone: 'Zone_z2'
};
describe('handler', () => {
  let handler1 = null;
  let handler2 = null;
  let plugin = null;

  describe('检查上传时操作', () => {
    /**
     * 在每个测试之前重置 handler
     */
    beforeEach(() => {
      plugin = new QiniuUploadPlugin(mock);
      const compiler = {
        hooks: {
          compilation: {
            tap: (event, cb) => {
              handler1 = cb;
            }
          },
          done: {
            tapAsync: (event, cb) => {
              handler2 = cb;
            }
          }
        }
      };
      plugin.apply(compiler);
    });

    it('publish是否设置成功', done => {
      handler1({
        outputOptions: {
          path: 'test.com'
        }
      });
      done();
      expect(plugin.absolutePath).toBe('test.com');
    });

    it('是否调用七牛云官方上传接口', done => {
      handler2.call(
        { absolutePath: 'xxx' },
        {
          compilation: {
            assets: ['a.js', 'b.js'],
            outputOptions: {
              publicPath: 'xxx',
              path: 'xxx'
            }
          }
        },
        done
      );
      expect(plugin.formUploader.putFile).toHaveBeenCalledTimes(2);
    });
  });
});
