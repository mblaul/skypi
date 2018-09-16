var nodemailer = require("nodemailer");

module.exports = sendEmail = nodemailer.createTestAccount((err, account) => {
	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		// host: "smtp.gmail.com",
		// port: 465,
		// secure: true, // true for 465, false for other ports
		service: "gmail",
		auth: {
			user: "skypi.noreply@gmail.com", // generated ethereal user
			pass: config.secretEmailKey // generated ethereal password
		}
	});

	// setup email data with unicode symbols
	let mailOptions = {
		from: "skypi.noreply@gmail.com", // sender address
		to: "mblaul@oakland.edu", // list of receivers
		subject: "Hello ✔", // Subject line
		text: "Hello world?", // plain text body
		html: "<b>Hello world?</b>" // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, (err, info) => {
		if (err) {
			console.log(err);
			errors.server = "An error occured, please try again";
			return res.status(500).json(errors);
		}
		console.log("Message sent: %s", info.messageId);
		// Preview only available when sending through an Ethereal account
		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
		return res.json({
			success: true
		});
		// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
		// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
	});
});
