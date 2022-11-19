import React from 'react';
import appointment from "../../../assets/images/appointment.png";

const ContactUs = () => {
    return (
			<section
				className="mt-16 px-6 py-20 text-center"
				style={{
					background: `url(${appointment})`,
				}}>
				<div>
					<h5 className="text-secondary text-xl">Contact Us</h5>
					<h2 className="text-4xl text-white">Stay connected with us</h2>
				</div>
				<form action="" className="flex flex-col gap-5 items-center mt-10">
					<input
						className="input input-bordered w-full max-w-lg"
						type="email"
						name="email"
						placeholder="Email Address"
						id=""
					/>
					<input
						className="input input-bordered w-full max-w-lg"
						type="text"
						name="subject"
						placeholder="Subject"
					/>
					<textarea
                    className="textarea textarea-bordered h-24 w-full max-w-lg"
                    name='message'
                    placeholder="Your message"></textarea>
                <button className='btn btn-primary mt-2 text-white' type="submit">Submit</button>
				</form>
			</section>
		);
};

export default ContactUs;