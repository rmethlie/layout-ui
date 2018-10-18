
let __instance__;
export default class Directory {

  static getInstance(config) {
    __instance__ = __instance__ || new Directory(config);
    return __instance__;
  }

  constructor(connection) {
    this.connection = connection.connection;
  }

  parseVcard(data) {
    const { json } = data;
    const vCard = Object.assign({}, {
      FN: "",
      EMAIL: {
        USERID: ""
      },
      ORG: {
        ORGNAME: "",
        ORGUNIT: ""
      }
    }, json.vCard);

    const {from} = json.attributes;
    const name = vCard.FN.split('-')[0].trim();
    const email = vCard.EMAIL.USERID;
    const company = vCard.ORG.ORGNAME;
    // would prefer to return null rather than empty string
    const upid = vCard.ORG.ORGUNIT || null;

    return {
      id: from,
      name: name,
      email: email,
      company: company,
      up_account_id: upid
    };
  }

  handleError(error) {
    console.warn('[Directory] Could not load vCard', error);
  }

  find() {
    return new Promise((resolve, reject) => {
      this.connection._vcard.getVcard()
        .then(
          this.parseVcard.bind(this),
          this.handleError.bind(this)
        ).then(resolve);
    });
  }
}
