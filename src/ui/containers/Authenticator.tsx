import React, { ReactNode, useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";

export default function Authenticator({ children }: { children: ReactNode }) {
    const { pathname } = useLocation();
    const navigate = useNavigate()
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('currentUserToken')
        if (token) {
            // if (response.success) {
            // if (pathname === `/auth`)
            //     setRoute('home')
            // } else {
            //     localStorage.removeItem('currentUserToken')
            //     localStorage.removeItem('currentUserName')
            //     if (pathname !== `/auth`)
            //         setRoute('auth')
            // }
            if (pathname === `/auth`)
                navigate('/home')
            else
                setShowChild(true)
        } else {
            localStorage.removeItem('currentUserToken')
            localStorage.removeItem('currentUserName')
            if (pathname !== `/auth`)
                navigate('/auth')
            else
                setShowChild(true)
        }
    }, [navigate, pathname]);


    return (
        <>
            {showChild && children}
        </>
    )
}