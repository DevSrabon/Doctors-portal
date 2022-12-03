import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";

const AddDoctor = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

    const imageHostKey = process.env.REACT_APP_imgbb_key;
    
    const navigate = useNavigate();

	const { data: specialties, isLoading } = useQuery({
		queryKey: ["specialty"],
		queryFn: async () => {
			const res = fetch("https://doctors-protal-server.vercel.app/appointmentSpecialty");
			const data = (await res).json();
			return data;
		},
	});

	const handleAddDoctor = (data) => {
		const image = data.img[0];
		console.log(image);
		const formData = new FormData();
		formData.append("image", image);
		const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
		fetch(url, {
			method: "POST",
			body: formData,
		})
			.then((res) => res.json())
			.then((imgData) => {
				if (imgData.success) {
					console.log(imgData.data.url);
					const doctor = {
						name: data.name,
						email: data.email,
						specialty: data.specialty,
						image: imgData.data.url,
                    };
                    // save doctor information into the database
                    fetch("https://doctors-protal-server.vercel.app/doctors", {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success(`${data.name} is added successfully`)
                            navigate("/dashboard/managedoctors");
                    })
				}
			});
	};
	if (isLoading) {
		return <Loading></Loading>;
	}
	return (
		<div className="w-96 p-7 shadow-2xl">
			<h3 className="text-3xl"> Add A New Doctor</h3>
			<form onSubmit={handleSubmit(handleAddDoctor)}>
				<div className="form-control w-full max-w-xs">
					<label className="label">
						<span className="label-text">Name</span>
					</label>
					<input
						className="input input-bordered w-full max-w-xs"
						type="text"
						{...register("name", {
							required: "Name Address is required",
						})}
					/>
					{errors.name && (
						<p className="text-red-600">{errors.name?.message}</p>
					)}
				</div>
				<div className="form-control w-full max-w-xs">
					<label className="label">
						<span className="label-text">Email</span>
					</label>
					<input
						className="input input-bordered w-full max-w-xs"
						type="text"
						{...register("email", {
							required: "Email Address is required",
						})}
					/>
					{errors.email && (
						<p className="text-red-600">{errors.email?.message}</p>
					)}
				</div>
				<div className="form-control w-full max-w-xs">
					<label className="label">
						<span className="label-text">Specialty</span>
					</label>
					<select
						{...register("specialty")}
						className="select input-bordered w-full max-w-xs">
						{specialties.map((specialty) => (
							<option key={specialty._id} value={specialty.name}>
								{specialty.name}
							</option>
						))}
					</select>
				</div>
				<div className="form-control w-full max-w-xs">
					<label className="label">
						<span className="label-text">Photo</span>
					</label>
					<input
						className="input input-bordered w-full max-w-xs"
						type="file"
						{...register("img", {
							required: "Photo is required",
						})}
					/>
					{errors.img && <p className="text-red-600">{errors.img?.message}</p>}
				</div>
				<input
					className="btn btn-accent w-full mt-3"
					value="Add Doctor"
					type="submit"
				/>
			</form>
		</div>
	);
};

export default AddDoctor;
