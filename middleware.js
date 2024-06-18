import { NextResponse } from 'next/server'

export function middleware(request) {
    const verify = JSON.parse(localStorage.getItem("user"))
    let url = request.url
    // if(verify !== null && (url.includes("/login") || url.includes("/signup"))){
    if(true !== null && (url.includes("/login") || url.includes("/signup"))){
        return NextResponse.redirect("/")
    }
}