var nodemailer = require('nodemailer')
var smtpTransport =  require('nodemailer-smtp-transport');
/**/
var configuration = {
    smtp_host: "smtp.gmail.com",
    smtp_user: "centroclimaorg@gmail.com", // your gmail id
    smtp_password: "Clima3!$", // your gmail password
    mailadmin: 'centroclimaorg@gmail.com'
  };
var config = configuration

var smtpConfig = {
  host: config.smtp_host,
  port: config.smtp_port,
  port: 465,
  secure: true, // use SSL
  auth: {
    user: config.smtp_user,
    pass: config.smtp_password
  }
};

var transporter = nodemailer.createTransport(smtpConfig);

exports.sendEmail = function (contents) {
  return transporter.sendMail(contents, function (error, info) {
    if (error) {
      console.log(error);
      var response = { status: 202, success: false, data: -1 };

    }
    var response = { status: 202, success: true, data: 1 };

  });

}

