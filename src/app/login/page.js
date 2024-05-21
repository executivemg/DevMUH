"use client";

import * as React from 'react';
import { signIn } from "next-auth/react";
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
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { PropagateLoader } from 'react-spinners';

const defaultTheme = createTheme();

export default function Login() {
	const route = useRouter()
	const [loading, setLoading] = React.useState(false)
	const [formData, setFormData] = React.useState({
		email: '',
		password: '',
	});
	const [formErrors, setFormErrors] = React.useState({});

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
		if (!formData.password.trim()) {
			errors.password = "Password is required";
		}

		setFormErrors(errors);

		if (Object.keys(errors).length === 0) {
			const { email, password } = formData
			try {
				setLoading(true)
				const result = await signIn("credentials", {
					email,
					password,
					redirect: false,
				});
				setLoading(false)
				if (result.status === 200) {
					toast.success("logged In successfully!");
					route.push("/")
				}
			} catch (error) {
				setLoading(false)
				console.log(error.message);
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
							Sign In
						</Typography>
						<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										id="email"
										label="Email Address"
										type='email'
										name="email"
										autoComplete="email"
										autoFocus
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
										autoComplete="current-password"
										value={formData.password}
										onChange={handleInputChange}
										error={!!formErrors.password}
										helperText={formErrors.password}
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
								Sign In
							</Button>}
							<Grid container justifyContent="flex-end">
								<Grid item>
									<Link href="/signup">
									{`Don't`} have an account? <span className='text-[#2C3BFA] underline'>Sign up</span>
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