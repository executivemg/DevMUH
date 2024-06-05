"use client";

import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { PropagateLoader } from "react-spinners";
import axios from "../../axios";
import { ImageUpload, SelectField } from "@/components";

const defaultTheme = createTheme();

export default function SignUp() {
  const route = useRouter();
  const [states, setStates] = React.useState([]);
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    userType: "",
    dateOfBirth: "",
    country: 240,
    state: "",
    city: 1,
  });

  React.useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(`/global/states/240`);
        setStates(response.data.data.data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    })();
  }, []);

  const [session, setSession] = React.useState(true);
  React.useEffect(() => {
    if (localStorage.getItem("user") === null) {
      setSession(false);
    } else {
      setSession(true);
      route.push("/");
    }
  }, []);

  const [formErrors, setFormErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [profileImage, setProfileImage] = React.useState(null);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm(formData, profileImage);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      const objToSend = formatData(formData, profileImage);
      try {
        setLoading(true);
        const res = await axios.post("/register", objToSend);
        if (res?.data?.status === 200) {
          toast.success(res?.data?.message);
          localStorage.setItem("user", JSON.stringify(res?.data?.data?.user));
          route.push("/otp-verification");
        } else if (res?.data?.status === 400) {
          toast.error(res?.data?.error[Object.keys(res?.data?.error)[0]]);
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
    <div className="min-h-screen bg-white absolute w-screen">
      <Toaster />
      {!session && (
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
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      type="text"
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
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
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
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
                  <Grid item xs={12} sm={6}>
                    <ImageUpload
                      profileImage={profileImage}
                      setProfileImage={setProfileImage}
                      formErrors={formErrors}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <SelectField
                      label="Gender"
                      name="gender"
                      value={formData.gender}
                      options={[
                        { value: "", label: "Select a Gender" },
                        { value: "Male", label: "Male" },
                        { value: "Female", label: "Female" },
                      ]}
                      onChange={handleInputChange}
                      error={!!formErrors.gender}
                      helperText={formErrors.gender}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <SelectField
                      label="User Type"
                      name="userType"
                      value={formData.userType}
                      options={[
                        { value: "", label: "Select a Type" },
                        { value: "Buyer", label: "Buyer" },
                        { value: "Organizer", label: "Organizer" },
                      ]}
                      onChange={handleInputChange}
                      error={!!formErrors.userType}
                      helperText={formErrors.userType}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      name="dateOfBirth"
                      type="date"
                      id="dateOfBirth"
                      autoComplete="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      error={!!formErrors.dateOfBirth}
                      helperText={formErrors.dateOfBirth}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
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
                  <Grid item xs={12} sm={6}>
                    <SelectField
                      label="State"
                      name="state"
                      value={formData.state}
                      options={[
                        { value: "", label: "Select a State" },
                        ...states.map((state) => ({
                          value: state.id,
                          label: state.name,
                        })),
                      ]}
                      onChange={handleInputChange}
                      error={!!formErrors.state}
                      helperText={formErrors.state}
                    />
                  </Grid>
                </Grid>
                {loading ? (
                  <div className="h-[100vh] flex justify-center items-center">
                    <PropagateLoader
                      color="#2C3BFA"
                      cssOverride={{}}
                      loading
                      size={10}
                    />
                  </div>
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
                    Sign Up
                  </Button>
                )}
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login">
                      Already have an account?{" "}
                      <span className="text-[#2C3BFA] underline">Sign in</span>
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      )}
    </div>
  );
}

function validateForm(formData, profileImage) {
  const errors = {};

  if (!formData.firstName) {
    errors.firstName = "First Name is required";
  }

  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Email is not valid";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  }

  if (!formData.phone) {
    errors.phone = "Phone No. is required";
  }

  if (!formData.gender) {
    errors.gender = "Gender is required";
  }

  if (!formData.userType) {
    errors.userType = "User Type is required";
  }

  if (!formData.dateOfBirth) {
    errors.dateOfBirth = "Date of Birth is required";
  }

  if (!formData.state) {
    errors.state = "State is required";
  }

  if (!profileImage) {
    errors.profileImage = "Profile Image is required";
  }

  return errors;
}

function formatData(formData, profileImage) {
  const {
    firstName,
    lastName,
    email,
    password,
    phone,
    gender,
    userType,
    dateOfBirth,
    country,
    state,
    city,
  } = formData;

  return {
    first_name: firstName,
    last_name: lastName,
    email,
    password,
    phone,
    user_type: userType === "Organizer" ? 2 : "",
    gender: gender === "Male" ? 1 : 2,
    dob: dateOfBirth,
    source_image: profileImage,
    country_id: country,
    state_id: +state,
    city,
  };
}
