import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../../layout/DashboardLayout/DashboardLayout";
import Main from "../../layout/Main/Main";
import Appointment from "../../pages/Appointment/Appointment/Appointment";
import AddDoctor from "../../pages/Dashboard/AddDoctor/AddDoctor";
import AllUsers from "../../pages/Dashboard/AllUsers/AllUsers";
import Payment from "../../pages/Dashboard/Dashboard/Payment/Payment";
import ManageDoctors from "../../pages/Dashboard/ManageDoctors/ManageDoctors";
import MyAppointment from "../../pages/Dashboard/MyAppointment/MyAppointment";
import Home from "../../pages/Home/Home/Home";
import Login from "../../pages/Login/Login";
import DisplayError from "../../pages/Shared/DisplayError/DisplayError";
import SignUp from "../../pages/SignUp/SignUp";
import AdminRoute from "../AdminRoute/AdminRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Main></Main>,
		errorElement: <DisplayError />,
		children: [
			{
				path: "/",
				element: <Home></Home>,
			},
			{
				path: "/login",
				element: <Login></Login>,
			},
			{
				path: "/signup",
				element: <SignUp></SignUp>,
			},
			{
				path: "/appointment",
				element: <Appointment></Appointment>,
			},
		],
	},
	{
		path: "/dashboard",
		element: (
			<PrivateRoute>
				<DashboardLayout></DashboardLayout>
			</PrivateRoute>
		),
		errorElement: <DisplayError />,
		children: [
			{
				path: "/dashboard",
				element: <MyAppointment></MyAppointment>,
			},
			{
				path: "/dashboard/allusers",
				element: (
					<AdminRoute>
						<AllUsers></AllUsers>
					</AdminRoute>
				),
			},
			{
				path: "/dashboard/adddoctor",
				element: (
					<AdminRoute>
						<AddDoctor></AddDoctor>
					</AdminRoute>
				),
			},
			{
				path: "/dashboard/managedoctors",
				element: (
					<AdminRoute>
						<ManageDoctors />
					</AdminRoute>
				),
			},
			{
				path: "/dashboard/payment/:id",
				element: (
					
						<Payment></Payment>
					
				),
				loader: ({ params }) =>
					fetch(`https://doctors-protal-server.vercel.app/bookings/${params.id}`),
			},
		],
	},
]);