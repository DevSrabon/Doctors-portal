import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';

const BookingModal = ({ treatment, selectedDate, setTreatment, refetch }) => {
	const { name: treatmentName, slots, price } = treatment;
	const date = format(selectedDate, "PP");

	const { user } = useContext(AuthContext);

	const handleBooking = (e) => {
		e.preventDefault();
		const form = e.target;
		const slot = form.slot.value;
		const name = form.name.value;
		const email = form.email.value;
		const phone = form.phone.value;
		const booking = {
			appointmentDate: date,
			treatment: treatmentName,
			patient: name,
			slot,
			email,
			phone,
			price
		};
		fetch("https://doctors-protal-server-devsrabon.vercel.app/bookings", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(booking),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.acknowledged) {
					setTreatment(null);
					toast.success("Booking Confirm");
					refetch();
				} else {
					toast.error(data.message);
				}
			});
	};
	return (
		<>
			<input type="checkbox" id="booking-modal" className="modal-toggle" />
			<div className="modal">
				<div className="modal-box relative">
					<label
						htmlFor="booking-modal"
						className="btn btn-sm btn-circle absolute right-2 top-2">
						✕
					</label>
					<h3 className="text-lg font-bold">{treatmentName}</h3>
					<form onSubmit={handleBooking} className="flex gap-5 flex-col mt-10">
						<input
							type="text"
							value={date}
							disabled
							className="input input-bordered w-full"
						/>
						<select name="slot" className="select select-bordered w-full">
							{slots.map((slot, i) => (
								<option value={slot} key={i}>
									{slot}
								</option>
							))}
						</select>
						<input
							type="text"
							defaultValue={user?.displayName}
							disabled
							name="name"
							placeholder="Your name"
							className="input input-bordered w-full"
						/>
						<input
							defaultValue={user?.email}
							disabled
							type="email"
							name="email"
							placeholder="Your Email"
							className="input input-bordered w-full"
						/>
						<input
							type="text"
							name="phone"
							placeholder="Your phone number"
							className="input input-bordered w-full"
						/>

						<input
							className="btn btn-accent w-full text-white"
							type="submit"
							value="Submit"
						/>
					</form>
				</div>
			</div>
		</>
	);
};

export default BookingModal;