require("dotenv").config();
const router = require("express").Router();
const ethers = require("ethers");
const toLowerCase = require("../utils/utils");

const mongoose = require("mongoose");
const Logger = require('../services/logger');
const Listing = mongoose.model("Listing");
const NFTITEM = mongoose.model("NFTITEM");

router.post('/updateItemListing', async (req, res) => {
    try {
      let sender = toLowerCase(req.body.senderAddress);
      let contractAddress = toLowerCase(req.body.contractAddress);
      let tokenID = parseInt(req.body.tokenID);
      let paytoken = toLowerCase(req.body.paytoken);
      let quantity = parseInt(req.body.quantity);
      let price = parseFloat(req.body.price);
      let blockNumber = 0;
      let nftItem = await NFTITEM.findOne({
        contractAddress: contractAddress,
        tokenID: tokenID
      });
      let nftOwner = nftItem.owner;
      if(nftOwner!=sender){
        return res.json({
          status: "failed",
          data: "Only Owner can list NFT!",
        });
      } else{
        let listing = await Listing.findOne({
          minter: contractAddress,
          tokenID: tokenID,
          owner: sender
        });
        if (!listing) {
          listing = new Listing();
        }
        try{            
          listing.owner = nftOwner;
          listing.minter = contractAddress;
          listing.tokenID = tokenID;
          listing.quantity = quantity;
          listing.paymentToken = paytoken;
          nftItem.paymentToken = paytoken;
          listing.price = price;
          nftItem.price = price;
          listing.blockNumber = blockNumber;
          await listing.save();
          await nftItem.save();
          return res.json({
            status: "success",
            data: "NFT Listing details submitted!",
          });
        } catch(error){
          Logger.error(error);
          return res.json({
            status: 'failed',
            data: "Failed to submit listing to database"
          });          
        }    
      }        
    } catch (error) {
      Logger.error(error);
      return res.json({
        status: 'failed',
        data: "Failed to connect to database"
      });
    }   
  });

router.post('/cancelItemListing', async (req, res) => {
  try {
    let sender = toLowerCase(req.body.senderAddress);
    let contractAddress = toLowerCase(req.body.contractAddress);
    let tokenID = parseInt(req.body.tokenID);
    await Listing.deleteOne({
      minter: contractAddress,
      tokenID: tokenID,
      owner: sender
    });    
  } catch (error) {
    Logger.error(error);
    return res.json({
      status: 'failed',
      data: "Failed to connect to database"
    });
  }
});
  module.exports = router;