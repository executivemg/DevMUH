"use client";

import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  Box,
  Typography,
  Container,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Header } from "@/components";
import { PropagateLoader } from "react-spinners";
import axios from "../../axios";
import { formatDate } from "date-fns";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

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
  typography: {
    h5: {
      color: "#ffffff",
    },
    h6: {
      color: "#ffffff",
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
});

const Events = () => {
  const [events, setEvents] = useState([])
  const [entries, setEntries] = useState(10);
  const [search, setSearch] = useState("");
  const route = useRouter();
  const [renderComponent, setRenderComponent] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    console.log(events, events?.length);
  }, [events])

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
        }
        const res = await axios.get("/my-event/list", {
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        })
        if (res?.data?.data !== undefined) {
          setEvents(res?.data?.data)
        }
      } catch (error) {
        console.log(error);
      }
    })()
  }, [renderComponent]);

  const dltEvent = async id => {
    /* try {
      setDeletingId(id);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }
      const res = await axios.delete(`/event-delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }
      })
      if (res.data.status === 200) {
        toast.success(res?.data?.message)
      } else {
        toast.error(res?.data?.message)
      }
      setRenderComponent(false)
    } catch (error) {
      console.log(error);
    } finally {
      setDeletingId(null);
    } */
  };

  const editEvent = async id => {
    try {
      route.push(`/editevent/${id}`)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <Toaster />
      <Header navigate event />
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ paddingTop: 18, paddingBottom: 2 }}>
          {/* Header */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            my={4}
          >
            <Typography variant="h5">Events</Typography>
            <Button variant="contained" color="primary">
              Dashboard/Lists
            </Button>
          </Box>

          {/* Event List Section */}
          <Box boxShadow={3} p={3} mb={4}>
            <Typography variant="h6">Event List</Typography>
            <Box borderBottom={1} borderColor="grey.800" my={1} />

            {/* Show Entries and Search */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              my={2}
            >
              <Box display="flex" alignItems="center">
                <Typography className="text-white">Show</Typography>
                <FormControl variant="outlined" size="small" sx={{ mx: 2 }}>
                  <Select
                    value={entries}
                    onChange={(e) => setEntries(e.target.value)}
                    sx={{ color: "#fff" }}
                  >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                  </Select>
                </FormControl>
                <Typography className="text-white">Entries</Typography>
              </Box>
              <TextField
                variant="outlined"
                size="small"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{ style: { color: "#fff" } }}
                InputLabelProps={{ style: { color: "#fff" } }}
              />
            </Box>

            {/* Event Table */}
            <TableContainer component={Paper} className="overflow-x-auto tableCont">
              {/* {events?.length > 1 ? ( */}
              <Table className="min-w-[650px] w-full border-collapse">
                <TableHead>
                  <TableRow>
                    <TableCell>Actions</TableCell>
                    <TableCell className="min-w-[120px]">Event Image</TableCell>
                    <TableCell className="min-w-[120px]">Event Name</TableCell>
                    <TableCell className="min-w-[120px]">Ticket Price</TableCell>
                    <TableCell className="min-w-[130px]">Ticket Quantity</TableCell>
                    <TableCell className="min-w-[190px]">Full Address</TableCell>
                    <TableCell className="min-w-[120px]">Created At</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {events?.length >= 1 && events?.map(event => (
                    <TableRow key={event?.id}>
                      <TableCell>
                        <IconButton

                          color="primary"
                          onClick={() => editEvent(event?.id)}
                        >
                          <Edit />
                        </IconButton>
                        {/* {deletingId === event?.id ? (
                          <PropagateLoader color="#ffffff" size={10} />
                        ) : (
                          <IconButton

                            color="secondary"
                            onClick={() => dltEvent(event?.id)}
                          >
                            <Delete />
                          </IconButton>
                        )} */}
                      </TableCell>
                      <TableCell>
                        <img className="rounded w-[80%] object-cover h-14" src={event?.event_images[0]?.image_url} />
                      </TableCell>
                      <TableCell>
                        {event?.name}
                      </TableCell>
                      <TableCell>
                        {event?.ticket_price}
                      </TableCell>
                      <TableCell>
                        {event?.ticket_qty}
                      </TableCell>
                      <TableCell>
                        {event?.full_address}
                      </TableCell>
                      <TableCell>
                        {formatDate(event?.created_at, "MM/dd/yyyy")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {events?.length === 0 && <h1 className="sm:text-5xl text-4xl text-transparent bord font-bold mt-8 text-center">{"You've"} not Published any Events {"yet!"}</h1>}
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Events;
