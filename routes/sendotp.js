require('dotenv').config();
const { Router } = require('express');
const pool = require('../config/db');
const sendotp = Router();
const transporter = require('../config/mail');
const RandExp = require('randexp');

sendotp.post('/sendotp', (req, res) => {
	pool.query(`SELECT email FROM users WHERE username = '${req.body.user}';`, (error, results) => {
		if (error) {
			res.status(500).send(error);
		}
		if (results.rows.length > 0) {

			const otp = new RandExp(/^[0-9a-zA-Z]{10}$/).gen();

			const mailOptions = {
				from: `${process.env.EMAIL_ADDRESS}`,
				to: `${results.rows[0].email}`,
				subject: 'Link To Reset Password',
				text:
					'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
					+ 'Please note down blow otp and write it in otp section.\n\n'
					+ `OTP : ${otp}`
					+ 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
			};

			console.log('sending mail');

			transporter.sendMail(mailOptions, (err, _response) => {
				if (err) {
					res.status(500).send(err);
				} else {
					res.status(200).send({ otp });
				}
			});

		} else {
			res.status(500).send(undefined);
		}
	});
})


module.exports = sendotp;