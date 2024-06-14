"use client";

import { useRouter } from 'next/navigation';
import axios from '../../../axios';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import { PropagateLoader } from 'react-spinners';

export default function Page({ params }) {
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);
    const route = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            let getToken = localStorage.getItem("token");
            if (!getToken) {
                throw new Error("Token not found");
            }
            setToken(getToken);
        }
    }, [params]);

    useEffect(() => {
        const { id } = params;
        try {
            if (token) {
                (async () => {
                    setLoading(true)
                    const res = await axios.get(`/update-status/order/${id}`, {
                        params: {
                            status: 1,
                        }
                    }, {
                        headers: {
                            Accept: "*/*",
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        }
                    });
                    if (res?.data?.status == 200) {
                        setLoading(false)
                        toast.success(res?.data?.message);
                        route.push("/");
                        return;
                    }
                })();
            }
        } catch (error) {
            console.log(error);
        }
    }, [token, params]);

    return <>
        <Toaster />
        {loading && <div className='h-screen w-screen flex justify-center items-center'>
            <PropagateLoader color='#2C3BFA' />
        </div>}
    </>
}
