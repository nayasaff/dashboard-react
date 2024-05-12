import React from 'react'
import {Navigate, useLocation} from "react-router-dom"

const ProtectedRoute = ({children, adminRequired}) => {
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")

    const location = useLocation()

    if(!token) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }

    if(adminRequired && !role.includes("admin") ){
        return <Navigate to="/*" state={{ from: location}} replace />
    }

 return children

};

export default ProtectedRoute;
