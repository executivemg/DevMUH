"use client"

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from 'next/link';
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { PropagateLoader } from 'react-spinners';

const defaultTheme = createTheme();

export default function SignUp() {
	const route = useRouter();
	const [formData, setFormData] = React.useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		phone: '',
	});
	const [formErrors, setFormErrors] = React.useState({});
	const [loading, setLoading] = React.useState(false)

	const handleInputChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const errors = {};

		if (!formData.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
			errors.email = "Invalid email format";
		}

		Object.keys(formData).forEach((key) => {
			if (!formData[key].trim()) {
				errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
			}
		});

		setFormErrors(errors);

		if (Object.keys(errors).length === 0) {
			const { firstName, lastName, email, password, phone } = formData
			const objToSend = {
				name: firstName + " " + lastName,
				email,
				password,
				phone
			}
			const url = "/api/signup";
			try {
				setLoading(true)
				const response = await axios.post(url, objToSend);
				setLoading(false)
				if (response.status === 200) {
					toast.success("account created successfully!");
					route.push("/login");
				}
			} catch (error) {
				setLoading(false)
				if (error.response) {
					toast.error(error.response.data.message);
				} else if (error.request) {
					console.log(error.request);
				} else {
					console.log("Error", error.message);
				}
				console.log(error.config);
			}
		}
	};

	return (
		<div className='min-h-screen bg-white absolute w-screen'>
			<Toaster />
			<ThemeProvider theme={defaultTheme}>
				<Container className='shadow-sm' component="main" maxWidth="xs">
					<CssBaseline />
					<Box
						sx={{
							marginTop: 8,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Avatar sx={{ m: 1, bgcolor: '#2C3BFA' }}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Sign up
						</Typography>
						<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={6}>
									<TextField
										autoComplete="given-name"
										name="firstName"
										type='text'
										required
										fullWidth
										id="firstName"
										label="First Name"
										autoFocus
										value={formData.firstName}
										onChange={handleInputChange}
										error={!!formErrors.firstName}
										helperText={formErrors.firstName}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										required
										fullWidth
										id="lastName"
										label="Last Name"
										name="lastName"
										type='text'
										autoComplete="family-name"
										value={formData.lastName}
										onChange={handleInputChange}
										error={!!formErrors.lastName}
										helperText={formErrors.lastName}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										id="email"
										label="Email Address"
										type='email'
										name="email"
										autoComplete="email"
										value={formData.email}
										onChange={handleInputChange}
										error={!!formErrors.email}
										helperText={formErrors.email}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										name="password"
										label="Password"
										type="password"
										id="password"
										autoComplete="new-password"
										value={formData.password}
										onChange={handleInputChange}
										error={!!formErrors.password}
										helperText={formErrors.password}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										name="phone"
										label="Phone No."
										type="tel"
										id="phone"
										autoComplete="phone"
										value={formData.phone}
										onChange={handleInputChange}
										error={!!formErrors.phone}
										helperText={formErrors.phone}
									/>
								</Grid>
							</Grid>
							{loading ? <div className="h-[100vh] flex justify-center items-center">
								<PropagateLoader color="#2C3BFA" cssOverride={{}} loading size={10} />
							</div> : <Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2, py: 2, borderRadius: 2, backgroundColor: "#2C3BFA" }}
							>
								Sign Up
							</Button>}
							<Grid container justifyContent="flex-end">
								<Grid item>
									<Link href="/login">
										Already have an account? <span className='text-[#2C3BFA] underline'>Sign in</span>
									</Link>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</Container>
			</ThemeProvider>
		</div>
	);
}