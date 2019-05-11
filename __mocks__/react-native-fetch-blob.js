class FetchBlob {
  constructor() {
    this.fs = {
      dirs: {
        CacheDir: 'CacheDir'
      },
      exists: () => Promise.resolve(),
      config: () => jest.fn()
    };
  }
}

export default new FetchBlob();
