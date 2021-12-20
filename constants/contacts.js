require("dotenv").config();
const FantomContacts = {
  discord: "http://chat.fantom.network/",
  twitter: "https://twitter.com/FantomFDN",
  telegram: "https://t.me/fantomfoundation",
  reddit: "https://reddit.com/r/FantomFoundation",
  artionUnsubscribe: `https://${
    process.env.RUNTIME ? "testnet." : ""
  }nfthab.com/settings/notification`,
  email: "nfthab@protonmail.com",
};

module.exports = FantomContacts;
