require('dotenv').config();
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const sesTransport = require('nodemailer-ses-transport');
const request = require('request');


function callback(error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Message sent: ' + info);

  }
}

/* Sending an email. */
router.post('/', function(req, res, next) {

  if ( req.body.captcha === undefined ||
       req.body.captcha === '' ||
       req.body.captcha === null
     ){
        return res.json({"success": false, "msg":"Please select captcha"});
      }
  //Secret Key
  const secretKey = "6Le-z7MUAAAAAChWtiv0mc0TaM7vGm5ww53olfkv";
  //Verify URL
  const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip={req.connection.remoteAddress}`;

  //Make the Request
  request(verifyUrl, (err, response, body) => {
    body = JSON.parse(body);


    //If Not Successful
    if(body.success !== undefined && !body.success){
      return res.json({"success": false, "msg":"Failed captcha verification"});
    }

    //If Successful
    var mailOptions = {
      from: 'hudsongribbletest@gmail.com',
      to: 'hudsonwillgribble@gmail.com',
      text: 'This is some text',
      html: `You received an email from ${req.body.firstName} ${req.body.lastName}<br/>
      Email: ${req.body.email}<br/>
      Message: ${req.body.message}`,
    };

    mailOptions.subject = 'Email From My Website';
    var sesTransporter = nodemailer.createTransport(sesTransport({
      accessKeyId: process.env.AWS_Access,
      secretAccessKey: process.env.AWS_Secret,
    }));

    sesTransporter.sendMail(mailOptions, callback);
    res.json({"success": true, "msg":"Captcha Passed the email was sent successfully"});

  });


});

module.exports = router;
