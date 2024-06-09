"use client"

import React, { useEffect, useState } from "react";
import { Container, Typography, Grid, Paper } from "@mui/material";
import axios from "../../axios";

const PastTicketsDashboard = () => {
    const [token, setToken] = useState("");
    // Dummy data for past bought tickets
    const [events, setEvents] = useState([
        {
            interestedInCustomDomain: 'hiphop',
            img: "/products/hiphop.png",
            eventTitle: "PISCES -VS-- AIRIES CLUB CONTINENTAL",
            eventVenue: "USA",
            dateOfEvent: new Date(),
            description: "Join us for an epic showdown between Pisces and Aries. Dance, music, and vibrant performances await. Don't miss out on this unforgettable night!",
            prices: {
                general: 100,
                vip: 200,
                student: 50
            },
        },
        {
            interestedInCustomDomain: 'event2',
            img: "https://avatars.mds.yandex.net/i?id=e30a0645abc09101273d76790a7c184e20a35f43-9846104-images-thumbs&n=13",
            eventTitle: "Event 2 Title",
            eventVenue: "USA",
            dateOfEvent: new Date(),
            description: "Experience the thrill of live music and dynamic performances. A night filled with excitement and entertainment. Perfect for music lovers and party enthusiasts.",
            prices: {
                general: 100,
                vip: 200,
                student: 50
            },
        },
        {
            interestedInCustomDomain: 'event3',
            img: "https://avatars.mds.yandex.net/i?id=4a8ed5accb777d3b6caafcf9243a185e-5023807-images-thumbs&n=13",
            eventTitle: "Event 3 Title",
            eventVenue: "USA",
            dateOfEvent: new Date(),
            description: "An evening of captivating performances and engaging activities. Join us for a night of fun and unforgettable memories. Suitable for all ages.",
            prices: {
                general: 100,
                vip: 200,
                student: 50
            },
        },
    ]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            let getToken = localStorage.getItem("token");
            if (!getToken) {
                throw new Error("Token not found");
            }
            console.log(getToken);
            setToken(getToken);
        }
    }, []);

    useEffect(() => {
        if (token) {
            (async () => {
                console.log(token);
                const res = await axios.get("/user-order/list", {
                    headers: {
                        Accept: "*/*",
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                })
                console.log(res?.data);
            })()
        }
    }, [token])

    return (
        <Container maxWidth="lg" sx={{ mt: 8 }}>
            <h4 className="bord text-transparent text-5xl font-bold">
                Past Bought Tickets
            </h4>
            <Grid container spacing={3}>
                {events.map((ticket, index) => (
                    <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                        <Paper
                            elevation={3}
                            sx={{
                                p: 2,
                                backgroundColor: "#333",
                                color: "#fff",
                                borderRadius: "8px",
                                height: "100%",
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                {ticket.eventName}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                Date: {ticket.date}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                Time: {ticket.time}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                Location: {ticket.location}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                Price: ${ticket.price}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default PastTicketsDashboard;
