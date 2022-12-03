import React from 'react';

const AppointmentOption = ({ option, setTreatment }) => {
	const { name, slots, price } = option;
	return (
		<div className="card shadow-xl">
			<div className="card-body justify-center items-center ">
				<h2 className="card-title text-primary">{name}</h2>
				<p>{slots.length > 0 ? slots[0] : "Try Another Day"}</p>
				<p>
					{slots.length} {slots.length > 1 ? "spaces" : "space"} available
				</p>
				<p><small>Price: ${price}</small></p>
				<div className="card-actions justify-center">
					{/* The button to open modal */}
					<label htmlFor="booking-modal"  onClick={()=> setTreatment(option)} className="btn btn-primary text-white" disabled={slots.length === 0}>
						Book Appointment
					</label>
				</div>
			</div>
		</div>
	);
};

export default AppointmentOption;