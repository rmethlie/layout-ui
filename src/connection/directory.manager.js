
let __instance__;
export default class Directory {

  static getInstance(config) {
    __instance__ = __instance__ || new Directory(config);
    return __instance__;
  }

  constructor(connection) {
    this.connection = connection;
  }

  find() {
    return new Promise((resolve, reject) => {
      resolve({
        info: { test: 'test' }
      })
    });
  }
}
