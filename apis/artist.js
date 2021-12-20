require("dotenv").config();

const mongoose = require("mongoose");
const Artist = mongoose.model("Artist");

const router = require("express").Router();
const auth = require("./middleware/auth");
const toLowerCase = require("../utils/utils");
const extractAddress = require("../services/address.utils");
const validateSignature = require("../apis/middleware/auth.sign");
const Logger = require('../services/logger');

const ADMINADDRESS = process.env.ADMINADDRESS;

const isAdmin = (msgSender) => {
  return toLowerCase(ADMINADDRESS) == toLowerCase(msgSender);
};

router.post("/add", auth, async (req, res) => {
  try {
    let adminAddress = extractAddress(req, res);
    if (!isAdmin(adminAddress))
      return res.json({
        status: "failed",
        data: "Only Admin can add Artists",
      });
    let artistAddress = toLowerCase(req.body.address);
    let artistName = req.body.name;
    let signature = req.body.signature;
    let retrievedAddr = req.body.signatureAddress;
    let isValidsignature = validateSignature(
      adminAddress,
      signature,
      retrievedAddr
    );
    if (!isValidsignature)
      return res.status(400).json({
        status: "invalid signature",
      });
    let artist = await Artist.findOne({ address: artistAddress });
    if (artist) {
      return res.json({
        status: "failed",
        data: "Artist with this address already exists!",
      });
    } else {
      artist = new Artist();
      artist.address = artistAddress;
      artist.name = artistName;
      await artist.save();
      return res.json({
        status: "success",
        data: "New Artist successfully added!",
      });
    }
  } catch (error) {
    Logger.error(error);
    return res.json({
      status: "failed",
    });
  }
});

router.post("/remove", auth, async (req, res) => {
  try {
    let adminAddress = extractAddress(req, res);
    if (!isAdmin(adminAddress))
      return res.json({
        status: "failed",
        data: "Only Admin can remove Artists",
      });
    let artistAddress = toLowerCase(req.body.address);
    let signature = req.body.signature;
    let retrievedAddr = req.body.signatureAddress;
    let isValidsignature = validateSignature(
      adminAddress,
      signature,
      retrievedAddr
    );
    if (!isValidsignature)
      return res.status(400).json({
        status: "invalid signature",
      });
    await Artist.deleteMany({ address: artistAddress });
    return res.json({
      status: "success",
      data: "Successfully removed a Artist",
    });
  } catch (error) {
    Logger.error(error);
    return res.json({
      status: "failed",
    });
  }
});

router.get("/isArtist/:address", async (req, res) => {
  try {
    let address = toLowerCase(req.params.address);
    let artist = await Artist.findOne({ address: address });
    if (artist)
      return res.json({
        status: "success",
        data: true,
      });
    else
      return res.json({
        status: "success",
        data: false,
      });
  } catch (error) {
    Logger.error(error);
    return res.json({
      status: "failed",
      data: false,
    });
  }
});

module.exports = router;
