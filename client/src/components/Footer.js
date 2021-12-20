import React, { useRef, useState } from "react";
import emailjs from 'emailjs-com';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Result = () => {
	return (
		<p>Your message has been successful sent. i will contact you soon.....</p>
	)
}

const Footer = () => {
	const form = useRef();
	const [result, showResult] = useState(false);
	const sendEmail = (e) => {
		e.preventDefault();
		emailjs.sendForm('service_lae0kph', 'template_feedback', form.current, 'user_xl4ffC0fa6DHfcMEmqomQ')
			.then((result) => {
				console.log(result.text);
			}, (error) => {
				console.log(error.text);
			});
		e.target.reset();
		showResult(true);
	};
	return (
		<div>
			<div id='contact' style={{ color: "white", paddingTop: "9.2%" }}>
				<div className='container'>
					<div className='col-md-8'>
						<div className='row'>
							<div className='section-title'>
								<h2>Get In Touch</h2>
								<p>
									Please fill out the form below to send us an email and we will
									get back to you as soon as possible.
								</p>
							</div>
							<form ref={form} onSubmit={sendEmail} name='sentMessage'>
								<div className='row'>
									<div className='col-md-6'>
										<div className='form-group'>
											<input
												type='text'
												id='name'
												name='name'
												className='form-control'
												placeholder='Name'
												required
											/>
											<p className='help-block text-danger'></p>
										</div>
									</div>
									<div className='col-md-6'>
										<div className='form-group'>
											<input
												type='email'
												id='email'
												name='email'
												className='form-control'
												placeholder='Email'
												required
											/>
											<p className='help-block text-danger'></p>
										</div>
									</div>
								</div>
								<div className='form-group'>
									<input type='message' id='message' name='message' className='form-control'
										placeholder='Email'
										required />
									<p className='help-block text-danger'></p>
								</div>
								<div id='success'></div>
								<button type='submit' className='btn btn-custom btn-lg' style={{ "backgroundColor": "white" }}>
									Send Message
								</button>
								<div>{result ? <Result /> : null}</div>
							</form>
						</div>
					</div>
					<div className='col-md-3 col-md-offset-1 contact-info'>
						<div className='contact-item'>
							<h3>Contact Info</h3>
							<p>
								<span>
									<i className='fa fa-map-marker'></i> Address :
								</span>
								Food desk <br />shop no.14,Akshat Heaven Rd, <br /> near Sardar Chok,  Urjanagar 1,<br />  Kudasan,  Gandhinagar, <br /> Gujarat 382421
							</p>
						</div>
						<div className='contact-item'>
							<p>
								<span>
									<i className='fa fa-phone'></i> Phone
								</span>{' '}
								9925099210
							</p>
						</div>
						<div className='contact-item'>
							<p>
								<span>
									<i className='fa fa-envelope-o'></i> Email
								</span>{' '}
								Fooddesk@gmail.com
							</p>
						</div>
					</div>
					<div className='col-md-12'>
						<div className='row'>
							<div className='social'>
								<ul>
									<a href="https://www.linkedin.com/">
										<LinkedInIcon />
									</a>
									<br />
									<a href="https://www.instagram.com/">
										<InstagramIcon />
									</a><br />
									<a href="https://www.facebook.com/">
										<FacebookIcon />
									</a>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id='footer'>
				<div className='container text-center' style={{ "color": "white" }}>
					<p>
						&copy; 2020 Food Desk  Design by{' Group 17 '}
						<br />
					</p>
				</div>
			</div>
		</div>
	);
}

export default Footer;