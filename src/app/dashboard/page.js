"use client";

import React, { useEffect, useState } from "react";
import { Container, Select, MenuItem, FormControl, InputLabel, ThemeProvider, createTheme } from "@mui/material";
import axios from "../../axios";
import { Header, TransitionsModal } from "@/components";
import { format } from "date-fns";
import { Mail, Phone } from "@mui/icons-material";
import { PropagateLoader } from "react-spinners";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#2C3BFA',
        },
        background: {
            paper: '#424242',
            default: '#303030',
        },
        text: {
            primary: '#fff',
            secondary: '#aaa',
        },
    },
});

const PastTicketsDashboard = () => {
    const [token, setToken] = useState("");
    const [orders, setOrders] = useState([]);
    const [eventImages, setEventImages] = useState({});
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)

    useEffect(() => {
        if (typeof window !== "undefined") {
            let getToken = localStorage.getItem("token");
            if (!getToken) {
                throw new Error("Token not found");
            }
            setToken(getToken);
        }
    }, []);

    useEffect(() => {
        if (token) {
            (async () => {
                setLoading(true)
                try {
                    const res = await axios.get("/user-order/list", {
                        headers: {
                            Accept: "*/*",
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    });
                    console.log(res?.data?.data);
                    const sortedOrders = (res?.data?.data || []).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                    setOrders(sortedOrders);

                } catch (error) {
                    console.error("Error fetching orders:", error);
                } finally {
                    setLoading(false);
                }
            })();
        }
    }, [token, loading2]);

    useEffect(() => {
        try {
            if (orders.length > 0) {
                const fetchEventImages = async (eventIds) => {
                    const images = {};
                    for (let eventId of eventIds) {
                        try {
                            setLoading(true)
                            const res = await axios.get(`/event/${eventId}`);
                            images[eventId] = res?.data?.data?.event_images[0]?.image_url;
                            setLoading(false)
                        } catch (error) {
                            console.error(`Error fetching images for event ${eventId}:`, error);
                        }
                    }
                    setEventImages(images);
                };

                const eventIds = orders.flatMap(order =>
                    order.order_items.map(item => item.event.domain_url)
                );
                fetchEventImages(eventIds);
            }
        } catch (error) {
            console.log(error);
        }
    }, [orders]);

    const handleCancelOrder = async id => {
        try {
            setLoading2(true)
            const res = await axios.get(`/update-status/order/${id}`, {
                params: {
                    status: 2,
                }
            }, {
                headers: {
                    Accept: "*/*",
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            });
            if (res?.data?.status == 200) {
                toast.success(res?.data?.message);
                setLoading2(false)
            }
        } catch (error) {
            console.error("Error cancelling order:", error);
        }
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredOrders = orders.filter(order => {
        if (filter === 'all') return true;
        return filter === 'paid' ? order.status === "1" : order.status === "0";
    });

    return (
        <>
            <Toaster />
            <Header />
            <section className="mt-44 px-4">
                <Container maxWidth="lg">
                    <div className="flex justify-between items-center mb-4 gap-8">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bord text-transparent border-b-[#2C3BFA] border-b-[2px] w-fit px-2 pb-1">Orders</h1>
                        <ThemeProvider theme={darkTheme}>
                            <FormControl variant="outlined" className="w-full max-w-xs">
                                <InputLabel>Filter</InputLabel>
                                <Select
                                    value={filter}
                                    onChange={handleFilterChange}
                                    label="Filter"
                                >
                                    <MenuItem value="all">All</MenuItem>
                                    <MenuItem value="paid">Paid</MenuItem>
                                    <MenuItem value="pending">Pending</MenuItem>
                                </Select>
                            </FormControl>
                        </ThemeProvider>
                    </div>
                    {!loading ? filteredOrders?.map((order, i) => (
                        <div key={i} className="mb-8 md:mb-10 lg:mb-12">
                            <div className="bg-white px-4 md:px-6 py-6 md:py-8 rounded-xl shadow-lg relative">
                                <div className="flex justify-between items-center mb-4">
                                    <p className="text-black text-lg md:text-xl font-semibold">
                                        {format(new Date(order?.created_at), "MMMM dd yyyy")}
                                    </p>
                                    <p className="text-black text-lg md:text-xl font-semibold">
                                        <span className="text-[#2C3BFA]">Status:</span> {order?.status === "0" ? "Pending" : "Paid"}
                                    </p>
                                    <div className="text-black text-lg md:text-xl font-semibold flex items-center gap-3">
                                        {/* {order?.order_items[0]?.event?.for_contact_email && (
                                            <a target="_blank" href={`mailto:${order?.order_items[0]?.event?.for_contact_email}`} className="flex items-center">
                                                <Mail />
                                            </a>
                                        )}
                                        {order?.order_items[0]?.event?.for_contact_phone && (
                                            <a target="_blank" href={`tel:${order?.order_items[0]?.event?.for_contact_phone}`} className="flex items-center">
                                                <Phone />
                                            </a>
                                        )} */}

                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    {order?.order_items.map((item, j) => (
                                        <div key={j} className="flex items-center gap-3">
                                            {eventImages[item.event.domain_url] && (
                                                <img
                                                    src={eventImages[item.event.domain_url]}
                                                    alt={`Event ${item.event.name}`}
                                                    className="w-32 h-32 object-cover rounded"
                                                />
                                            )}
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">{item.event.name}</h2>
                                                    <TransitionsModal contact={item?.event} organizer={item?.event?.user} />
                                                </div>
                                                <p className="text-base md:text-lg mt-1 md:mt-2">Quantity: {item.qty}</p>
                                                <p className="text-base md:text-lg my-1 md:mt-2">Event Date: {format(new Date(item.event.end_date), "MMM dd yyyy")}</p>

                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="absolute right-4 md:right-6 bottom-4">
                                    {loading2 ? (
                                        <PropagateLoader color="#2C3BFA" />
                                    ) : (
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl"
                                            onClick={() => handleCancelOrder(order?.id)}
                                        >
                                            Cancel Order
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )) : <div className="w-[80vw] h-[50vh] flex justify-center items-center">
                        <PropagateLoader color="#2C3BFA" />
                    </div>}
                    {!loading && orders?.length < 1 && <h1 className="text-5xl font-semibold text-white mt-20 text-center">You {"haven't"} ordered anything {"yet!"}</h1>}
                </Container>
            </section>
        </>
    );
};

export default PastTicketsDashboard;