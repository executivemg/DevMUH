"use client";

import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { PropagateLoader } from "react-spinners";
import axios from "../../axios";

const defaultTheme = createTheme();

export default function Login() {
  const route = useRouter();
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        setLoading(true);
        const res = await axios.post("/login", formatData(formData, 1));
        if (res?.data?.status === 200) {
          toast.success(res?.data?.message);
          localStorage.setItem("user", JSON.stringify(res?.data?.data?.user));
          localStorage.setItem("token", res?.data?.data?.token);
          if (res?.data?.data?.user?.personal.user_type == "1") {
            route.push("/organizer");
            return;
          } else if (res?.data?.data?.user?.personal.user_type == "2") {
            route.push("/");
            return;
          }
        } else if (res?.data?.status === 400) {
          console.log(res?.data);
          toast.error(res?.data?.message);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error?.data?.message);
        console.log(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white absolute w-screen flex justify-center items-center">
      <Toaster />
      <ThemeProvider theme={defaultTheme}>
        <Container className="shadow-sm" component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#2C3BFA" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                type="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!formErrors.email}
                helperText={formErrors.email}
                sx={{ mb: 2 }}
                autoFocus
              />
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
              {loading ? (
                <PropagateLoader
                  color="#2C3BFA"
                  cssOverride={{}}
                  loading
                  size={10}
                />
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    mb: 2,
                    py: 2,
                    borderRadius: 2,
                    backgroundColor: "#2C3BFA",
                  }}
                >
                  Sign In
                </Button>
              )}
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/signup">
                    {"Don't"} have an account?
                    <span className="text-[#2C3BFA] underline">Sign up</span>
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

function validateForm(formData) {
  const errors = {};

  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Email is not valid";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  }

  return errors;
}

function formatData(formData, id) {
  const { email, password } = formData;

  return {
    email,
    password,
    device_id: id,
    fcm_token: "1",
  };
}
