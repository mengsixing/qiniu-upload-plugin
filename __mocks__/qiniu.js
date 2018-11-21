module.exports = {
  auth: {
    digest: {
      Mac: jest.fn()
    }
  },
  rs: {
    PutPolicy: jest.fn(() => ({
      uploadToken: () => ''
    }))
  },
  conf: {
    Config: jest.fn()
  },
  zone: {
    Zone_z2: ''
  },
  formUploader: {
    putFile: jest.fn()
  },
  form_up: {
    FormUploader: jest.fn(() => {
      return {
        putFile: jest.fn((uploadToken, key, localFile, putExtra, cb) => {
          process.nextTick(cb());
        })
      };
    }),
    PutExtra: jest.fn(() => 'mockExtra'),
    putFile: jest.fn((uploadToken, key, localFile, putExtra, cb) => {
      process.nextTick(cb());
    })
  }
};
