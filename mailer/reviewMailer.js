require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const foundationEmail = "support.artion@fantom.foundation";

const adminEmails = ["artion@fantom.foundation"];

const createDenyMessage = (data) => {
  return {
    to: data.to,
    from: foundationEmail,
    subject: data.subject,
    text: "NFTHab notification",
    html: `Your collection has been denied registration on NFTHab. <br/><br/> reason : ${data.reason} </br></br> Thank You.  <br/><br/>`,
  };
};

const createApproveMessage = (data) => {
  return {
    to: data.to,
    from: foundationEmail,
    subject: data.subject,
    text: "NFTHab notification",
    html: "Dear NFTHab User! <br/> Your collection has been successfully registered in NFTHab. ",
  };
};

const sendApplicationDenyEmail = (data) => {
  let message = createDenyMessage(data);
  sgMail.sendMultiple(message).then(
    () => {},
    (error) => {
      if (error.response) {
      }
    }
  );
};

const sendApplicationReviewedEmail = (data) => {
  let message = createApproveMessage(data);
  sgMail.sendMultiple(message).then(
    () => {},
    (error) => {
      if (error.response) {
      }
    }
  );
};

const notifyAdminForNewCollectionApplication = () => {
  let message = {
    to: adminEmails,
    from: foundationEmail,
    subject: "New Application",
    text: "NFTHab notification",
    html: "New collection has been submitted for your review.",
  };
  sgMail.sendMultiple(message).then(
    () => {},
    (error) => {
      if (error.response) {
      }
    }
  );
};

const notifyInternalCollectionDeployment = (address, email) => {
  let message = {
    to: email,
    from: foundationEmail,
    subject: "Collection Created",
    text: "NFTHab notification",
    html: `New collection has been deployed with address ${address}`,
  };
  sgMail.send(message).then(
    () => {},
    (error) => {
      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
};

const applicationMailer = {
  sendApplicationDenyEmail,
  sendApplicationReviewedEmail,
  notifyAdminForNewCollectionApplication,
  notifyInternalCollectionDeployment,
};

module.exports = applicationMailer;
