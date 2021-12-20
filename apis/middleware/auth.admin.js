require("dotenv").config();
const extractAddress = require("../../services/address.utils");
const adminAddress = process.env.ADMINADDRESS;

const admin_auth = (req, res, next) => {
  try {
    let address = extractAddress(req, res);
    if (address == adminAddress) {
      next();
    } else {
      return res.status(400).json({
        status: "failed",
        data: "only admins are allowed to use this api",
      });
    }
  } catch (error) {
    return res.json({
      status: "failed",
    });
  }
};

module.exports = admin_auth;
