"use client";

import * as React from "react";
import {
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Container,
  InputAdornment,
  TextareaAutosize,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import toast, { Toaster } from "react-hot-toast";
import { PropagateLoader } from "react-spinners";
import axios from "../../axios";
import { Close, CloudUploadOutlined } from "@mui/icons-material";
import userInfo from "@/ReusableFunctions/geUser";
import { useRouter } from "next/navigation";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2C3BFA",
    },
    secondary: {
      main: "#B10C61",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
        },
      },
    },
  },
  typography: {
    h5: {
      color: "#ffffff",
    },
    h6: {
      color: "#ffffff",
    },
  },
});

export default function AddEvent() {
  const [formData, setFormData] = React.useState({
    eventName: "",
    ticketPrice: "",
    ticketQuantity: "",
    contactPhone: "",
    contactEmail: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    description: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    location: "",
    latitude: "",
    longitude: "",
    domain: "",
    floorplan: "no",
  });

  const [name, setName] = React.useState("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const user = userInfo();
      if (user && user.personal) {
        const { first_name } = user.personal;
        setName(`${first_name || ""}`);
      }
    }
  }, []);

  const [formErrors, setFormErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [eventImages, setEventImages] = React.useState([]);
  const [imagePreviews, setImagePreviews] = React.useState([]);

  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    handleInputChange({ target: { name, value } });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let newFormData = { ...formData, [name]: value };

    if (name === "eventName") {
      const formattedDomain = value.replace(/\s+/g, "-").toLowerCase();
      newFormData = { ...newFormData, domain: formattedDomain };
    }

    setFormData(newFormData);
  };

  const handleKeyPress = (event) => {
    const charCode = event.charCode;
    if (!/^[a-zA-Z\s]*$/.test(String.fromCharCode(charCode))) {
      event.preventDefault();
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split("base64,")[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = (files) => {
    if (eventImages.length + files.length > 3) {
      toast.error("You can't upload more than three images.");
      return;
    }

    const fileArray = Array.from(files);
    const previews = fileArray.map((file) => URL.createObjectURL(file));
    const base64Promises = fileArray.map((file) => convertToBase64(file));

    Promise.all(base64Promises).then((base64Strings) => {
      setEventImages((prevImages) => [...prevImages, ...base64Strings]);
      setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
    });
  };

  const handleRemoveImage = (index) => {
    setEventImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, i) => i !== index)
    );
  };

  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm(formData, eventImages);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      if (JSON.parse(localStorage.getItem("user")) === null) {
        toast.error("Login to upload Events");
        router.push("/login");
        return;
      }

      const objToSend = {
        name: formData?.eventName,
        start_date: new Date(formData?.startDate),
        end_date: new Date(formData?.endDate),
        start_time: formData?.startTime,
        end_time: formData?.endTime,
        ticket_qty: +formData?.ticketQuantity,
        ticket_price: +formData?.ticketPrice,
        description: formData?.description,
        for_contact_phone: formData?.contactPhone,
        for_contact_email: formData?.contactEmail,
        source_image: eventImages,
        location: formData?.location,
        full_address:
          formData?.address +
          ", " +
          formData?.city +
          ", " +
          formData?.state +
          ", " +
          formData?.zipCode,
        lat: 41.8527,
        lng: 87.6158,
        is_floor:
          formData?.floorplan === "no" ? 0 : formData?.floorplan === "yes" && 1,
        domain_url: formData?.domain,
      };
      try {
        setLoading(true);
        console.log(objToSend);
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
        }
        const res = await axios.post("/store/event", objToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log(res?.data);
        if (res?.data?.status === 200) {
          toast.success(res?.data?.message);
        } else if (res?.data?.status === 400) {
          toast.error(res?.data?.error?.name);
        }
        setFormData({
          eventName: "",
          ticketPrice: "",
          ticketQuantity: "",
          contactPhone: "",
          contactEmail: "",
          startDate: "",
          endDate: "",
          startTime: "",
          endTime: "",
          description: "",
          address: "",
          city: "",
          state: "",
          zipCode: "",
          location: "",
          latitude: "",
          longitude: "",
          floorplan: "no",
          domain: "",
        });
        setEventImages([]);
        setImagePreviews([null, null, null]);
      } catch (error) {
        toast.error(error?.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 absolute w-screen">
      <Toaster />
      <ThemeProvider theme={darkTheme}>
        <Container className="shadow-sm" component="main" maxWidth="lg">
          <CssBaseline />
          <Box
            sx={{
              marginY: 16,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1 className="text-white w-full text-left text-3xl mb-4">
              Hello {name}! Start Uploading Events
            </h1>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={6}>
                {/* First Column */}
                <Grid item xs={12} md={6}>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleImageUpload(e.target.files)}
                        style={{ display: "none" }}
                        id="image-upload"
                      />
                      <label htmlFor="image-upload">
                        <Button
                          variant="outlined"
                          component="span"
                          fullWidth
                          className={`text-white border-white h-20 flex gap-4 items-center ${
                            formErrors.eventImages && "border-[#f44336]"
                          }`}
                        >
                          <CloudUploadOutlined /> Upload Event Images
                        </Button>
                      </label>
                      {formErrors.eventImages && (
                        <p className="text-[#f44336] text-xs ml-4 font-semibold mt-1">
                          {formErrors.eventImages}
                        </p>
                      )}
                    </Grid>
                    {imagePreviews.length >= 1 && (
                      <Grid item xs={12} style={{ marginTop: "-20px" }}>
                        <Grid container spacing={3}>
                          {imagePreviews.map((preview, index) => (
                            <Grid item xs={4} key={index}>
                              {preview && (
                                <div className="relative">
                                  <img
                                    src={preview}
                                    alt={`Event ${index + 1}`}
                                    className="w-full h-20 object-cover rounded-xl"
                                  />
                                  <Close
                                    className="absolute -top-1 -right-1 cursor-pointer bg-black text-red-500 rounded-full"
                                    onClick={() => handleRemoveImage(index)}
                                  />
                                </div>
                              )}
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>
                    )}
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="eventName"
                        label="Ticket Name"
                        name="eventName"
                        type="text"
                        value={formData.eventName}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        error={!!formErrors.eventName}
                        helperText={formErrors.eventName}
                        InputLabelProps={{ style: { color: "#fff" } }}
                        InputProps={{ style: { color: "#fff" } }}
                      />
                      <p className="text-sm text-yellow-500">
                        <span className="text-red-500 font-semibold">
                          Note:
                        </span>{" "}
                        Ticket Name can only contain alphabets
                      </p>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="domain"
                        label="Custom Event Domain Name (No Spaces)"
                        name="domain"
                        type="text"
                        value={formData.domain}
                        onChange={handleInputChange}
                        error={!!formErrors.domain}
                        helperText={formErrors.domain}
                        InputLabelProps={{ style: { color: "#fff" } }}
                        InputProps={{
                          readOnly: true,
                          startAdornment: (
                            <InputAdornment position="start">
                              https://eventrush.vip/
                            </InputAdornment>
                          ),
                          style: { color: "#fff" },
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <TextField
                            required
                            fullWidth
                            id="ticketPrice"
                            label="Ticket Price"
                            name="ticketPrice"
                            type="number"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  $
                                </InputAdornment>
                              ),
                              style: { color: "#fff" },
                            }}
                            InputLabelProps={{ style: { color: "#fff" } }}
                            value={formData.ticketPrice}
                            onChange={handleInputChange}
                            error={!!formErrors.ticketPrice}
                            helperText={formErrors.ticketPrice}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            required
                            fullWidth
                            id="ticketQuantity"
                            label="Ticket Quantity"
                            name="ticketQuantity"
                            type="number"
                            value={formData.ticketQuantity}
                            onChange={handleInputChange}
                            error={!!formErrors.ticketQuantity}
                            helperText={formErrors.ticketQuantity}
                            InputLabelProps={{ style: { color: "#fff" } }}
                            InputProps={{ style: { color: "#fff" } }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <TextField
                            required
                            fullWidth
                            id="startDate"
                            label="Start Date"
                            name="startDate"
                            type="date"
                            InputLabelProps={{
                              shrink: true,
                              style: { color: "#fff" },
                            }}
                            InputProps={{ style: { color: "#fff" } }}
                            value={formData.startDate}
                            onChange={handleInputChange}
                            error={!!formErrors.startDate}
                            helperText={formErrors.startDate}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            required
                            fullWidth
                            id="endDate"
                            label="End Date"
                            name="endDate"
                            type="date"
                            InputLabelProps={{
                              shrink: true,
                              style: { color: "#fff" },
                            }}
                            InputProps={{ style: { color: "#fff" } }}
                            value={formData.endDate}
                            onChange={handleInputChange}
                            error={!!formErrors.endDate}
                            helperText={formErrors.endDate}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: "-20px" }}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <TextField
                            required
                            fullWidth
                            id="startTime"
                            label="Start Time"
                            name="startTime"
                            type="time"
                            InputLabelProps={{ style: { color: "#fff" } }}
                            InputProps={{ style: { color: "#fff" } }}
                            value={formData.startTime}
                            onChange={handleInputChange}
                            error={!!formErrors.startTime}
                            helperText={formErrors.startTime}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            required
                            fullWidth
                            id="endTime"
                            label="End Time"
                            name="endTime"
                            type="time"
                            InputLabelProps={{ style: { color: "#fff" } }}
                            InputProps={{ style: { color: "#fff" } }}
                            value={formData.endTime}
                            onChange={handleInputChange}
                            error={!!formErrors.endTime}
                            helperText={formErrors.endTime}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <TextareaAutosize
                        required
                        id="description"
                        label="Event Description"
                        name="description"
                        placeholder="Ticket Description"
                        minRows={8}
                        style={{
                          width: "100%",
                          color: "#fff",
                          backgroundColor: "#333",
                          borderRadius: "8px",
                          padding: "12px",
                        }}
                        value={formData.description}
                        onChange={handleInputChange}
                        className={
                          formErrors.description && "border-[#f44336] border-2"
                        }
                      />
                      {formErrors.description && (
                        <p className="text-[#f44336] text-xs ml-4 font-semibold">
                          {formErrors.description}
                        </p>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                {/* Second Column */}
                <Grid item xs={12} md={6}>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <TextField
                            required
                            fullWidth
                            id="contactPhone"
                            label="Organizer's Phone"
                            name="contactPhone"
                            type="tel"
                            value={formData.contactPhone}
                            onChange={handleInputChange}
                            error={!!formErrors.contactPhone}
                            helperText={formErrors.contactPhone}
                            InputLabelProps={{ style: { color: "#fff" } }}
                            InputProps={{ style: { color: "#fff" } }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            required
                            fullWidth
                            id="contactEmail"
                            label="Organizer's Email"
                            name="contactEmail"
                            type="email"
                            value={formData.contactEmail}
                            onChange={handleInputChange}
                            error={!!formErrors.contactEmail}
                            helperText={formErrors.contactEmail}
                            InputLabelProps={{ style: { color: "#fff" } }}
                            InputProps={{ style: { color: "#fff" } }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="location"
                        label="Venue Name"
                        name="location"
                        type="text"
                        value={formData.location}
                        onChange={handleInputChange}
                        error={!!formErrors.location}
                        helperText={formErrors.location}
                        InputLabelProps={{ style: { color: "#fff" } }}
                        InputProps={{ style: { color: "#fff" } }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="address"
                        label="Address"
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={handleInputChange}
                        error={!!formErrors.address}
                        helperText={formErrors.address}
                        InputLabelProps={{ style: { color: "#fff" } }}
                        InputProps={{ style: { color: "#fff" } }}
                      />
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: "-20px" }}>
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <TextField
                            required
                            fullWidth
                            id="city"
                            label="City"
                            name="city"
                            type="text"
                            value={formData.city}
                            onChange={handleInputChange}
                            error={!!formErrors.city}
                            helperText={formErrors.city}
                            InputLabelProps={{ style: { color: "#fff" } }}
                            InputProps={{ style: { color: "#fff" } }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            required
                            fullWidth
                            id="state"
                            label="State"
                            name="state"
                            type="text"
                            value={formData.state}
                            onChange={handleInputChange}
                            error={!!formErrors.state}
                            helperText={formErrors.state}
                            InputLabelProps={{ style: { color: "#fff" } }}
                            InputProps={{ style: { color: "#fff" } }}
                          />
                        </Grid>
                        <Grid item xs={4}>
                          <TextField
                            required
                            fullWidth
                            id="zipCode"
                            label="Zip Code"
                            name="zipCode"
                            type="text"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            error={!!formErrors.zipCode}
                            helperText={formErrors.zipCode}
                            InputLabelProps={{ style: { color: "#fff" } }}
                            InputProps={{ style: { color: "#fff" } }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend" style={{ color: "#fff" }}>
                          DOES YOUR VENUE HAVE A FLOORPLAN / ASSIGNED SEATING
                        </FormLabel>
                        <RadioGroup
                          aria-label="floorplan"
                          name="floorplan"
                          value={formData.floorplan}
                          onChange={handleRadioChange}
                          row
                        >
                          <FormControlLabel
                            value="yes"
                            control={<Radio />}
                            label="Yes"
                            style={{ color: "#fff" }}
                          />
                          <FormControlLabel
                            value="no"
                            control={<Radio />}
                            label="No"
                            style={{ color: "#fff" }}
                          />
                        </RadioGroup>
                      </FormControl>
                      <p className="text-sm text-yellow-500">
                        <span className="text-red-500 font-semibold">
                          Note:
                        </span>{" "}
                        If yes, then a seating application will launch
                      </p>
                    </Grid>
                    <Grid item xs={12}>
                      <img
                        src="/formImg.png"
                        className="object-cover w-full h-[235px] rounded-xl"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    style={{
                      background: "linear-gradient(to right, #2C3BFA, #B10C61)",
                      color: "#fff",
                      borderRadius: "8px",
                      textTransform: "none",
                      display: loading ? "none" : "block",
                    }}
                  >
                    {loading ? (
                      <PropagateLoader color="#ffffff" />
                    ) : (
                      "Publish Event"
                    )}
                  </Button>
                  {loading && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 16,
                      }}
                    >
                      <PropagateLoader color="#ffffff" />
                    </div>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

function validateForm(formData, eventImages) {
  const errors = {};

  if (eventImages.length === 0) {
    errors.eventImages = "At least one event image is required";
  }
  if (!formData.location) {
    errors.location = "Location is required";
  }
  if (!formData.ticketPrice) {
    errors.ticketPrice = "Price is required";
  }
  if (!formData.ticketQuantity) {
    errors.ticketQuantity = "Quantity is required";
  }
  if (!formData.eventName) {
    errors.eventName = "Event Name is required";
  }
  if (!formData.contactPhone) {
    errors.contactPhone = "Contact Phone is required";
  }
  if (!formData.contactEmail) {
    errors.contactEmail = "Contact Email is required";
  }
  if (!formData.startDate) {
    errors.startDate = "Start Date is required";
  }
  if (!formData.endDate) {
    errors.endDate = "End Date is required";
  }
  if (!formData.startTime) {
    errors.startTime = "Start Time is required";
  }
  if (!formData.endTime) {
    errors.endTime = "End Time is required";
  }
  if (!formData.description) {
    errors.description = "Description is required";
  }
  if (!formData.address) {
    errors.address = "Address is required";
  }
  if (!formData.city) {
    errors.city = "City is required";
  }
  if (!formData.state) {
    errors.state = "State is required";
  }
  if (!formData.zipCode) {
    errors.zipCode = "Zip Code is required";
  }
  return errors;
}
