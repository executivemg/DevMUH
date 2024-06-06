"use client";

import { useRouter } from 'next/navigation';
import axios from '../../../axios';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from "react-hot-toast";

export default function Page({ params }) {
    const [token, setToken] = useState("");
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
        if (token) {
            (async () => {
                console.log(token);
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
                    toast.success(res?.data?.message);
                    route.push("/");
                    return;
                }
                console.log(res?.data);
            })();
        }
    }, [token, params]);

    return <Toaster />;
}
