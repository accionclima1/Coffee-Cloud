var nodemailer = require('nodemailer')
var smtpTransport =  require('nodemailer-smtp-transport');
/**/
var configuration = {
    smtp_host: "smtp.gmail.com",
    smtp_user: "vishal.test123456@gmail.com", // your gmail id
    display_name:"Vishal Test",
    smtp_password: "vishal987654", // your gmail password
    mailadmin: 'vishal.test123456@gmail.com'
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

exports.sendEmail = function (mailRequest, cb) {
    let mailOptions = {
        from: configuration.display_name + '<' + configuration.smtp_user + '>', // sender address
        to: mailRequest.TO, // list of receivers
        subject: mailRequest.SUBJECT, // Subject line
        text: mailRequest.TEXT, // plain text body
        html: mailRequest.HTML // html body
    };
    return transporter.sendMail(mailOptions, function (error, info) {
        console.log("in mal request answer");
        if (error) {
            console.log(error);
            var response = { status: 202, success: false, data: -1 };

        }
        var response = { status: 202, success: true, data: 1 };
        cb(response);
    });

}

