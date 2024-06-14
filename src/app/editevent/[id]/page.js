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
import axios from "../../../axios";
import { Close, CloudUploadOutlined } from "@mui/icons-material";
import { formatDate } from "date-fns";
import { useRouter } from "next/navigation";
import { Header } from "@/components";

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

function parseAddress(addressString) {
    const parts = addressString.split(", ");
    return {
        address: parts[0],
        city: parts[1],
        state: parts[2],
        zipCode: parts[3]
    };
}

export default function Page({ params }) {
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

    const [eventImagesApi, setEventImagesApi] = React.useState([]);
    const [uploadedImages, setUploadedImages] = React.useState([]);
    const [combinedImages, setCombinedImages] = React.useState([]);
    const [imagesToDelete, setImagesToDelete] = React.useState([])

    React.useEffect(() => {
        (async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("Token not found");
                }
                const res = await axios.get(`/event/${params.id}`, {
                    headers: {
                        Accept: "*/*",
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                })
                const { for_contact_phone, description, end_date, end_time, for_contact_email, full_address, is_floor, lat, lng, location, name, start_date, start_time, ticket_price, ticket_qty } = res?.data?.data
                const fullAddress = parseAddress(full_address)
                setFormData(prevState => ({
                    ...prevState,
                    contactPhone: for_contact_phone,
                    description,
                    endDate: formatDate(end_date, "yyyy-MM-dd"),
                    endTime: end_time,
                    contactEmail: for_contact_email,
                    floorplan: is_floor === 0 ? "no" : "yes",
                    latitude: lat,
                    location,
                    longitude: lng,
                    eventName: name,
                    startDate: formatDate(start_date, "yyyy-MM-dd"),
                    startTime: start_time,
                    ticketPrice: ticket_price,
                    ticketQuantity: ticket_qty,
                    address: fullAddress?.address,
                    city: fullAddress?.city,
                    state: fullAddress?.state,
                    zipCode: fullAddress?.zipCode
                }))
                setEventImagesApi(res?.data?.data?.event_images)

            } catch (error) {
                console.log(error);
            }
        })()
    }, [params.id])

    const [formErrors, setFormErrors] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const route = useRouter()

    const handleRadioChange = event => {
        const { name, value } = event.target;
        handleInputChange({ target: { name, value } });
    };

    const handleInputChange = event => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const convertToBase64 = file => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                const base64String = reader.result.split("base64,")[1];
                resolve(base64String);
            };
            reader.onerror = (error) => reject(error);
        });
    };

    const handleImageUpload = files => {
        if (uploadedImages.length + files.length > 3) {
            toast.error("You can't upload more than three images.");
            return;
        }

        const fileArray = Array.from(files);
        const base64Promises = fileArray.map((file) => convertToBase64(file));

        Promise.all(base64Promises).then((base64Strings) => {
            const newImages = base64Strings.map((base64, index) => ({
                base64,
                preview: URL.createObjectURL(files[index]), // Set the preview here
                name: files[index].name,
                isNew: true
            }));
            setUploadedImages((prevImages) => [...prevImages, ...newImages]);
            setCombinedImages((prevImages) => [...prevImages, ...newImages.map(image => image.base64)]);
        });
    };

    const handleRemoveImage = (index, isNew) => {
        if (isNew) {
            setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
        } else {
            const imageToDelete = eventImagesApi[index];
            setImagesToDelete((prev) => [...prev, imageToDelete]);
            setEventImagesApi((prevImages) => prevImages.filter((_, i) => i !== index));
            setCombinedImages((prevImages) => [...prevImages, imageToDelete.source_image]);
        }
    };

    const handleSubmit = async event => {
        event.preventDefault();
        const errors = validateForm(formData);
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
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
                location: formData?.location,
                source_image: combinedImages,
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
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("Token not found");
                }
                const res = await axios.post(`/update/event/${params?.id}`, objToSend, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "*/*",
                        "Content-Type": "application/json",
                    },
                });
                if (res?.data?.status === 200) {
                    toast.success("Event updated successfully");
                    route.push('/events')
                } else if (res?.data?.status === 400) {
                    console.log(res?.data);
                    toast.error(res?.data?.message);
                }
                setLoading(false);
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
                setEventImagesApi([]);
                setImagePreviews([null, null, null]);
            } catch (error) {
                setLoading(false);
                toast.error(error?.data?.message);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 absolute w-screen">
            <Toaster />
            <Header navigate event={false} />
            <ThemeProvider theme={darkTheme}>
                <Container className="shadow-sm" component="main" maxWidth="lg">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 20,
                            marginBottom: 8,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
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
                                                    className={`text-white border-white h-20 flex gap-4 items-center ${formErrors.eventImages && "border-[#f44336]"
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
                                        {uploadedImages.length >= 1 && (
                                            <Grid item xs={12} style={{ marginTop: "-20px" }}>
                                                <h1 className="text-white font-bold text-3xl">Upload Images</h1>
                                                <Grid container spacing={3}>
                                                    {uploadedImages.map((image, index) => (
                                                        <Grid item xs={4} key={index}>
                                                            <div className="relative">
                                                                <img
                                                                    src={image.preview}
                                                                    alt={`Event ${index + 1}`}
                                                                    className="w-full h-20 object-cover rounded-xl"
                                                                />
                                                                <Close
                                                                    className="absolute -top-1 -right-3 cursor-pointer bg-white text-red-500 rounded-full"
                                                                    onClick={() => handleRemoveImage(index, true)}
                                                                />
                                                            </div>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </Grid>
                                        )}
                                        {eventImagesApi.length >= 1 && (
                                            <Grid item xs={12} style={{ marginTop: "-20px" }}>
                                                <h1 className="text-white font-bold text-3xl">Update Images</h1>
                                                <Grid container spacing={3}>
                                                    {eventImagesApi.map((preview, index) => (
                                                        <Grid item xs={4} key={index}>
                                                            {preview && (
                                                                <div className="relative">
                                                                    <img
                                                                        src={preview.image_url}
                                                                        alt={`Event ${index + 1}`}
                                                                        className="w-full h-20 object-cover rounded-xl"
                                                                    />
                                                                    <Close
                                                                        className="absolute -top-1 -right-3 cursor-pointer bg-white text-red-500 rounded-full"
                                                                        onClick={() => handleRemoveImage(index, false)}
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
                                                label="Event Title"
                                                name="eventName"
                                                type="text"
                                                value={formData.eventName}
                                                onChange={handleInputChange}
                                                error={!!formErrors.eventName}
                                                helperText={formErrors.eventName}
                                                InputLabelProps={{ style: { color: "#fff" } }}
                                                InputProps={{ style: { color: "#fff" } }}
                                            />
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
                                                    // defaultValue={"2024-12-12"}
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
                                                placeholder="Enter Event Description"
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
                                            "Update Event"
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

function validateForm(formData) {
    const errors = {};
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
