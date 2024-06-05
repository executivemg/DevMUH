"use client"

import { useRouter } from 'next/navigation';
import axios from '../../../axios';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from "react-hot-toast";

export default function Page({ params }) {
    const [token, setToken] = useState("")
    const route = useRouter()
    useEffect(() => {
        const { id } = params;
        if (typeof window !== "undefined") {
            let getToken = localStorage.getItem("token");
            if (!token) {
                throw new Error("Token not found");
            }
            setToken(getToken)
        }

        (async () => {
            const res = await axios.post(`/update-status/order/${id}`, { status: 2 }, {
                headers: {
                    Accept: "*/*",
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            })
            if (res?.data?.status == 200) {
                toast.success(res?.data?.message)
                route.push("/")
                return
            }
            console.log(res?.data);
        })()

    }, [params])
    return <Toaster />
}