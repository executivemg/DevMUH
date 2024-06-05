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
  Link,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { PropagateLoader } from "react-spinners";
import axios from "../../axios";
import userInfo from "@/ReusableFunctions/geUser";

const defaultTheme = createTheme();

export default function OtpVerification() {
  const route = useRouter();
  const [formData, setFormData] = React.useState({
    otp: "",
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
        const res = await axios.post(
          "/register/verify/email/code",
          formatData(formData, userInfo()?.personal?.email)
        );
        if (res?.data?.status === 200) {
          if (userInfo()?.personal?.user_type == 1) {
            toast.success(res?.data?.message);
            route.push("/organizer");
            return;
          }
          toast.success(res?.data?.message + " " + "Please Login To Continue");
          route.push("/login");
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

  const resendOtp = async () => {
    setLoading(true)
    try {
      const res = await axios.post("/register/resend/code", {
        email: userInfo()?.personal?.email,
      });
      toast.success(res?.data?.message)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast.error(error)
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-white w-screen">
      <Toaster />
      <ThemeProvider theme={defaultTheme}>
        <Container className="shadow-sm" component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              paddingTop: 15,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#2C3BFA" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              OTP Verification
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
                id="otp"
                label="Enter OTP"
                type="text"
                name="otp"
                autoComplete="one-time-code"
                value={formData.otp}
                onChange={handleInputChange}
                error={!!formErrors.otp}
                helperText={formErrors.otp}
                sx={{ mb: 2 }}
              />
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
                  Verify OTP
                </Button>
              )}
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <div>
                    {"Didn't"} receive an OTP?
                    <span
                      onClick={resendOtp}
                      className="text-[#2C3BFA] underline cursor-pointer"
                    >
                      Resend OTP
                    </span>
                  </div>
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

  if (!formData.otp) {
    errors.otp = "OTP is required";
  }

  return errors;
}

function formatData(formData, email) {
  const { otp } = formData;

  return {
    verify_code: otp,
    email,
  };
}
